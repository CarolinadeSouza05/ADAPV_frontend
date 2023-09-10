import { useEffect, useState } from "react";
import { Aside } from "../components/Aside";
import { Footer } from "../components/Footer";
import { Cabecalho } from "../components/Cabecalho";
import { Modal } from "../components/Modal";
import { FormCadastroPessoa } from '../formularios/FormCadastroPessoa'
import './CadastroPessoa.css'
import { deleteRegisterLogin, getAllRegisterLogin } from "../api";

export const formCadastroInputProps = {
  nome: "",
  email: "",
  telefone: "",
  enderecoRua: "",
  enderecoNumero: "",
  enderecoCep: "",
  enderecoCidade: "",
  senha: "",
  senhaConfirmar: "",
  edit: -1,
};

export function CadastroPessoa() {
  const [formCadastroInput, setFormCadastroInput] = useState(
    formCadastroInputProps
  );
  const [registerFormCadastro, setRegisterFormCadastro] = useState([]);
  const [modal, setModal] = useState(false);
  const tableHead = [
    "Nome",
    "Email",
    "Telefone",
    "Endereco",
  ];

  useEffect(() => {
    (async function(){
      setRegisterFormCadastro(await getAllRegisterLogin());
    })()
  }, [])

  async function deleteRegister(id){
    await deleteRegisterLogin(id);
    setRegisterFormCadastro(await getAllRegisterLogin());
  }
  
  return (
    <>
      <Cabecalho />
      <main>
        <section className="container-main cadastros flex-col">
          <Aside />
        </section>

        <section className="container-main form-cadastro alinhamento">
          <FormCadastroPessoa
            formCadastroInput={formCadastroInput}
            setFormCadastroInput={setFormCadastroInput}
            setRegisterFormCadastro={setRegisterFormCadastro}
            setModal={setModal}
          />
        </section>
      </main>
      <Footer />

      {modal ? (
        <Modal
          title={"Cadastro de Usuários"}
          tableHead={tableHead}
          registerAll={registerFormCadastro}
          setFormValidate={setFormCadastroInput}
          deleteRegister={deleteRegister}
          setModal={setModal}
          setRegisterAll={setRegisterFormCadastro}
        />
      ) : null}
    </>
  );
}
