import { useState, useEffect } from "react";
// import Barradebusca from "../components/Barradebusca";
import { Cabecalho } from "../components/Cabecalho";
import { urLBase } from "../api/index.js";
import FormAdocao from "../formularios/FormAdocao.jsx"
import { Footer } from "../components/Footer";
import "./CadastroAdocao.css"
import vetor3 from "../imagens/vector-3.svg"
import { TabelaAdocao } from "../components/TabelaAdocao";

export function CadastroAdocao(props) {
    const [adocao, setAdocao] = useState(props.adocao);
    const [modoEdicao, setModoEdicao] = useState(false);
    // const [atualizando, setAtualizando] = useState(false);
    const [adocaoEmEdicao, setAdocaoEmEdicao] = useState({
        codAdocao: "",
        animal: {},
        adotante: "",
        data: "",
    });

    function prepararParaAtualizar(adocao) {
        setModoEdicao(true);
        setAdocaoEmEdicao(adocao);
    }

    //Realiza a exclusão dos adocoes
    function apagarAdocao(adocao) {
        fetch(urLBase + "/adocoes", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adocao)
        }).then((resposta) => resposta.json()
        ).then((dados) => {
            window.alert(dados.mensagem);
            //Fazendo um novo Get para atualizar a tabela após exclusão
            fetch(urLBase + "/adocoes", {
                method: "GET"
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                const aux = setAdocao(dados)
                const listaAtualizada = aux.filter((item) => item.id !== adocao.codAdocao);
                props.setAdocao(listaAtualizada);
            })
        }).catch((erro) => {
            window.alert("Erro ao executar exclusão do adocao:" + erro.message);
        });
    }


    //Recebendo os Dados do banco de dados
    useEffect(() => {
        fetch(urLBase + "/adocoes", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setAdocao(dados);
            }
            else {

            }
        })
    }, []);
    return (
        <div>
            <Cabecalho />

            <div className="page_container">
                <div className="titulo_agenda">
                    <img
                        className="vector vectoranimais"
                        src={vetor3}
                        alt="Vector"
                    />
                    <>
                        Novas <span className="span1">Adoções</span>
                    </></div>
                <FormAdocao
                    listadeadocoes={adocao}
                    setAdocao={setAdocao}
                    setModoEdicao={setModoEdicao}
                    modoEdicao={modoEdicao}
                    adocaoEmEdicao={adocaoEmEdicao}
                    setAdocaoEmEdicao={setAdocaoEmEdicao}
                />
            </div>
            <div className="page_container">
                <div className="titulo_agenda">
                    <img
                        className="vector vectoranimais"
                        src={vetor3}
                        alt="Vector"
                    />
                    <>
                    Adoções <span className="span1">Realizadas</span>
                    </></div>
                <TabelaAdocao
                    listadeadocoes={adocao}
                    excluirAdocao={apagarAdocao}
                    editarAdocao={prepararParaAtualizar}
                    setAdocao={setAdocao}
                    setAdocaoEmEdicao={setAdocaoEmEdicao} />
            </div>

            <Footer />
        </div>

    )
}