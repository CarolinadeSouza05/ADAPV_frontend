import { useEffect, useState } from "react";
import { Aside } from "../components/Aside";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { FormCadastroUsuario } from "../formularios/FormCadastroUsuario";
import { FormEditUsuario } from "../formularios/FormCadastroUsuario/FormEditUsuario";
import './RegisterUser.css';
import { deleteRegisterUser, getAllRegisterOffice, getAllRegisterUsers } from "../api";
import { NameToOfficeFromUser } from "../util";
import { ToastContainer, toast } from "react-toastify";

export const inputsFormValidate = {
  id: 0,
  nome: "",
  telefone: "",
  email: "",
  senha: "",
  id_office: 0,
  edit: -1,
}

export function RegisterUser() {
  const [formCadastroInput, setFormCadastroInput] = useState(inputsFormValidate);
  const [registerFormCadastro, setRegisterFormCadastro] = useState([]);
  const [officeAllInfos, setOfficeAllInfos] = useState([]);
  const [modal, setModal] = useState(false);
  const tableHead = [
    "Id",
    "Nome",
    "Email",
    "Telefone",
    "Senha",
    "Cargo"
  ];

  useEffect(() => {
    (async () => {
      await NameToOfficeFromUser(setRegisterFormCadastro, setOfficeAllInfos);
    })()
  }, [])
  
  return (
    <>
      <Cabecalho />
      <main>
        <section className="container-main cadastros flex-col">
          <Aside />
        </section>

        <section className="container-main form-cadastro alinhamento">
          {formCadastroInput.edit === -1 ? (
            <FormCadastroUsuario
            formCadastroInput={formCadastroInput}
            setFormCadastroInput={setFormCadastroInput}
            setRegisterFormCadastro={setRegisterFormCadastro}
            setModal={setModal}
            officeAllInfos={officeAllInfos}
            setOfficeAllInfos={setOfficeAllInfos}
          />
          ) : (
              <FormEditUsuario
                formCadastroInput={formCadastroInput}
                setFormCadastroInput={setFormCadastroInput}
                setRegisterFormCadastro={setRegisterFormCadastro}
                setModal={setModal}
                officeAllInfos={officeAllInfos}
                setOfficeAllInfos={setOfficeAllInfos}
              />
          )}
        </section>
      </main>
      <Footer />

      {modal ? (
        <Modal
          title={"Cadastro de Usuários"}
          tableHead={tableHead}
          registerAll={registerFormCadastro}
          editRegister={editRegister}
          deleteRegister={deleteRegister}
          setModal={setModal}
        />
      ) : null}

      <ToastContainer />
    </>
  );

  function editRegister(register, index) {
    if (register.email !== undefined) {
      const { ...rest } = register;
      const auxRegisters = {
        edit: index,
        ...rest
      };

      setFormCadastroInput(auxRegisters);
    }
    else {
      setFormCadastroInput(register);
    }
  }

  async function deleteRegister(id) {
    if (window.confirm("Tem certeza de que deseja excluir o usuário?")) {
      const aux = registerFormCadastro.filter((user) => user.id === id);
      const message = await deleteRegisterUser(aux);
      setRegisterFormCadastro(await getAllRegisterUsers());
      toast.success(message && "Voluntário Deletado com sucesso", {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      })

      await NameToOfficeFromUser(setRegisterFormCadastro, setOfficeAllInfos);
    }
  }
}
