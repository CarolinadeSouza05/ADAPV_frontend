import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteRegisterAccepToDo, getAllRegisterAcceptToDo } from "../api";
import { AsideAccepToDo } from "../components/AsideAcceptToDo";
import { HeaderAdm } from "../components/HeaderAdm";
import { FormRegisterAcceptToDo } from "../formularios/FormRegisterAcceptToDo";
import { FormEditAcceptToDo } from "../formularios/FormRegisterAcceptToDo/FormEditAcceptToDo";
import { AsideAdm } from "./Adm/AsideAdm";
import "./RegisterVolunteer.css";
import { StoreContext } from "../context";
import { format, parseISO } from "date-fns";

export const inputsFormValidateAccepToDoProps = {
  id: 0,
  name: "",
  edit: -1,
}

export function RegisterAcceptToDo() {
  const [formValidateAccepToDo, setFormValidateAccepToDo] = useState(inputsFormValidateAccepToDoProps);
  const [acceptToDoAll, setAcceptToDoAll] = useState([]);
  const useStore = useContext(StoreContext);
  const { user } = useStore();

  useEffect(() => {
    (async function () {
      setAcceptToDoAll(await getAllRegisterAcceptToDo());
    })()
  }, [])

  return (
    <>
      <AsideAdm />
      <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />
      <main className="main-adm-register">
        <section className="container-main cadastros flex-col aside-cadastro-aceitafazer">
          <AsideAccepToDo 
            infoAll={acceptToDoAll}
            titleTable={"Registro de Tarefa"}
            editRegister={editAccepToDo}
            deleteRegister={deleteAccepToDo}
          />
        </section>

        <section className="container-main form-cadastro alinhamento">
          {formValidateAccepToDo.edit === -1 ? (
            <FormRegisterAcceptToDo 
              setAcceptToDoAll={setAcceptToDoAll} 
              formValidateAccepToDo={formValidateAccepToDo} 
              setFormValidateAccepToDo={setFormValidateAccepToDo} 
            />
          ) : (
            <FormEditAcceptToDo setAcceptToDoAll={setAcceptToDoAll} formValidateAccepToDo={formValidateAccepToDo} setFormValidateAccepToDo={setFormValidateAccepToDo} />
          )}
        </section>
      </main>
      <ToastContainer />
    </>
  );

  function editAccepToDo(acceptToDo) {
    const { edit, data, ...rest } = acceptToDo;
    const aux = {
        edit: 1,
        data: format(parseISO(data), "yyyyy-MM-dd"),
        ...rest
    };

    setFormValidateAccepToDo(aux);
  }

  async function deleteAccepToDo(acceptToDo) {
      if (window.confirm(`Quer mesmo deletar a tarefa ${acceptToDo.name}?`)) {
          const message = await deleteRegisterAccepToDo(acceptToDo, user.token, user.id);
          if (message?.errno === 1451) {
              toast.error("Essa tarefa está associada a um voluntário, portanto não pode ser deletada!", {
                  position: "bottom-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              })
          } else {
              toast.success(message.mensagem, {
                  position: "bottom-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              })
          }
          setTimeout(async () => {
            setAcceptToDoAll(await getAllRegisterAcceptToDo());
          }, 5000)
      }
  }
}
