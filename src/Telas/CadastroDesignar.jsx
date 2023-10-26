import { Cabecalho } from "../components/Cabecalho";
import { Modal } from "../components/ModalDesignar";
import { Footer } from "../components/Footer";
import React from "react";
import FormDesignarTarefas from "../formularios/FormDesignarTarefas.jsx";
import './CadastroDesignar.css';
import vetor3 from '../imagens/vector-3.svg';
import {urLBase} from "../api/index";
import { useState, useEffect } from "react";
import { Cards } from "@phosphor-icons/react";

export function CadastroDesignar() {
    // Estado para controlar o modal
    const [modal, setModal] = useState(false);

    // Estado para armazenar todos os registros 
    const [allRegisters, setAllRegisters] = useState([]);

    //Cabeçalho para o Modal
    const tableHead = ["Código", "Atividade", "Data", "Hora", "Voluntários"];

    //Recebendo os Dados do banco de dados das atividades
    useEffect(() => {
        fetch(urLBase + "/designar_atividades", {
            method: "GET"
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
        fetch(urLBase + "/designar_atividades", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
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
        <div >
            <Cabecalho />
            <div>
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
                    /></div></div>
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
            <Footer />
        </div>
    );
}