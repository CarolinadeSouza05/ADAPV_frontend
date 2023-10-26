import { Cards, DotsThreeVertical, Phone, User } from "@phosphor-icons/react";
import * as Popover from "@radix-ui/react-popover";
import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { inputsFormValidate } from '../../Telas/RegisterVolunteer';
import { editRegisterVoluntario, editRegisterVoluntarioAceitafazer, getAllRegisterAcceptToDo, getAllRegisterVoluntario } from "../../api";
import { CheckboxDropdownAcceptToDo } from "../../components/CheckboxDropdownAcceptToDo";
import { InputsForm } from "../../components/InputsForm";
import { NameToAccepToDoAllFromVolunteer, ObjectEmptyValue, disponibilidadeArray, periodoArray } from "../../util";


export function FormEditVoluntario(props) {
  const { formValidate, setFormValidate, setRegisterVolunteers, setModal, acceptToDoAll, setAcceptToDoAll } = props;
  const [acceptToDoHandleVoluntter, setAcceptToDoHandleVoluntter] = useState([]);
  const [validado, setValidado] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <form className="form-cadastro-voluntario" onSubmit={(e) => submit(e)}>
        <div className="form-cadastro-header">
          <div className="titulo-usuarios">
            <img
              className="vector vectorEntrada"
              src={"vector-3.svg"}
              alt="Vector"
            />
            <span className="span0"> Cadastro </span><span className="span1"> de Voluntários</span></div>


          <Popover.Root>
            <Popover.Trigger className="popover-trigger">
                <DotsThreeVertical size={32} />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className="popover-content">
                <button className="button-popover-trigger" onClick={() => setModal(true)} >
                  <Cards size={32} />
                  <span>Modal</span>
                </button>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
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
          <div className="aceitar-fazer-inputs">
            <CheckboxDropdownAcceptToDo
              inputs={acceptToDoAll}
              acceptToDoHandleVoluntter={acceptToDoHandleVoluntter}
              setAcceptToDoHandleVoluntter={setAcceptToDoHandleVoluntter}
              formValidate={formValidate} 
              titleCheckbox={"O que aceitaria fazer"}
              type="checkbox" 
              name="oQueAceitariaFazer"
              handleChangeInput={handleChangeInput}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>
        </div>
        <div className="container-button alinhamento">
          <button type="submit">Atualizar</button>
        </div>
      </form>
    </>
  );

  async function submit(e) {
    e.preventDefault();

    if (ObjectEmptyValue(formValidate)) {

      const message = await editRegisterVoluntario(formValidate);
      await editRegisterVoluntarioAceitafazer({ id_voluntario: formValidate.id, ids_aceitafazer: acceptToDoHandleVoluntter })

      setValidado(false);
      toast.success(typeof message === "string" && "Voluntário Editado com sucesso", {
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
      setValidado(true);
    }

    setRegisterVolunteers(await getAllRegisterVoluntario());
    setIsOpen(false);
    setAcceptToDoAll(await getAllRegisterAcceptToDo());
    NameToAccepToDoAllFromVolunteer(setRegisterVolunteers, setAcceptToDoAll);
    setTimeout(() => {
      EmptyObject();
      setFormValidate(inputsFormValidate);
    }, 6000);
  }

  function EmptyObject() {
    disponibilidadeArray.forEach((input) => (input.checked = false));
    periodoArray.forEach((input) => (input.checked = false));
  }

  function maskCel(event) {
    var celular = event.target.value;
    celular = celular.replace(/\D/g, "");
    celular = celular.replace(/^(\d{2})(\d)/g, "($1) $2");
    celular = celular.replace(/(\d{5})(\d)/, "$1-$2");
    event.target.value = celular;
  }

  function handleChangeInput(e, index) {
    const updatedInputs = [...acceptToDoAll];
    const aux = [...acceptToDoHandleVoluntter];

    if(e.target.checked) {
      aux.push(Number(e.target.value))
    } else {
      const indexOfChange = aux.indexOf(Number(e.target.value));
      aux.splice(indexOfChange, 1);
    }

    setAcceptToDoHandleVoluntter(aux.sort((dado1, dado2) => dado1 - dado2));
    updatedInputs[index].isChecked =  e.target.checked;
    setAcceptToDoAll(updatedInputs);
  };
}
