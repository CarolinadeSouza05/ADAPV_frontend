import { useState, useEffect } from "react";
import { Footer } from "../components/Footer.jsx";
import { Cabecalho } from "../components/Cabecalho.jsx";
import { TabelaDenuncia } from "../components/TabelaDenuncia.jsx";
import { FormDenuncia } from "../formularios/FormDenuncia";
import "./CadastroDenuncia.css";
import { urLBase } from "../api/index.js"; 

export function CadastroDenuncia(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [denuncia, setDenuncia] = useState(props.denuncia);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [denunciaEmEdicao, setDenunciaEmEdicao] = useState({
    id: "",
    rua: "",
    numero: "",
    cep: "",
    cidade: "",
    data:"",
    observacoes: "",
    telefone: ""
  });

  function prepararParaAtualizar(denuncia) {
    setAtualizando(true);
    setDenunciaEmEdicao(denuncia);
    setExibirTabela(false);
  }

  function apagarDenuncia(denuncia) {
    fetch(urLBase + "/denuncias", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(denuncia)
    }).then((resposta) => resposta.json()
    ).then((dados) => {
      window.alert(dados.mensagem);
      //Fazendo um novo Get para atualizar a tabela após exclusão
      fetch(urLBase + "/denuncias", {
        method: "GET"
      }).then((resposta) => {
        return resposta.json();
      }).then((dados) => {
        const aux = setDenuncia(dados)
        const listaAtualizada = aux.filter((item) => item.id !== denuncia.id);
      props.setDenuncia(listaAtualizada);})
    }).catch((erro) => {
      window.alert("Erro ao executar exclusão de denuncia:" + erro.message);
    });
  }

  //Recebendo os Dados do banco de dados
  useEffect(() => {
    fetch(urLBase + "/denuncias", {
      method: "GET"
    }).then((resposta) => {
      return resposta.json();
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setDenuncia(dados);
      }
      else {

      }
    })
  }, []);

  return (
    <div className="page_container_denuncia">
      <Cabecalho />

      <main className="conteudo_denuncia">
        {exibirTabela ? (
          <TabelaDenuncia
            listadedenuncias={denuncia}
            setDenuncia={setDenuncia}
            exibirTabela={setExibirTabela}
            editarDenuncia={prepararParaAtualizar}
            excluirDenuncia={apagarDenuncia}
            setDenunciaEmEdicao={setDenunciaEmEdicao}
            setAtualizando={setAtualizando}
          />
        ) : (
          <FormDenuncia
            listadedenuncias={denuncia}
            setDenuncia={setDenuncia}
            exibirTabela={setExibirTabela}
            // denunciaEdicao={denunciaEmEdicao}
            denuncia={denunciaEmEdicao}
            // atualizando={atualizando}
            modoEdicao={atualizando}
            setModoEdicao={setModoEdicao}
          // excluirDenuncia={apagarDenuncia}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
