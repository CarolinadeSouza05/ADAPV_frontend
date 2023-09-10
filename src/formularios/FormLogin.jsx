import React from "react";
import { EnvelopeSimple, Key,} from "@phosphor-icons/react";
import { InputsForm } from "../components/InputsForm";
import { formProps } from "../Telas/Login";

export function FormLogin({ formInput, setFormInput, setModal, setLoginsAll, loginsAll }) {
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

  function submitForm(e) {
    e.preventDefault();

    if(ObjectEmptyValue(formInput)){
      setLoginsAll([...loginsAll, formInput]);
      setFormInput(formProps);
    }
    else
      alert("Preencha os campos vazios!");
  }

  function ObjectEmptyValue(array) {
    for (let chave in array) {
      if (array.hasOwnProperty(chave) && array[chave] === "") return false;
    }
    return true;
  }

  return (
    <div className="form-login-container">
      <header className="form-login-header alinhamento">
        <div className="form-login-titulo alinhamento">
        <img class="vector" src={"vector-3.svg"} alt="Vector" />
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

      <section className="section">
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
}
