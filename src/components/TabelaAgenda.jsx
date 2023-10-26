import { Button, Container, Table } from "react-bootstrap";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import "./TabelaDenuncia.css";
import { urLBase } from "../api/index.js";


export function TabelaAgenda(props) {

  // function formatarData(data) {
  //   const dataObj = new Date(data);
  //   const dia = dataObj.getDate().toString().padStart(2, "0");
  //   const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
  //   const ano = dataObj.getFullYear();
  //   return `${dia}/${mes}/${ano}`;
  // }

    //Filtro sempre busca na lista original do banco de dados
    function filtrarAgenda(e) {
      const termoBusca = e.currentTarget.value;

      fetch(urLBase + "/agendamentos", { method: "GET" })
        .then((resposta) => {
          return resposta.json()
        }).then((listadeagendamentos) => {
          if (Array.isArray(listadeagendamentos)) {
            const resultadoBusca = listadeagendamentos.filter((agendamento) =>
              agendamento.data.toLowerCase().includes(termoBusca.toLowerCase())
            );
            props.setAgendamento(resultadoBusca);
          }
        })
    }



  return (
    <Container className="container-table-denuncia body">

      <div>
        <input
          type="date"
          id="termoBusca"
          className="searchInput_agenda"
          onChange={filtrarAgenda}
        /></div>
        {/* <button
        className="botao_denuncia_tab montserrat-bold-concrete-16px"
        onClick={() => {
          limparFormulario()
          props.exibirTabela(false);
          props.setAtualizando(false);
        }}>
        Novo CadastroF
      </button>

      <div className="group_pesquisa">
        <input
          type="text"
          id="termoBusca"
          className="searchInput_denuncia"
          onChange={filtrarDenuncias}
        />

        <div className="botaoprimario">
          <button className="searchButton">
            <FaSearch />
          </button>
        </div>
      </div> */}


        <Table>
          <thead>
            <tr>
              <th>Animal</th>
              <th>Serviço</th>
              <th>Veterinário</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.listadeagendamentos?.map((agendamento) => {
              // const dataFormatada = new Date(agendamento.data).toLocaleDateString();
              // const dataFormatada = formatarData(agendamento.data);
              return (
                <tr key={agendamento.codag}>
                  <td>{agendamento.animal.nome}</td>
                  <td>{agendamento.servico}</td>
                  <td>{agendamento.veterinario}</td>
                  <td>{agendamento.data}</td>
                  {/* <td>{dataFormatada}</td> */}
                  <td>{agendamento.hora}</td>
                  <td>
                    <div className="botoes">
                      <Button
                        className="botao_table"
                        onClick={() => {
                          props.editarAgendamento(agendamento)
                        }}
                      ><FaEdit />
                      </Button>
                      <Button
                        className="botao_table"
                        onClick={() => {
                          if (window.confirm("Confirma a exclusão desta denuncia?")) {
                            props.excluirAgendamento(agendamento)
                          }
                        }}
                      >
                        <FaTrash />
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
