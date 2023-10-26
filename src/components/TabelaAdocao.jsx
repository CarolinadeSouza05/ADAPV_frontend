import { Button, Container, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./TabelaDenuncia.css";
import { urLBase } from "../api/index.js";


export  function TabelaAdocao(props) {


//Filtro sempre busca na lista original do banco de dados
function filtrarAdocao(e) {
  const termoBusca = e.currentTarget.value;

  fetch(urLBase + "/adocoes", { method: "GET" })
    .then((resposta) => {
      return resposta.json()
    }).then((listadeadocoes) => {
      if (Array.isArray(listadeadocoes)) {
        const resultadoBusca = listadeadocoes.filter((adocao) =>
          adocao.data.toLowerCase().includes(termoBusca.toLowerCase())
        );
        props.setAdocao(resultadoBusca);
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
          onChange={filtrarAdocao}
        /></div>

      <Table>
        <thead>
          <tr>
            <th>Animal</th>
            <th>Adotante</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listadeadocoes?.map((adocao) => {
            // const dataFormatada = new Date(adocao.data).toLocaleDateString();
            return (
              <tr key={adocao.codAdocao}>
                <td>{adocao.animal.nome}</td>
                <td>{adocao.adotante}</td>
                <td>{adocao.data}</td>
                <td>
                  <div className="botoes">
                    <Button
                      className="botao_table"
                    onClick={() => {
                      props.editarAdocao(adocao)
                    }}
                    ><FaEdit />
                    </Button>
                    <Button
                      className="botao_table"
                      onClick={() => {
                        if (window.confirm("Confirma a exclusão desta adoção?")){
                          props.excluirAdocao(adocao)
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
