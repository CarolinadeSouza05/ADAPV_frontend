import { Clipboard } from "@phosphor-icons/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { inputsFormValidateAccepToDoProps } from "../../Telas/RegisterAcceptToDo";
import { editRegisterAccepToDo, getAllRegisterAcceptToDo } from "../../api";
import { InputsForm } from "../../components/InputsForm";
import { ObjectEmptyValue } from "../../util";

export function FormEditAcceptToDo({ setAcceptToDoAll, formValidateAccepToDo, setFormValidateAccepToDo }) {
    const [validado, setValidado] = useState(false);

    const inputForm = [
        {
            type: "text",
            name: "name",
            id: "name",
            placeholder: "Nome da Tarefa",
            value: formValidateAccepToDo.name,
            icon: Clipboard,
            minlength: 3,
        },
    ];

    return (
        <>
            <form className="form-cadastro-voluntario form-cadastro-aceitafazer" onSubmit={(e) => submit(e)}>
                <div className="form-cadastro-header aceitar-fazer-header">
                    <div className="titulo-usuarios">
                        <img
                            className="vector vectorEntrada"
                            src={"vector-3.svg"}
                            alt="Vector"
                        />
                        <span className="span0">Edição</span>
                        <span className="span1"> de Aceitaria Fazer</span>
                    </div>
                </div>

                {inputForm.map((input, index) => (
                    <div className="form-input flex-col" key={index}>
                        <label htmlFor={input.name}>{input.placeholder}</label>
                        <div className={`alinhamento input-container ${validado && !input.value ? "input-invalid" : ""}`}>
                            <input.icon size={32} />
                            <InputsForm
                                infoInput={input}
                                formValidate={formValidateAccepToDo}
                                setFormValidate={setFormValidateAccepToDo}
                                onInput={input.onInput}
                            />
                        </div>
                    </div>
                ))}

                <div className="container-button alinhamento">
                    <button type="submit">Atualizar</button>
                </div>
            </form>
            
            <ToastContainer />
        </>
    );

    async function submit(e){
        e.preventDefault();
        if(ObjectEmptyValue(formValidateAccepToDo)){
            const message = await editRegisterAccepToDo(formValidateAccepToDo);
            setValidado(false);

            toast.success(message, {
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

        setFormValidateAccepToDo(inputsFormValidateAccepToDoProps);
        setTimeout(async () => {
            setAcceptToDoAll(await getAllRegisterAcceptToDo());
        }, 6000)
    }
}