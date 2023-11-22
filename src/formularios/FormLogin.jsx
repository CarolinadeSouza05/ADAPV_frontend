import { EnvelopeSimple, Key, } from "@phosphor-icons/react";
import React, { useContext } from "react";
import { getRegisterEmailPassword } from "../api";
import { InputsForm } from "../components/InputsForm";
import { StoreContext } from "../context";
import vector3 from "../imagens/vector-3.svg";
import { toast } from "react-toastify";

export function FormLogin({ formInput, setFormInput, setModal, setLoginsAll, loginsAll }) {
  const useStore = useContext(StoreContext);
  const { setUser } = useStore();

  const inputsForm = [
    {
      type: "email",
      name: "email",
      id: "email",
      value: formInput.email,
      placeholder: "E-mail",
      class: "form-control",
      icon: EnvelopeSimple,
      required: true,
    },

    {
      type: "password",
      name: "password",
      id: "password",
      value: formInput.password,
      placeholder: "Senha",
      class: "form-control",
      icon: Key,
      required: true,
      minLength: 3,
    },
  ];

  return (
    <div className="form-login-container">
      <header className="form-login-header alinhamento">
        <div className="form-login-titulo alinhamento">
        <img class="vector" src={vector3} alt="Vector" />
          <h1>
            Pet<span>Adopte</span>
          </h1>

        </div>

        <span className="form-login-header-subtitulo">
          Ao adotar um animal de estimação, você estará salvando uma vida e
          dando a ele uma segunda chance para ter um lar amoroso.
        </span>

        <h2>Não perca tempo, adote um pet hoje mesmo!</h2>
      </header>

      <section className="section section-login">
        <div className="section-container alinhamento">
          <section className="section-form alinhamento">
            <h3>
              Log<span>in</span>
            </h3>

            <form className="alinhamento" onSubmit={(e) => submitForm(e)}>
              {inputsForm.map((input, index) => (
                <div className="section-form-input alinhamento">
                  <input.icon size={26} />
                  <InputsForm
                    infoInput={input}
                    formValidate={formInput}
                    setFormValidate={setFormInput}
                  />
                </div>
              ))}
              <p className="alinhamento">Esqueci minha senha</p>

              <div className="container-button alinhamento">
                <button className="btn register_login" type="submit">
                  Entrar
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  );

  async function submitForm(e) {
    e.preventDefault();

    if(ObjectEmptyValue(formInput)){
      const registerInfo = await getRegisterEmailPassword({ email: formInput.email, senha: formInput.password });
      setUser(registerInfo.message.user === undefined ? {} : {
        id: registerInfo.message.user.id,
        role: registerInfo.message.user.role,
        token: registerInfo.message.token,
      });
      toast.success("Login realizado!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else
      toast.error("Preencha os campos vazios!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }

  function ObjectEmptyValue(array) {
    for (let chave in array) {
      if (array.hasOwnProperty(chave) && array[chave] === "") return false;
    }
    return true;
  }
}
