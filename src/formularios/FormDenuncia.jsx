import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { urLBase } from "../api/index.js";

export function FormDenuncia(props) {
  //-------------------------------------mascaras
  function maskCEP(event) {
    var cep = event.target.value;
    cep = cep.replace(/\D/g, "")
    // cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2")
    event.target.value = cep;
  }

  function maskCel(event) {
    var celular = event.target.value;
    celular = celular.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
    celular = celular.replace(/^(\d{2})(\d)/g, "($1) $2"); // Insere o parênteses e o espaço após os dois primeiros dígitos
    celular = celular.replace(/(\d{5})(\d)/, "$1-$2"); // Insere o hífen após os primeiros cinco dígitos
    event.target.value = celular;
  }
  //------------------------------------


  const [validado, setValidado] = useState(false);
  const [denuncia, setDenuncia] = useState(props.denuncia);


  function manupilaAlteracao(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setDenuncia({ ...denuncia, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        //PUT
        fetch(urLBase + "/denuncias", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(denuncia)
        }).then((resposta) => {
          return resposta.json();
        }).then((dados) => {
          if (dados.status) {
            props.setModoEdicao(false);
            fetch(urLBase + "/denuncias", {
              method: "GET"
            })
              .then((resposta) => resposta.json())
              .then((denunciasAtualizadas) => {
                props.setDenuncia(denunciasAtualizadas);
                props.exibirTabela(true);
              });
          }
          window.alert(dados.mensagem);
        }).catch((erro) => {
          window.alert("Erro ao executar alteração denuncia:" + erro.message);
        });

      }
      else {
        //POST
        fetch(urLBase + "/denuncias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(denuncia)
        }).then((resposta) => {
          return (resposta.json())
        }).then((dados) => {
          if (dados.status) {
            props.setModoEdicao(false);

            fetch(urLBase + "/denuncias", {
              method: "GET"
            })
              .then((resposta) => resposta.json())
              .then((denunciasAtualizadas) => {
                props.setDenuncia(denunciasAtualizadas);
                props.exibirTabela(true);
              });
          }
          window.alert(dados.mensagem);
        }).catch((erro) => {
          window.alert("Erro ao executar a denuncia:" + erro.message);
        });
      }
      setValidado(false);
    }
    else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();

  }
  return (
    <div className="conteudo_denuncia">
      <div className="aviso_denuncia">
        <p className="aviso_text_denuncia">
          <span className="montserrat-medium-concrete-16px">
            Se você conhece alguém que tenha um animal em condições de maus
            tratos, não hesite em denunciar.
            <br />
          </span>
          <span className="aviso_espaco_denuncia">
            <br />
          </span>
          <span className="aviso_text2_denuncia">A denúncia é 100% anônima.</span>
        </p>
      </div>
      <Form
        noValidate
        validated={validado}
        className="form"
        onSubmit={manipulaSubmissao}
      >
        <div className="form_style">
          <Row>
            <Form.Group>
              <Form.Control
                type="text"
                id="id"
                value={denuncia.id}
                onChange={manupilaAlteracao}
                hidden
              />
            </Form.Group>
            <Form.Label className="montserrat-bold-cod-gray-12px">
              Onde está ocorrendo os maus tratos?
            </Form.Label>
            <Form.Group as={Col} md="8">
              <Form.Control
                type="text"
                className="flex-row-item"
                placeholder="Nome da Rua"
                value={denuncia.rua}
                id="rua"
                onChange={manupilaAlteracao}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Informe a rua.
            </Form.Control.Feedback>

            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nº"
                className="flex-row-item"
                required
                value={denuncia.numero}
                onChange={manupilaAlteracao}
                id="numero"
              ></Form.Control>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Informe o número.
            </Form.Control.Feedback></Row>
               {/* ------------------------------------------- Fim da linha */}
          <Row>    

            <Form.Group as={Col} md="8" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Cidade"
                required
                onChange={manupilaAlteracao}
                className="flex-row-item"
                value={denuncia.cidade}
                id="cidade"
              ></Form.Control>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Informe a cidade.
            </Form.Control.Feedback>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Control
                type="text"
                placeholder="CEP 00000-000"
                className="flex-row-item"
                required
                onChange={manupilaAlteracao}
                value={denuncia.cep}
                onKeyUp={maskCEP}
                maxLength={9}
                id="cep"
              ></Form.Control>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Informe o CEP.
            </Form.Control.Feedback></Row>

            {/* Fim Da Linha */}
            <Row>
            <Form.Label className="montserrat-bold-cod-gray-12px">
              Quando ocorreu os maus tratos?
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                required
                onChange={manupilaAlteracao}
                className="flex-row-item"
                value={denuncia.data}
                id="data"
              ></Form.Control>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Informe a data.
            </Form.Control.Feedback>
          </Row>

          {/* ------------------------------------------- Fim da linha */}
          <Row>
            <Form.Label className="montserrat-bold-cod-gray-12px">
              Descreva detalhadamente o motivo da denúncia:
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                className="flex-row-item "
                required
                onChange={manupilaAlteracao}
                value={denuncia.observacoes}
                id="observacoes"
              ></Form.Control>
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Descreva melhor sua denuncia.
            </Form.Control.Feedback>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label className="montserrat-bold-cod-gray-12px">
                Você quer receber atualizações sobre a denúncia? Se sim, deixe o
                seu contato:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="(99)99999-9999"
                className="flex-row-item"
                onInput={maskCel}
                maxLength={15}
                onChange={manupilaAlteracao}
                value={denuncia.telelefone}
                id="telefone"
              ></Form.Control>
            </Form.Group>
          </Row>
          <div className="botoes">
            <button
              type="button"
              id="limpar"
              className="botao_denuncia montserrat-bold-concrete-16px"
            >
              Limpar
            </button>
            <button
              type="button"
              id="voltar"
              className="botao_denuncia montserrat-bold-concrete-16px"
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </button>
            <button
              type="submit"
              id="cadastrar"
              className="botao_denuncia montserrat-bold-concrete-16px"
            >
              {props.modoEdicao ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
