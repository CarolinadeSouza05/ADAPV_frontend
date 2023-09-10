import { Button, Container, Table } from "react-bootstrap";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import "./TabelaDenuncia.css";
import { urLBase } from "../api/index.js";


export  function TabelaDenuncia(props) {
  // const [denuncia, setDenuncia] = useState(props.listadedenuncias);

  // function excluirDenuncia(id) {
  //   const listaAtualizada = props.listadedenuncias.filter(
  //     (denuncia) => denuncia.id !== id
  //   );
  //   props.setDenuncia(listaAtualizada);
  // }

  //Filtro sempre busca na lista original do banco de dados
  function filtrarDenuncias(e) {
    const termoBusca = e.currentTarget.value;

    fetch(urLBase + "/denuncias", { method: "GET" })
      .then((resposta) => {
        return resposta.json()
      }).then((listadedenuncias) => {
        if (Array.isArray(listadedenuncias)) {
          const resultadoBusca = listadedenuncias.filter((denuncia) =>
            denuncia.observacoes.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setDenuncia(resultadoBusca);
        }
      })
  }
  function limparFormulario() {
    props.setDenunciaEmEdicao({
      id: "0",
      rua: "",
      numero: "",
      cep: "",
      cidade: "",
      data:"",
      observacoes: "",
      telefone: ""
    });
  }


  
  return (
    <Container className="container-table-denuncia body">
      <button
        className="botao_denuncia_tab montserrat-bold-concrete-16px"
        onClick={() => {
          limparFormulario()
          props.exibirTabela(false);
          props.setAtualizando(false);
        }}>
        Novo Cadastro
      </button>
      <div className="titulo_tabela_denuncias">
              <img
                className="vector vectorEntrada"
                src={"vector-3.svg"}
                alt="Vector"
              />
              <div>
                <span className="span0">Denuncias </span><span className="span1">Realizadas</span>
              </div>
            </div>

      <div className="group_pesquisa">
        {/* <div className="search_denuncia"> */}
        <input
          type="text"
          id="termoBusca"
          className="searchInput_denuncia"
          placeholder="Pesquise pelas observações da denuncia"
          onChange={filtrarDenuncias}
        />
        

        <div className="botaoprimario">
          <button className="searchButton">
            <FaSearch />
          </button>
        </div>
      </div>
  


      <Table>
        <thead>
          <tr>
            <th>Rua</th>
            <th>Nº</th>
            <th>CEP</th>
            <th>Cidade</th>
            <th>Data</th>
            <th>Telefone</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listadedenuncias?.map((denuncia) => {
            const dataFormatada = new Date(denuncia.data).toLocaleDateString();
            return (
              <tr key={denuncia.id}>
                <td>{denuncia.rua}</td>
                <td>{denuncia.numero}</td>
                <td>{denuncia.cep}</td>
                <td>{denuncia.cidade}</td>
                <td>{dataFormatada}</td>
                <td>{denuncia.telefone}</td>
                <td>{denuncia.observacoes}</td>
                <td>
                  <div className="botoes">
                    <Button
                      className="botao_table"
                    onClick={() => {
                      props.editarDenuncia(denuncia)
                    }}
                    ><FaEdit />
                    </Button>
                    <Button
                      className="botao_table"
                      onClick={() => {
                        if (window.confirm("Confirma a exclusão desta denuncia?")){
                          props.excluirDenuncia(denuncia)
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
