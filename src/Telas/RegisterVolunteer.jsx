import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteRegisterVoluntario, getAllRegisterVoluntario } from "../api";
import { Aside } from "../components/Aside";
import { HeaderAdm } from "../components/HeaderAdm";
import { Modal } from "../components/Modal";
import { FormCadastroVoluntario } from "../formularios/FormCadastroVoluntario";
import { FormEditVoluntario } from "../formularios/FormCadastroVoluntario/FormEditVoluntario";
import { NameToAccepToDoAllFromVolunteer, disponibilidadeArray, periodoArray } from "../util";
import { AsideAdm } from "./Adm/AsideAdm";
import "./RegisterVolunteer.css";
import { StoreContext } from "../context";

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
  const [registerVolunteers, setRegisterVolunteers] = useState([]);
  const [modal, setModal] = useState(false);
  const useStore = useContext(StoreContext);
  const { user } = useStore();

  useEffect(() => {
    (async function () {
      await NameToAccepToDoAllFromVolunteer(setRegisterVolunteers, setAcceptToDoAll, user.token, user.id);
    })();
  }, []);

  const tableHead = ["Id", "Nome Completo", "Telefone", "Dias da semana", "Período", "O que aceitaria fazer"]

  return (
    <>
      <AsideAdm />
      <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />
      <main className="main-adm-register">
            <section className="container-main cadastros flex-col">
              <Aside />
            </section>

            <section className="container-main form-cadastro alinhamento">
              {formValidate.edit === -1 ? (
                <FormCadastroVoluntario 
                  formValidate={formValidate} 
                  setFormValidate={setFormValidate} 
                  setRegisterVolunteers={setRegisterVolunteers} 
                  setModal={setModal} 
                  acceptToDoAll={acceptToDoAll}
                  setAcceptToDoAll={setAcceptToDoAll}
                />
              ) : (
                <FormEditVoluntario 
                  formValidate={formValidate} 
                  setFormValidate={setFormValidate} 
                  setRegisterVolunteers={setRegisterVolunteers}
                  setModal={setModal}
                  acceptToDoAll={acceptToDoAll}
                  setAcceptToDoAll={setAcceptToDoAll}
                />
              )}
            </section>          
      </main>
      {modal && (
        <Modal
          title={"Cadastro de Voluntários"}
          tableHead={tableHead}
          registerAll={registerVolunteers}
          editRegister={editRegister}
          deleteRegister={deleteRegister}
          setModal={setModal}
        />
      )}

    <ToastContainer />
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

  async function deleteRegister(id) {
    if (window.confirm("Tem certeza de que deseja excluir o voluntário?")) {
      const aux = registerVolunteers.filter((volunteer) => volunteer.id === id);
      const message = await deleteRegisterVoluntario(aux[0]);
      setRegisterVolunteers(await getAllRegisterVoluntario());
      toast.success(message && "Voluntário Deletado com sucesso", {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      })
    }

    await NameToAccepToDoAllFromVolunteer(setRegisterVolunteers, setAcceptToDoAll);
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
