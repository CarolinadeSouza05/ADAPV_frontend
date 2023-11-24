import { Button, Container, Table } from "react-bootstrap";
import { FaCheck,FaTimes} from "react-icons/fa";
import "./TabelaDenuncia.css";
import {  urLBase } from "../api/index.js";
import { useState } from "react";


export  function TabelaAdocao(props) {

  const [modoEdicao, setModoEdicao] = useState(false);

//Filtro sempre busca na lista original do banco de dados
function filtrarAdocao(e) {
  const termoBusca = e.currentTarget.value;

  fetch(urLBase + "/adocoes", { method: "GET" })
    .then((resposta) => {
      return resposta.json()
    }).then((listadeadocoes) => {
      if (Array.isArray(listadeadocoes)) {
        const resultadoBusca = listadeadocoes.filter((adocao) =>
          adocao.adotante.toLowerCase().includes(termoBusca.toLowerCase())
        );
        props.setAdocao(resultadoBusca);
      }
    })
}
  // Função para autorizar a adoção
  function autorizarAdocao(adocao) {
    fetch(urLBase + "/adocoes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...adocao,
        status: 1
      })
    }).then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.status) {
          // Atualizar a lista de adoções após autorizar
          fetch(urLBase + "/adocoes", {
            method: "GET"
          }).then((resposta) => resposta.json())
            .then((listaAtualizada) => {
              props.setAdocao(listaAtualizada);
            });
        }
        window.alert(dados.mensagem);
      })
      .catch((erro) => {
        window.alert("Erro ao autorizar adoção: " + erro.message);
      });
  }
  function negarAdocao(adocao) {
    fetch(urLBase + "/adocoes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...adocao,
        status: 2 ,// Mantenha o status como 0
      })
    }).then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.status) {
          // Atualizar a lista de adoções após negar
          fetch(urLBase + "/adocoes", {
            method: "GET"
          }).then((resposta) => resposta.json())
            .then((listaAtualizada) => {
              props.setAdocao(listaAtualizada);
            });
        }
        window.alert(dados.mensagem);
      })
      .catch((erro) => {
        window.alert("Erro ao negar adoção: " + erro.message);
      });
  }
  
  return (
    <Container className="container-table-adocao body">
  <div>
        <input
          type="text"
          id="termoBusca"
          className="searchInput_agenda"
          onChange={filtrarAdocao}
        /></div>

      <Table className="tabela_autorizar">
        <thead>
          <tr>
            <th>Nome do animal</th>
            <th>Adotante</th>
            <th>Endereço</th>
            <th>Data de solicitação</th>
            <th>Concorda com os termos</th>
            <th>Status</th> 
            <th>Autorizar</th>
            
          </tr>
        </thead>
        <tbody>
          {props.listadeadocoes?.map((adocao) => {
            const dataFormatada = new Date(adocao.data).toLocaleDateString();
            const status = adocao.status === 1 ? 'Autorizado' : (adocao.status === 0 
              ? 'Em espera'
              : 'Negado');

            return (
              <tr key={adocao.codAdocao}>
                <td>{adocao.animal.nome}</td>
                <td>{adocao.adotante}</td>
                <td>{adocao.rua},{adocao.numero}</td>
                <td>{dataFormatada}</td>
                <td>{adocao.concordo ? 'Sim' : 'Não'}</td>
                <td>{status}</td>
                <td>
                  <div className="botoes">
                    <Button
                      className="botao_table_autorizar"
                    onClick={() => {
                      autorizarAdocao(adocao) //vou só alterar no put para que ao clicar aqui o status mude para 1
                    }}
                    ><FaCheck />
                    </Button>
                    <Button
                      className="botao_table_negar"
                      onClick={() => {
                        if (window.confirm("Confirma a negar esta adoção?")){
                          negarAdocao(adocao)
                        }
                      }}
                    >
                      <FaTimes />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
