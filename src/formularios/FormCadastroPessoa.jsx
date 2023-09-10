import React, { useState } from "react";
import { EnvelopeSimple, Phone, User, Cards } from "@phosphor-icons/react";
import { InputsForm } from "../components/InputsForm";
import { ObjectEmptyValue } from "../util";
import { formCadastroInputProps } from "../Telas/CadastroPessoa";
import { createRegisterLogin, editRegisterLogin, getAllRegisterLogin, getRegisterEmail } from "../api";

export function FormCadastroPessoa(props) {
  const { formCadastroInput, setFormCadastroInput, setRegisterFormCadastro, setModal } = props;
  const [validado, setValidado] = useState(false);

  function maskCel(event) {
    var celular = event.target.value;
    celular = celular.replace(/\D/g, "");
    celular = celular.replace(/^(\d{2})(\d)/g, "($1) $2");
    celular = celular.replace(/(\d{5})(\d)/, "$1-$2");
    event.target.value = celular;
  }

  function maskCEP(event) {
    var cep = event.target.value;
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2")
    event.target.value = cep;
  }

  const inputForm = [
    {
      type: "text",
      name: "nome",
      id: "nome",
      placeholder: "Nome Completo",
      icon: User,
      value: formCadastroInput.nome,
    },

    {
      type: "email",
      name: "email",
      id: "email",
      placeholder: "Email",
      value: formCadastroInput.email,
      icon: EnvelopeSimple,
    },

    {
      type: "tel",
      name: "telefone",
      id: "telefone",
      value: formCadastroInput.telefone,
      placeholder: "Telefone",
      icon: Phone,
      minlength: 15,
      maxLength: 15,
      onInput: maskCel,
    },

    {
      type: "text",
      name: "enderecoRua",
      id: "endereco-rua",
      value: formCadastroInput.enderecoRua,
      placeholder: "Nome da rua",
    },

    {
      type: "text",
      name: "enderecoNumero",
      id: "endereco-numero",
      value: formCadastroInput.enderecoNumero,
      placeholder: "N°",
      minlength: 1,
    },

    {
      type: "tel",
      name: "enderecoCep",
      id: "endereco-cep",
      value: formCadastroInput.enderecoCep,
      placeholder: "Cep",
      minLength: 9,
      maxLength: 9,
      onInput: maskCEP,
    },

    {
      type: "tel",
      name: "enderecoCidade",
      id: "endereco-cidade",
      value: formCadastroInput.enderecoCidade,
      placeholder: "Cidade",
    },

    {
      type: "password",
      name: "senha",
      id: "senha",
      value: formCadastroInput.senha,
      placeholder: "Senha",
      minLength: 3,
    },

    {
      type: "password",
      name: "senhaConfirmar",
      id: "senha-confirmar",
      value: formCadastroInput.senhaConfirmar,
      placeholder: "Confirme sua senha",
      minLength: 3,
    },
  ]

  async function submit(e) {
    e.preventDefault();
    const register = {
      nome: formCadastroInput.nome,
      email: formCadastroInput.email,
      telefone: formCadastroInput.telefone,
      endereco: `${formCadastroInput.enderecoRua} - ${formCadastroInput.enderecoNumero} - ${formCadastroInput.enderecoCep} - ${formCadastroInput.enderecoCidade}`,
      senha: formCadastroInput.senha
    }

    if (ObjectEmptyValue(formCadastroInput) && formCadastroInput.senha === formCadastroInput.senhaConfirmar) {
      if (formCadastroInput.edit === -1) {
        const aux = await getRegisterEmail(formCadastroInput.email);
        
        if (aux.email === formCadastroInput.email) {
          alert("Essa pessoa já foi cadastrada");
        }
        else {
          await createRegisterLogin(register);
          setValidado(false);
        }
      }
      else {
        await editRegisterLogin(register, formCadastroInput.id);
      }
    }
    else {
      setValidado(true);
    }
    
    setRegisterFormCadastro(await getAllRegisterLogin());
    setFormCadastroInput(formCadastroInputProps);
  }

  return (
    <div className="form-cadastro flex-col">
      <div className="form-cadastro-header">
      <div className="titulo_usuarios">
      <img className="vector vectorEntrada" src={"vector-3.svg"} alt="Vector" />
        <span className="span0"> Cadastro </span><span className="span1"> de Usuários</span></div>

        <Cards size={32} onClick={() => setModal(true)} />
      </div>

      <form className="form-cadastro-pessoa" onSubmit={submit}>
        {inputForm.map((input, index) => (
          <div className="form-input flex-col" key={index}>
            <label htmlFor={input.name}>{input.placeholder}</label>
            <div className={`alinhamento input-container ${validado && !input.value ? "input-invalid" : ""}`}>
              {input.icon && <input.icon size={32} />}
              <InputsForm
                key={index}
                infoInput={input}
                formValidate={formCadastroInput}
                setFormValidate={setFormCadastroInput}
                onInput={input.onInput}
              />
            </div>
          </div>
        ))}

        <div className="container-button alinhamento">
          <button type="submit">{formCadastroInput.edit === -1 ? "Cadastrar" : "Atualizar"}</button>
        </div>
      </form>
    </div>
  );
}
