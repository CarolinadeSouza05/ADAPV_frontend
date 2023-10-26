import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteRegisterOffice, getAllRegisterOffice } from "../api";
import { AsideAccepToDo } from "../components/AsideAcceptToDo";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { FormRegisterOffice } from "../formularios/FormRegisterOffice";
import { FormEditOffice } from "../formularios/FormRegisterOffice/FormEditOffice";
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
      <Cabecalho />
      <main>
            <section className="container-main cadastros flex-col aside-cadastro-aceitafazer">
                <AsideAccepToDo 
                infoAll={officeAll}
                titleTable={"Registro de Cargos"}
                editRegister={editUser} 
                deleteRegister={deleteUser} 
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
      <Footer />
    </>
  );

  function editUser(user) {
    const { edit, ...rest } = user;
    const aux = {
        edit: 1,
        ...rest
    };

    setFormValidateOffice(aux);
  }

  async function deleteUser(user) {
      if (window.confirm(`Quer mesmo deletar o cargo ${user.name}?`)) {
          const message = await deleteRegisterOffice(user);
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
