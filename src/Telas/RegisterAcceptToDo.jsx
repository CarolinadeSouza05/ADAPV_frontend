import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteRegisterAccepToDo, getAllRegisterAcceptToDo } from "../api";
import { AsideAccepToDo } from "../components/AsideAcceptToDo";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { FormRegisterAcceptToDo } from "../formularios/FormRegisterAcceptToDo";
import { FormEditAcceptToDo } from "../formularios/FormRegisterAcceptToDo/FormEditAcceptToDo";
import "./RegisterVolunteer.css";

export const inputsFormValidateAccepToDoProps = {
  id: 0,
  name: "",
  edit: -1,
}

export function RegisterAcceptToDo() {
  const [formValidateAccepToDo, setFormValidateAccepToDo] = useState(inputsFormValidateAccepToDoProps);
  const [acceptToDoAll, setAcceptToDoAll] = useState([]);

  useEffect(() => {
    (async function () {
      setAcceptToDoAll(await getAllRegisterAcceptToDo());
    })()
  }, [])

  return (
    <>
      <Cabecalho />
      <main>
            <section className="container-main cadastros flex-col aside-cadastro-aceitafazer">
              <AsideAccepToDo 
                infoAll={acceptToDoAll}
                titleTable={"Registro de Categoria"}
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
      <Footer />

      <ToastContainer />
    </>
  );

  function editAccepToDo(acceptToDo) {
    const { edit, ...rest } = acceptToDo;
    const aux = {
        edit: 1,
        ...rest
    };

    setFormValidateAccepToDo(aux);
  }

  async function deleteAccepToDo(acceptToDo) {
      if (window.confirm(`Quer mesmo deletar a tarefa ${acceptToDo.name}?`)) {
          const message = await deleteRegisterAccepToDo(acceptToDo);
          setAcceptToDoAll(await getAllRegisterAcceptToDo());

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
              toast.success(message, {
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
      }
  }
}
