import React from "react";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { Aside } from "../components/Aside";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { aceitarFazerArray, disponibilidadeArray, periodoArray } from "../util";
import "./CadastroVoluntario.css"
import { FormCadastroVoluntario } from "../formularios/FormCadastroVoluntario";
import { useEffect } from "react";
import { deleteRegisterVoluntario, getAllRegisterVoluntario } from "../api";


export const inputsFormValidate = {
  nome: "",
  telefone: "",
  disponibilidade: "",
  periodo: "",
  oQueAceitariaFazer: "",
  edit: -1,
}

export function CadastroVoluntario() {
  const [formValidate, setFormValidate] = useState(inputsFormValidate);
  const [registerVolunteers, setRegisterVolunteers] = useState([]);
  const [modal, setModal] = useState(false);

  function ChangeValueObject(volunteer) {
    const aux = volunteer.disponibilidade.split('-');
    aux.forEach(dispo =>
      disponibilidadeArray.forEach(disponibilidade =>
        disponibilidade.value === dispo ? (disponibilidade.checked = true) : null
      )
    );
    periodoArray.forEach(periodo =>
      periodo.value === volunteer.periodo ? (periodo.checked = true) : null
    );
    aceitarFazerArray.forEach(aceitarFazer =>
      aceitarFazer.value === volunteer.oQueAceitariaFazer ? (aceitarFazer.checked = true) : null
    );
  }

  useEffect(() => {
    (async function(){
      setRegisterVolunteers(await getAllRegisterVoluntario());
    })()
  }, [])

  const tableHead = ["Nome Completo", "Telefone", "Dias da semana", "Período", "O que aceitaria fazer"]

  async function deleteRegister(id){
    await deleteRegisterVoluntario(id);
    setRegisterVolunteers(await getAllRegisterVoluntario());
  }

  return (
    <>
      <Cabecalho />
      <main>
        <section className="container-main cadastros flex-col">
          <Aside />
        </section>

        <section className="container-main form-cadastro alinhamento">
          <FormCadastroVoluntario formValidate={formValidate} setFormValidate={setFormValidate} setRegisterVolunteers={setRegisterVolunteers} setModal={setModal} />
        </section>
      </main>
      <Footer />
      {modal ? (
        <Modal 
          title={"Cadastro de Voluntários"} 
          tableHead={tableHead} 
          registerAll={registerVolunteers}
          setRegisterAll={setRegisterVolunteers}
          deleteRegister={deleteRegister} 
          setFormValidate={setFormValidate} 
          ChangeValueObject={ChangeValueObject} 
          setModal={setModal} 
        />
        ) : null}
    </>
  );
}
