import { useEffect, useState } from "react";
// import Barradebusca from "../components/Barradebusca";
import { urLBase } from "../api/index.js";
import { HeaderAdm } from "../components/HeaderAdm";
import { TabelaAdocao } from "../components/TabelaAdocao";
import FormAdocao from "../formularios/FormAdocao.jsx";
import vetor3 from "../imagens/vector-3.svg";
import { AsideAdm } from "./Adm/AsideAdm";
import "./CadastroAdocao.css";
import { Modal } from "react-bootstrap";
import img_adocao from '../imagens/img_cad_adocao.png'
export function CadastroAdocao(props) {
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
                        Solicitação de  <span className="span1">Adoção</span>
                    </></div>
                <FormAdocao
                    listadeadocoes={adocao}
                    setAdocao={setAdocao}
                    setModoEdicao={setModoEdicao}
                    modoEdicao={modoEdicao}
                    adocaoEmEdicao={adocaoEmEdicao}
                    setAdocaoEmEdicao={setAdocaoEmEdicao}
                    exibirTermos={exibirTermos}
                />

                <div className="alinhando_imagem_adocao"><img src={img_adocao} className='img_adocao'></img></div>
            </div>

            <Modal show={exibirModal} onHide={() => setExibirModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Termos e Condições</Modal.Title>
                </Modal.Header>
                <Modal.Body className="termos-modal-body">
                    <p></p>
                    <p>Ao adotar o animal acima descrito declaro-me apto para assumir a guarda e a responsabilidade
                    sobre este animal, eximindoo doador de toda e qualquer responsabilidade por quaisquer atos praticados
                    pelo animal a partir desta data.</p>

                    <p>Declaro ainda estar cliente de todos os cuidados que este animal exige no que se refere à sua
                    guarda e manutenção, além de conhecer todos os riscos inerentes à espécie e raça no convivo com
                    humanos, estando apto a guarda-lo e vigiá-lo, comprometendo-me a proporcionar boas condições de
                    alojamento e alimentações, assim como, espaço físico que possibilite o animal se exercitar.</p>

                    <p>Responsabilizo-me por preservar a saúde e integridade do animal e a submetê-lo aos cuidados médicos
                    veterinários sempre que necessário. Comprometo-me a não transmitir a posse deste animal a outrem
                    sem o conhecimento do doador (ONG ADAPV). Comprometo-me também, a permitir o acesso do doador
                    ao local onde se encontra o animal para averiguação de suas condições.</p>

                    <p>Tenho conhecimento de que caso seja constatado por parte do doador situação inadequada para o
                    bem-estar do animal,perderei a sua guarda, sem prejuízo das penalidades legais. Comprometo-me ainda
                    em castrar o animal adotado se o doador já não o tiver feito, contribuindo assim para o controle da
                    população de animais domésticos. Comprometo-me a cumprir toda a legislação vigente, municipal,
                    estadual e federal, relativa à posse de animais.</p>

                    <p>Declaro-me assim, ciente das normas acima, as quais aceito, assinando o presente termo de
                    Responsabilidade, assumindoplenamente os deveres que dele constam, bem como outros relacionados à
                    posse responsável e que não estejam incluídos neste termo.</p>
                </Modal.Body>
            </Modal>
            {/* <div className="page_container main-adm-register">
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
            </div> */}
        </>

    )
}