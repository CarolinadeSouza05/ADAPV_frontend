import { useEffect, useState } from "react";
// import Barradebusca from "../components/Barradebusca";
import { urLBase } from "../api/index.js";
import { HeaderAdm } from "../components/HeaderAdm.jsx";
import { TabelaAdocao } from "../components/TabelaAdocao.jsx";
import FormAdocao from "../formularios/FormAdocao.jsx";
import vetor3 from "../imagens/vector-3.svg";
import { AsideAdm } from "./Adm/AsideAdm.jsx";
import "./CadastroAdocao.css";
import { Modal } from "react-bootstrap";
import img_adocao from '../imagens/img_cad_adocao.png'
export function AutorizarAdocao(props) {
    const [adocao, setAdocao] = useState(props.adocao);
    const [exibirModal, setExibirModal] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    // const [atualizando, setAtualizando] = useState(false);
    const [adocaoEmEdicao, setAdocaoEmEdicao] = useState({
        codAdocao: "",
        animal: {},
        adotante: "",
        celular: "",
        cpf: "",
        email: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        data: "",
        concordo: false,
        status: false,
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

    const exibirTermos = () => {
        setExibirModal(true);
    };

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
        <>
            <AsideAdm />
            <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />

            <div className="page_container_adocao main-adm-register">
                <div className="titulo_adocao">
                    <img
                        className="vector vectoranimais"
                        src={vetor3}
                        alt="Vector"
                    />
                    <>
                        Solicitações de  <span className="span1">Adoção</span>
                    </></div>
                
                    <TabelaAdocao
                    listadeadocoes={adocao}
                    excluirAdocao={apagarAdocao}
                    editarAdocao={prepararParaAtualizar}
                    setAdocao={setAdocao}
                    setAdocaoEmEdicao={setAdocaoEmEdicao}
                     />

                {/* <div className="alinhando_imagem_adocao"><img src={img_adocao} className='img_adocao'></img></div> */}
            </div>

            
          
        </>

    )
}