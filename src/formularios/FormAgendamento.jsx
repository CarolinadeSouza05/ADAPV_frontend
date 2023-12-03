import Tooltip from "@material-ui/core/Tooltip";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { getAnimais, urLBase } from "../api/index.js";
import Barradebusca from "../components/Barradebusca";
import { StoreContext } from "../context/index.jsx";
import baixar from "../imagens/baixar.png";
import { veterinarianToAccepToDoAllFromVolunteer } from "../util/index.jsx";

export default function FormAgendamento(props) {
  const useStore = useContext(StoreContext);
  const { user } = useStore();
  const [animalSelecionado, setAnimalSelecionado] = useState({});
  const [veterinarios, setVeterinarios] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [validado, setValidado] = useState(false);
  const [agendamento, setAgendamento] = useState({
    codag: 0,
    animal: {},
    servico: "",
    veterinario: 0,
    data: "",
    hora: "",
  });
  function limparFormulario() {
    props.setModoEdicao(false);
    props.setAgendamentoEmEdicao({
      codag: 0,
      animal: {},
      servico: "",
      veterinario: 0,
      data: "",
      hora: "",
    });
    window.location.reload();
  }

  function limparCampoBusca() {
    setAnimalSelecionado({});
  }

  useEffect(() => {
    setAgendamento(props.agendamentoEmEdicao);
  }, [props.agendamentoEmEdicao]);

  //Recebendo os Dados do banco de dados
  useEffect(() => {
    (async () => {
      const aux = await getAnimais( user.token,user.id);
      await veterinarianToAccepToDoAllFromVolunteer(setVeterinarios, user.token, user.id);
      if(Array.isArray(aux)){
        setAnimais(aux);
      }
    })()
  }, []);

  console.log(agendamento);
  
  function manupilaAlteracao(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAgendamento({ ...agendamento, [id]: valor });
  }

  function gravarAgendamento(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        //PUT
        // const dataFormatada = new Date(agendamento.data).toLocaleDateString('ko-KR');
        fetch(`${urLBase}/security/agendamentos/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: user.token,
          },
          body: JSON.stringify({
            codag: agendamento.codag,
            animal: animalSelecionado,
            servico: agendamento.servico,
            veterinario: agendamento.veterinario,
            data: agendamento.data,
            // "data":  agendamento.data.split('/').reverse().join('-'),
            hora: agendamento.hora,
          }),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              fetch(`${urLBase}/security/agendamentos/${user.id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "token": user.token,
                },
              })
                .then((resposta) => resposta.json())
                .then((agendamentoAtualizado) => {
                  props.setAgendamento(agendamentoAtualizado);
                  // props.exibirTabela(true);
                });
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert(
              "Erro ao executar alteração agendamento:" + erro.message
            );
          });

        limparFormulario();
      } else {
        //POST
        fetch(`${urLBase}/security/agendamentos/${user.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": user.token,
          },
          body: JSON.stringify({
            codag: agendamento.codag,
            animal: animalSelecionado,
            servico: agendamento.servico,
            veterinario: agendamento.veterinario,
            data: agendamento.data,
            // "data":  agendamento.data.split('/').reverse().join('-'),
            hora: agendamento.hora,
          }),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            console.log(dados)
            if (dados.status) {
              props.setModoEdicao(false);

              // Após o cadastro bem-sucedido, faça uma nova solicitação GET para obter o agendamento recém-criado
              fetch(`${urLBase}/security/agendamentos/${user.id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  token: user.token,
                },
              })
                .then((resposta) => resposta.json())
                .then((agendamentoAtualizado) => {
                  props.setAgendamento(agendamentoAtualizado);

                  // Atualize animalSelecionado aqui com os detalhes do animal do agendamento recém-criado
                  setAnimalSelecionado(agendamentoAtualizado.animal);
                });

              // let agendamentos = [...props.listadeagendamentos];
              // agendamentos.push(agendamento)
              // props.setAgendamento(agendamentos);
              // // props.exibirTabela(true);
              // // Atualize animalSelecionado aqui
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a agendamento:" + erro.message);
          });
        limparFormulario();
      }
      setValidado(false);
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }
  return (
    <div>
      <form
        className="form_agenda"
        onSubmit={gravarAgendamento}
        noValidate
        validated={validado}
      >
        <input
          type="text"
          id="codag"
          name="codag"
          value={agendamento.codag}
          onChange={manupilaAlteracao}
          hidden
        />
        <Tooltip
          title="Selecione um animal para agendar um serviço."
          placement="left"
          classes={{ tooltip: "custom-tooltip" }}
        >
          <div>
            <Barradebusca
              placeHolder={"Informe o animal"}
              dados={animais}
              campoChave={"id"}
              campoBusca={"nome"}
              funcaoSelecao={setAnimalSelecionado}
              limparCampoBusca={limparCampoBusca}
            ></Barradebusca>
          </div>
        </Tooltip>
        <Tooltip
          title="Escolha o serviço que deseja agendar."
          placement="left"
          classes={{ tooltip: "custom-tooltip" }}
        >
          <div className="container-input">
            <label htmlFor="servico" className="montserrat-bold-cod-gray-12px">
              Serviço:
            </label>
            <select
              id="servico"
              name="servico"
              className="flex-row-item"
              value={agendamento.servico}
              onChange={manupilaAlteracao}
              required
            >
              <option value="Selecione">Selecione</option>
              <option value="Castração">Castração</option>
              <option value="Consulta">Consulta</option>
              <option value="Internação">Internação</option>
            </select>
          </div>
        </Tooltip>
        <Tooltip
          title="Informe o nome do veterinário responsável pelo serviço."
          placement="left"
          classes={{ tooltip: "custom-tooltip" }}
        >
          <div className="container-veterinario">
            <label
              htmlFor="veterinario"
              className="montserrat-bold-cod-gray-12px"
            >
              Veterinário:
            </label>
            <FaArrowDown size={18} />

            <input
              type="checkbox"
              id="veterinario"
              name="veterinario"
              value={agendamento.veterinario}
              onChange={manupilaAlteracao}
              className="flex-row-item "
              required
            />

            <div className="veterinarios">
            {veterinarios.length > 0 && veterinarios.map((veterinario, index) => (
              <div className="veterinario-input" key={index}>
                <input 
                  type="radio" 
                  name={`veterinario-agendamento-${index}`}
                  value={veterinario.id}
                  id={`veterinario-agendamento-${index}`}
                  checked={agendamento.veterinario === veterinario.id}
                  onChange={(e) => setAgendamento({ ...agendamento, veterinario: parseInt(e.target.value) })}
                />
                <label htmlFor={`veterinario-agendamento-${index}`}>
                  <span>{veterinario.nome}</span>
                </label>
              </div>
            ))}

            </div>
          </div>
        </Tooltip>
        <Tooltip
          title="Defina a data para o agendamento do serviço."
          placement="left"
          classes={{ tooltip: "custom-tooltip" }}
        >
          <div className="container-input">
            <label htmlFor="data" className="montserrat-bold-cod-gray-12px">
              Data:
            </label>
            <input
              type="date"
              id="data"
              name="data"
              value={agendamento.data}
              onChange={manupilaAlteracao}
              className="flex-row-item"
              required
            />
          </div>
        </Tooltip>
        <Tooltip
          title="Selecione o horário para o agendamento do serviço."
          placement="left"
          classes={{ tooltip: "custom-tooltip" }}
        >
          <div className="container-input">
            <label htmlFor="hora" className="montserrat-bold-cod-gray-12px">
              Hora:
            </label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={agendamento.hora}
              onChange={manupilaAlteracao}
              className="flex-row-item"
              required
            />
          </div>
        </Tooltip>
        <div className="alinha_button">
          <button
            type="button"
            id="limpar"
            className="botao_limpar_agenda montserrat-bold-concrete-16px"
            onClick={limparFormulario}
          >
            Limpar
          </button>
          <button
            type="submit"
            className="botao_agendar montserrat-bold-concrete-16px"
          >
            {props.modoEdicao ? "Remarcar" : "Agendar"}
          </button>
        </div>
        <a
          href="/manuais/manual_agendamento.pdf"
          download="manual_agendamento.pdf"
        >
          <img className="vectorbaixar" src={baixar} alt="Baixar" />
          Manual do Usuário
        </a>
      </form>
    </div>
  );
}
