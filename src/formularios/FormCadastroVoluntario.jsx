import React,{useState} from "react";
import { User, Phone, Cards } from "@phosphor-icons/react";
import { ObjectEmptyValue, aceitarFazerArray, disponibilidadeArray, periodoArray } from "../util";
import { InputsForm } from "../components/InputsForm";
import { inputsFormValidate } from '../Telas/CadastroVoluntario'
import { createRegisterVoluntario, getAllRegisterVoluntario, getRegisterTel } from "../api";
import { editRegisterVoluntario } from "../api";

export function FormCadastroVoluntario(props) {
  const { formValidate, setFormValidate, setRegisterVolunteers, setModal } = props;
  const [validado, setValidado] = useState(false);

  function maskCel(event) {
    var celular = event.target.value;
    celular = celular.replace(/\D/g, "");
    celular = celular.replace(/^(\d{2})(\d)/g, "($1) $2");
    celular = celular.replace(/(\d{5})(\d)/, "$1-$2");
    event.target.value = celular;
  }
  
  const inputForm = [
    {
      type: "text",
      name: "nome",
      id: "nome",
      placeholder: "Nome Completo",
      value: formValidate.nome,
      icon: User,
      minlength: 3,
    },

    {
      type: "tel",
      name: "telefone",
      id: "telefone",
      value: formValidate.telefone,
      placeholder: "Telefone",
      icon: Phone,
      minlength: 15,
      maxLength: 15,
      onInput: maskCel
    }
  ]

  const disponibilidadeInputs = disponibilidadeArray.map((input, index) => (
    <InputsForm
      key={index}
      infoInput={input}
      index={index}
      formValidate={formValidate}
      setFormValidate={setFormValidate}
      classNameLabel={validado && !formValidate.disponibilidade ? "label-invalid" : ""}
    />
  ));
  
  const periodoInputs = periodoArray.map((input, index) => (
    <InputsForm
      key={index}
      infoInput={input}
      index={index}
      formValidate={formValidate}
      setFormValidate={setFormValidate}
      classNameLabel={validado && !formValidate.periodo ? "label-invalid" : ""}
    />
  ));
  
  const aceitarFazerInputs = aceitarFazerArray.map((input, index) => (
    <InputsForm
      key={index}
      infoInput={input}
      index={index}
      formValidate={formValidate}
      setFormValidate={setFormValidate}
      classNameLabel={validado && !formValidate.oQueAceitariaFazer ? "label-invalid" : ""}
    />
  ));
  

  async function submit(e) {
    e.preventDefault();

    if (ObjectEmptyValue(formValidate)) {
      if (formValidate.edit === -1) {
        const aux = await getRegisterTel(formValidate.telefone);

        if(aux.telefone === formValidate.telefone){
          alert("Voluntário já cadastrado")
        }
        else{
          await createRegisterVoluntario(formValidate);
          setValidado(false);
        }
      } else {
        console.log(formValidate);
        await editRegisterVoluntario(formValidate, formValidate.id);
      }
    } else {
      setValidado(true);
    }

    EmptyObject();
    setRegisterVolunteers(await getAllRegisterVoluntario());
    setFormValidate(inputsFormValidate);
  }

  function EmptyObject() {
    disponibilidadeArray.forEach((input) => (input.checked = false));
    periodoArray.forEach((input) => (input.checked = false));
    aceitarFazerArray.forEach((input) => (input.checked = false));
  }

  return (
    <>
      <form className="form-cadastro-voluntario" onSubmit={(e) => submit(e)}>
        <div className="form-cadastro-header">
        <div className="titulo_usuarios">
      <img
                className="vector vectorEntrada"
                src={"vector-3.svg"}
                alt="Vector"
              />
        <span className="span0"> Cadastro </span><span className="span1"> de Voluntários</span></div>

          <Cards size={32} onClick={() => setModal(true)} />
        </div>
        {inputForm.map((input, index) => (
          <div className="form-input flex-col" key={index}>
            <label htmlFor={input.name}>{input.placeholder}</label>
            <div className={`alinhamento input-container ${validado && !input.value ? "input-invalid" : ""}`}>
              <input.icon size={32} />
              <InputsForm
                infoInput={input}
                formValidate={formValidate}
                setFormValidate={setFormValidate}
                onInput={input.onInput}
              />
            </div>
          </div>
        ))}

        <div className="flex-col container-checkboxs">
          <h3>Disponibilidade: </h3>
          <div className="checkboxs">
            {disponibilidadeInputs}
          </div>
        </div>
        <div className="flex-col container-checkboxs">
          <h3>Período: </h3>
          <div className="checkboxs">
            {periodoInputs}
          </div>
        </div>
        <div className="flex-col container-checkboxs">
          <h3>O que aceitaria fazer: </h3>

          <div className="checkboxs aceitar-fazer-inputs">
            {aceitarFazerInputs}
          </div>
        </div>
        <div className="container-button alinhamento">
          <button type="submit">{formValidate.edit === -1 ? "Cadastrar" : "Atualizar"}</button>
        </div>
      </form>
    </>
  );
}

