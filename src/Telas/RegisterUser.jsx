import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteRegisterUser, getAllRegisterUsers } from "../api";
import { Aside } from "../components/Aside";
import { HeaderAdm } from "../components/HeaderAdm";
import { Modal } from "../components/Modal";
import { FormCadastroUsuario } from "../formularios/FormCadastroUsuario";
import { FormEditUsuario } from "../formularios/FormCadastroUsuario/FormEditUsuario";
import { AsideAdm } from "./Adm/AsideAdm";
import './RegisterUser.css';
import { StoreContext } from "../context";

export const inputsFormValidate = {
  id: 0,
  nome: "",
  telefone: "",
  email: "",
  senha: "",
  edit: -1,
}

export function RegisterUser() {
  const useStore = useContext(StoreContext);
  const { user } = useStore();
  const [formCadastroInput, setFormCadastroInput] = useState(inputsFormValidate);
  const [registerFormCadastro, setRegisterFormCadastro] = useState([]);
  const [modal, setModal] = useState(false);
  const tableHead = [
    "Id",
    "Nome",
    "Email",
    "Telefone",
    "Cargo",
    "Data Criado"
  ];

  useEffect(() => {
    (async () => {
      setRegisterFormCadastro(await getAllRegisterUsers(user.id, user.token))
    })()
  }, [])
  
  return (
    <>
      <AsideAdm />
      <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />
      <main className="main-adm-register">
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
          />
          ) : (
              <FormEditUsuario
                formCadastroInput={formCadastroInput}
                setFormCadastroInput={setFormCadastroInput}
                setRegisterFormCadastro={setRegisterFormCadastro}
                setModal={setModal}
              />
          )}
        </section>
      </main>

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
      const message = await deleteRegisterUser(aux, user.id, user.token);
      setRegisterFormCadastro(await getAllRegisterUsers(user.id, user.token));
      toast.success(message && "Voluntário Deletado com sucesso", {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      })
    }
  }
}
