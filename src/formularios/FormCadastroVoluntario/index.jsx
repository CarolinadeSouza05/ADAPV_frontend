import { Phone, User } from "@phosphor-icons/react";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { inputsFormValidate } from '../../Telas/RegisterVolunteer';
import { createRegisterVoluntario, createRegisterVoluntarioAceitafazer, getAllRegisterVoluntario, getRegisterTel } from "../../api";
import { CheckboxDropdownAcceptToDo } from "../../components/CheckboxDropdownAcceptToDo";
import { InputsForm } from "../../components/InputsForm";
import { StoreContext } from "../../context";
import baixar from "../../imagens/baixar.png";
import vector_3 from "../../imagens/vector-3.svg";
import { NameToAccepToDoAllFromVolunteer, ObjectEmptyValue, disponibilidadeArray, periodoArray } from "../../util";


export function FormCadastroVoluntario(props) {
  const { formValidate, setFormValidate, setRegisterVolunteers, setModal, acceptToDoAll, setAcceptToDoAll } = props;
  const [validado, setValidado] = useState(false);
  const useStore = useContext(StoreContext);
  const { user } = useStore();
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
              src={vector_3}
              alt="Vector"
            />
            <span className="span0"> Cadastro </span><span className="span1"> de Voluntários</span></div>
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
          <button type="submit">Cadastrar</button>
        </div>
        <a href='/manuais/manual_voluntario.pdf' download="manual_voluntario.pdf">
            <img
              className="vectorbaixar"
              src={baixar}
              alt="Baixar"
            />
            Manual do Usuário
          </a>
      </form>
    </>
  );

  async function submit(e) {
    e.preventDefault();
    if (ObjectEmptyValue(formValidate)) {
        const aux = await getRegisterTel(formValidate.telefone, user.token, user.id);
        if (aux.telefone === formValidate.telefone) { 
          toast.error("Voluntário já cadastrado", {
            position: "bottom-left",
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            theme: "light",
          })
        }
        else {
          const dataAux = new Date();
          const formatData = format(dataAux, "yyyy-MM-dd");
          
          const { ...rest } = formValidate;
          const register = {
            data: formatData,
            ...rest 
          };

          const auxOqueAceitariaFazer = formValidate.oQueAceitariaFazer;
          const message = await createRegisterVoluntario(register, user.token, user.id);
          
          await createRegisterVoluntarioAceitafazer({ id_voluntario: message.id, ids_aceitafazer: auxOqueAceitariaFazer }, user.token, user.id);
          setValidado(false);
          toast.success(message.mensagem && "Voluntário Cadastrado com sucesso", {
            position: "bottom-left",
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            theme: "light",
          })
        }
    } else {
      setValidado(true);
    }

    setRegisterVolunteers(await getAllRegisterVoluntario(user.token, user.id));
    NameToAccepToDoAllFromVolunteer(setRegisterVolunteers, setAcceptToDoAll, user.token, user.id);
    setTimeout(() => {
      EmptyObject();
      setFormValidate({ ...inputsFormValidate });
    }, 6000);
    setIsOpen(false);
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

  function handleChangeInput(e){
    const locationIndexOf = inputsFormValidate.oQueAceitariaFazer.indexOf(e.target.value)
    if(locationIndexOf !== -1){
      inputsFormValidate.oQueAceitariaFazer.slice(1, locationIndexOf);
      return ;
    }

    inputsFormValidate.oQueAceitariaFazer.push(e.target.value);
  }
}

