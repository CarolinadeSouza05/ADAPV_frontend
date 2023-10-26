import { useState, useEffect } from "react";
// import Barradebusca from "../components/Barradebusca";
import { Cabecalho } from "../components/Cabecalho";
import { urLBase } from "../api/index.js";
import FormAgendamento from "../formularios/FormAgendamento.jsx"
import { Footer } from "../components/Footer";
import "./CadastroAgendamento.css"
import vetor3 from "../imagens/vector-3.svg"
import { TabelaAgenda } from "../components/TabelaAgenda";

export function CadastroAgendamento(props) {
    const [agendamento, setAgendamento] = useState(props.agendamento);
    const [modoEdicao, setModoEdicao] = useState(false);
    // const [atualizando, setAtualizando] = useState(false);
    const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState({
        codag: "",
        animal: {},
        servico: "",
        veterinario: "",
        data: "",
        hora: ""
    });

    function prepararParaAtualizar(agendamento) {
        setModoEdicao(true);
        setAgendamentoEmEdicao(agendamento);
    }

    //Realiza a exclusão dos agendamentos
    function apagarAgendamento(agendamento) {
        fetch(urLBase + "/agendamentos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamento)
        }).then((resposta) => resposta.json()
        ).then((dados) => {
            window.alert(dados.mensagem);
            //Fazendo um novo Get para atualizar a tabela após exclusão
            fetch(urLBase + "/agendamentos", {
                method: "GET"
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                const aux = setAgendamento(dados)
                const listaAtualizada = aux.filter((item) => item.id !== agendamento.id);
                props.setAgendamento(listaAtualizada);
            })
        }).catch((erro) => {
            window.alert("Erro ao executar exclusão do agendamento:" + erro.message);
        });
    }


    //Recebendo os Dados do banco de dados
    useEffect(() => {
        fetch(urLBase + "/agendamentos", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setAgendamento(dados);
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
                        Novos <span className="span1">Agendamentos</span>
                    </></div>
                <FormAgendamento
                    listadeagendamentos={agendamento}
                    setAgendamento={setAgendamento}
                    setModoEdicao={setModoEdicao}
                    modoEdicao={modoEdicao}
                    agendamentoEmEdicao={agendamentoEmEdicao}
                    setAgendamentoEmEdicao={setAgendamentoEmEdicao}
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
                        Agendamentos <span className="span1">Realizados</span>
                    </></div>
                <TabelaAgenda
                    listadeagendamentos={agendamento}
                    excluirAgendamento={apagarAgendamento}
                    editarAgendamento={prepararParaAtualizar}
                    setAgendamento={setAgendamento}
                    setAgendamentoEmEdicao={setAgendamentoEmEdicao} />
            </div>

            <Footer />
        </div>

    )
}