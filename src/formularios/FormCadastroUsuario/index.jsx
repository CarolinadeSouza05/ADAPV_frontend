import { Cards, DotsThreeVertical } from "@phosphor-icons/react";
import * as Popover from "@radix-ui/react-popover";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inputsFormValidate } from "../../Telas/RegisterUser";
import { createRegisterUser, getAllRegisterUsers } from "../../api";
import { InputsForm } from "../../components/InputsForm";
import { StoreContext } from "../../context";
import baixar from "../../imagens/baixar.png";
import vector_3 from "../../imagens/vector-3.svg";
import { ObjectEmptyValue } from "../../util";

export function FormCadastroUsuario(props) {
  const useStore = useContext(StoreContext);
  const { user } = useStore();
  const {
    formCadastroInput,
    setFormCadastroInput,
    setRegisterFormCadastro,
    setModal,
  } = props;
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
      icon: AiOutlineUser,
      value: formCadastroInput.nome,
      required: true,
    },

    {
      type: "email",
      name: "email",
      id: "email",
      placeholder: "Email",
      value: formCadastroInput.email,
      icon: AiOutlineMail,
      required: true,
    },

    {
      type: "tel",
      name: "telefone",
      id: "telefone",
      value: formCadastroInput.telefone,
      placeholder: "Telefone",
      icon: AiOutlinePhone,
      required: true,
      minlength: 15,
      maxLength: 15,
      onInput: maskCel,
    },

    {
      type: "password",
      name: "senha",
      id: "senha",
      value: formCadastroInput.senha,
      placeholder: "Senha",
      required: true,
      minLength: 3,
    },
  ];

  return (
    <>
      <div className="form-cadastro flex-col">
        <div className="form-cadastro-header">
          <div className="titulo_usuarios">
            <div className="titulo">
              <img
                className="vector vectorEntrada"
                src={vector_3}
                alt="Vector"
              />
              <span className="span0">Cadastro</span>{" "}
              <span className="span1">de Usuários</span>
            </div>
          </div>

          <Popover.Root>
            <Popover.Trigger className="popover-trigger">
              <DotsThreeVertical size={32} />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className="popover-content">
                <button
                  className="button-popover-trigger"
                  onClick={() => setModal(true)}
                >
                  <Cards size={32} />
                  <span>Modal</span>
                </button>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        <form className="form-cadastro-pessoa" onSubmit={submit}>
          {inputForm.map((input, index) => (
            <div className="form-input flex-col" key={index}>
              <label htmlFor={input.name}>{input.placeholder}</label>
              <div
                className={`alinhamento input-container ${
                  validado && !input.value ? "input-invalid" : ""
                }`}
              >
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
            <button type="submit">Cadastrar</button>
          </div>
          <a href="/manuais/manual_usuario.pdf" download="manual_usuario.pdf">
            <img className="vectorbaixar" src={baixar} alt="Baixar" />
            Manual do Usuário
          </a>
        </form>
      </div>
    </>
  );

  async function submit(e) {
    e.preventDefault();
    const dataAux = new Date();
    const formatData = format(dataAux, "yyyy-MM-dd");

    const { ...rest } = formCadastroInput;
    const register = {
      role: "USER",
      data: formatData,
      ...rest,
    };

    if (ObjectEmptyValue(register)) {
      const message = await createRegisterUser(register, user.id, user.token);
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
      });
    } else {
      toast.error(
        "Verifique se todos os campos estão preenchidos corretamente",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }

    setRegisterFormCadastro(await getAllRegisterUsers(user.id, user.token));
    setTimeout(() => {
      setFormCadastroInput(inputsFormValidate);
    }, 6000);
  }
}
