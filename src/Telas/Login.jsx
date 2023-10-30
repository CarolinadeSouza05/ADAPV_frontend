import React from "react";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { FormLogin } from "../formularios/FormLogin";
import { useState } from "react";
import { Modal } from "../components/Modal";
import "./Login.css";
import image_login from "../imagens/imgLogin.png";


export const formProps = {
  email: "",
  password: "",
};

export function Login() {
  const [formInput, setFormInput] = useState(formProps);
  const [modal, setModal] = useState(false);
  const [loginsAll, setLoginsAll] = useState([]);
  const tableHead = [
    "Email",
    "Password",
  ]
  
  return (
    <>
      <Cabecalho />
      <main>
        <section className="container-main cadastros">
          <img src={image_login} alt="imagem-fundo-login" className="img_login" />
        </section>

        <section className="container-main form-cadastro alinhamento">
          <FormLogin formInput={formInput} setFormInput={setFormInput} setModal={setModal} setLoginsAll={setLoginsAll} loginsAll={loginsAll} />
        </section>
      </main>
      <Footer />

      {modal ? (
        <Modal
            title={"Cadastro de Pessoas"}
            tableHead={tableHead}
            registerAll={loginsAll}
            setRegisterAll={setLoginsAll}
            setFormValidate={setFormInput}
            setModal={setModal}
        />
      ) : null}
    </>
  );
}
