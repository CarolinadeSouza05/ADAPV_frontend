import { Cards } from "@phosphor-icons/react";
import { useState, useEffect, useContext } from "react";import { urLBase } from "../api/index";
import { HeaderAdm } from "../components/HeaderAdm";
import { Modal } from "../components/ModalDesignar";
import FormDesignarTarefas from "../formularios/FormDesignarTarefas.jsx";
import vetor3 from '../imagens/vector-3.svg';
import { AsideAdm } from "./Adm/AsideAdm";
import './CadastroDesignar.css';
import { StoreContext } from "../context/index.jsx";

export function CadastroDesignar() {
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    // Estado para controlar o modal
    const [modal, setModal] = useState(false);

    // Estado para armazenar todos os registros 
    const [allRegisters, setAllRegisters] = useState([]);

    //Cabeçalho para o Modal
    const tableHead = ["Código", "Atividade", "Data", "Hora", "Voluntários"];

    //Recebendo os Dados do banco de dados das atividades
    useEffect(() => {
        fetch(`${urLBase}/security/designar_atividades/${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": user.token,
            },
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setAllRegisters(dados);
            }
            else {

            }
        })
    }, []);

    const [designarTarefas, setDesignarTarefas] = useState({
        id_designar: "",
        cod_atividade: {},
        data: "",
        hora: "",
        listadeVoluntarios: []
    });

    function apagarTarefa(id_designar) {
        fetch(`${urLBase}/security/designar_atividades/${user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "token": user.token,
        },
          body: JSON.stringify({ id_designar })
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              // Atualize os registros após a exclusão
              const updatedRegisters = allRegisters.filter(
                (register) => register.id_designar !== id_designar
              );
              setAllRegisters(updatedRegisters);
            } else {
              // Lide com possíveis erros ou mostre uma mensagem de erro
            }
          })
          .catch((error) => {
            console.error("Erro ao excluir: " + error);
          });
      }
    
    return (
        < >
            <AsideAdm />
            <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />
            <div className="titulo_designar">
                <img
                    className="vector vectoranimais"
                    src={vetor3}
                    alt="Vector"
                />
                <>
                    Designar atividades <span className="span1">para voluntários</span>
                </>
                <Cards
                    className="svg-modal"
                    size={32}
                    onClick={() => setModal(true)}
                />
            </div>
            <div className="main_designar">
                <FormDesignarTarefas  setAllRegisters={setAllRegisters} />
            </div>

            {modal ? (
                <Modal
                    setModal={setModal}
                    tableHead={tableHead}
                    registerAll={allRegisters}
                    setAllRegisters={setAllRegisters}
                    setFormValidate={setDesignarTarefas}
                    // setEditData={handleEditClick}
                    onDeleteClick={apagarTarefa}
                />
            ) : null}
        </>
    );
}