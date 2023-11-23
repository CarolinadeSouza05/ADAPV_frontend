import { Clipboard } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { inputsFormValidateOfficeProps } from "../../Telas/RegisterOffice";
import vector_3 from "../../imagens/vector-3.svg"
import { editRegisterOffice, getAllRegisterOffice } from "../../api";
import { InputsForm } from "../../components/InputsForm";
import { ObjectEmptyValue } from "../../util";
import baixar from "../../imagens/baixar.png";

export function FormEditOffice({ setOffice, formValidateOffice, setFormValidateOffice }) {
    const [validado, setValidado] = useState(false);

    const inputForm = [
        {
            type: "text",
            name: "name",
            id: "name",
            placeholder: "Nome do Cargo",
            value: formValidateOffice.name,
            icon: Clipboard,
            minlength: 3,
        },
    ]

    return (
        <>
            <form className="form-cadastro-voluntario form-cadastro-aceitafazer" onSubmit={(e) => submit(e)}>
                <div className="form-cadastro-header aceitar-fazer-header">
                    <div className="titulo-usuarios">
                        <img
                            className="vector vectorEntrada"
                            src={vector_3}
                            alt="Vector"
                        />
                        <span className="span0">Cadastro</span>
                        <span className="span1"> de Cargos</span>
                    </div>

                </div>

                {inputForm.map((input, index) => (
                    <div className="form-input flex-col" key={index}>
                        <label htmlFor={input.name}>{input.placeholder}</label>
                        <div className={`alinhamento input-container ${validado && !input.value ? "input-invalid" : ""}`}>
                            <input.icon size={32} />
                            <InputsForm
                                infoInput={input}
                                formValidate={formValidateOffice}
                                setFormValidate={setFormValidateOffice}
                                onInput={input.onInput}
                            />
                        </div>
                    </div>
                ))}

                <div className="container-button alinhamento">
                    <button type="submit">Editar</button>
                </div>
                <a href='/manuais/manual_cargo.pdf' download="manual_cargo.pdf">
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

    async function submit(e){
        e.preventDefault();
        if(ObjectEmptyValue(formValidateOffice)){
            const message = await editRegisterOffice(formValidateOffice);
            setValidado(false);
            
            toast.success(message.mensagem, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        else{
            setValidado(true);
        }

        setFormValidateOffice(inputsFormValidateOfficeProps);
        setTimeout(async () => {
            setOffice(await getAllRegisterOffice());
        }, 6000)
    }
}