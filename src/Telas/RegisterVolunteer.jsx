import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllRegisterAcceptToDo } from "../api";
import { Aside } from "../components/Aside";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { FormCadastroVoluntario } from "../formularios/FormCadastroVoluntario";
import { disponibilidadeArray, periodoArray } from "../util";
import "./RegisterVolunteer.css";

export const inputsFormValidate = {
  id: 0,
  nome: "",
  telefone: "",
  disponibilidade: "",
  periodo: "",
  oQueAceitariaFazer: [],
  edit: -1,
}


export function RegisterVolunteer() {
  const [formValidate, setFormValidate] = useState(inputsFormValidate);
  const [acceptToDoAll, setAcceptToDoAll] = useState([]);

  useEffect(() => {
    (async function () {
      const aux = await getAllRegisterAcceptToDo();

      setAcceptToDoAll(aux);
    })();
  }, []);


  return (
    <>
      <Cabecalho />
      <main className="main-register-volunteer">
            <section className="container-main cadastros flex-col">
              <Aside />
            </section>

            <section className="container-main form-cadastro alinhamento">
                <FormCadastroVoluntario 
                  formValidate={formValidate} 
                  setFormValidate={setFormValidate} 
                  acceptToDoAll={acceptToDoAll}
                />
            </section>          
      </main>

      <ToastContainer />
      <Footer />
    </>
  );

  function editRegister(register, index) {
    ChangeValueObject(register);

    if (register.telefone !== undefined) {
      const { ...rest } = register;
      const auxRegisters = {
        edit: index,
        ...rest
      };

      setFormValidate(auxRegisters);
    }
    else {
      setFormValidate(register);
    }
  }

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
  }
}
