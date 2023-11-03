import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteRegisterOffice, getAllRegisterOffice } from "../api";
import { AsideAccepToDo } from "../components/AsideAcceptToDo";
import { HeaderAdm } from "../components/HeaderAdm";
import { FormRegisterOffice } from "../formularios/FormRegisterOffice";
import { FormEditOffice } from "../formularios/FormRegisterOffice/FormEditOffice";
import { AsideAdm } from "./Adm/AsideAdm";
import "./RegisterVolunteer.css";


export const inputsFormValidateOfficeProps = {
  id: 0,
  name: "",
  edit: -1,
}

export function RegisterOffice() {
  const [formValidateOffice, setFormValidateOffice] = useState(inputsFormValidateOfficeProps);
  const [officeAll, setOfficeAll] = useState([]);

  useEffect(() => {
    (async function () {
      setOfficeAll(await getAllRegisterOffice());
    })()
  }, [])

  return (
    <>
      <AsideAdm />
      <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />

      <main className="main-adm-register">
            <section className="container-main cadastros flex-col aside-cadastro-aceitafazer">
                <AsideAccepToDo 
                  infoAll={officeAll}
                  titleTable={"Registro de Cargos"}
                  editRegister={editOffice} 
                  deleteRegister={deleteOffice} 
              />
            </section>

            <section className="container-main form-cadastro alinhamento">
              {formValidateOffice.edit === -1 ? (
                <FormRegisterOffice setOffice={setOfficeAll} formValidateOffice={formValidateOffice} setFormValidateOffice={setFormValidateOffice} />
              ) : (
                <FormEditOffice setOffice={setOfficeAll} formValidateOffice={formValidateOffice} setFormValidateOffice={setFormValidateOffice} />
              )}
            </section>
      </main>
      <ToastContainer />
    </>
  );

  function editOffice(office) {
    const { edit, ...rest } = office;
    const aux = {
        edit: 1,
        ...rest
    };

    setFormValidateOffice(aux);
  }

  async function deleteOffice(office) {
      if (window.confirm(`Quer mesmo deletar o cargo ${office.name}?`)) {
          const message = await deleteRegisterOffice(office);
          setOfficeAll(await getAllRegisterOffice());

          if (message?.errno === 1451) {
              toast.error("Esse cargo está associada a um usuário, portanto não pode ser deletada!", {
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
      }
  }
}
