import React, { useState } from "react";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { FormLogin } from "../formularios/FormLogin";
import image_login from "../imagens/imgLogin.png";
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


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
  ];  
  return (
    <>
      <Cabecalho />
      <main className="main-adm-register main-login">
        <section className="container-main  cadastros section-img-login">
          <img src={image_login} alt="imagem-fundo-login" className="img_login" />
        </section>

        <section className="container-main form-cadastro alinhamento container-form-login">
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

      <ToastContainer />
    </>
  );
}
