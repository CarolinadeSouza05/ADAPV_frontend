import { Clipboard } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { inputsFormValidateAccepToDoProps } from "../../Telas/RegisterAcceptToDo";
import vector_3 from "../../imagens/vector-3.svg"
import { editRegisterAccepToDo, getAllRegisterAcceptToDo } from "../../api";
import { InputsForm } from "../../components/InputsForm";
import { ObjectEmptyValue } from "../../util";
import baixar from "../../imagens/baixar.png";
import { StoreContext } from "../../context";

export function FormEditAcceptToDo({ setAcceptToDoAll, formValidateAccepToDo, setFormValidateAccepToDo }) {
    const [validado, setValidado] = useState(false);
    const useStore = useContext(StoreContext);
    const { user } = useStore();

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
                            src={vector_3}
                            alt="Vector"
                        />
                        <span className="span0">Edição</span>
                        <span className="span1"> de Tarefas</span>
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
                <a href='/manuais/manual_tarefas_aceitas.pdf' download="manual_tarefas_aceitas.pdf">
                    <img
                    className="vectorbaixar"
                    src={baixar}
                    alt="Baixar"
                    />
                    Manual do Usuário
                </a>
            </form>
            
            <ToastContainer />
        </>
    );

    async function submit(e){
        e.preventDefault();
        if(ObjectEmptyValue(formValidateAccepToDo)){
            const message = await editRegisterAccepToDo(formValidateAccepToDo, user.token, user.id);
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
        }, 4000);
    }
}