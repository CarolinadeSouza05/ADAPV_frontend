import { MagnifyingGlass, Pencil, Trash, X } from "@phosphor-icons/react";
import './Modal.css'
import { excluirEntradas, getEntradas } from "../api/index";
import { useState, useContext } from "react";
import { StoreContext } from "../context/index.jsx";

export function Modal(props) {
  const { title, tableHead, registerAll, setRegisterAll, setFormValidate, ChangeValueObject, setModal } = props;
  console.log(registerAll);
  const [search, setSearch] = useState("");
  const useStore = useContext(StoreContext);
  const { user } = useStore();

  function editRegister(register, index) {
    if (ChangeValueObject) {
      ChangeValueObject(register);
    }
  
    if (register.email !== undefined) {
      const auxRegisters = {
        edit: index,
        email: register.email,
        enderecoRua: register.endereco?.split(" - ")[0],
        enderecoNumero: register.endereco?.split(" - ")[1],
        enderecoCep: register.endereco?.split(" - ")[2],
        enderecoCidade: register.endereco?.split(" - ")[3],
        id: register.id,
        nome: register.nome,
        senha: register.senha,
        senhaConfirmar: register.senha,
        telefone: register.telefone,
      };
  
      setFormValidate(auxRegisters);
    } else {
      setFormValidate(register);
    }
  }
  

  async function deletarEntrada(codigo) {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir a entrada?");
    if (confirmDelete) {
      try {
        await excluirEntradas(codigo,user.token,user.id);
        const entradas = await getEntradas(user.token,user.id);
        setRegisterAll(entradas);
      } catch (error) {
        console.error("Erro ao excluir o entrada:", error);
      }
    }
  }

  function onChangeSearchvalue(value) {
    setSearch(value);
  }

  return (
    <div className="modal">
      <div className="modal-container flex-col">
        <div className="modal-container-title">
          <h2>{title}</h2>

          <div className="search">
            <MagnifyingGlass size={26} />
            <input
              type="text"
              name="search"
              placeholder="Pesquise pelo tipo de arrecadação"
              onChange={(e) => onChangeSearchvalue(e.target.value)}
            />
          </div>

          <X size={32} onClick={() => setModal(false)} />
        </div>
        <table>
          <thead>
            <tr>
              {tableHead.map((head, index) => (
                <th scope="col" key={index}>
                  {head}
                </th>
              ))}
              <th scope="col">Editar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {registerAll !== undefined && registerAll.length > 0 &&
              registerAll
                .filter((register) =>
                  Object.values(register.tipo_arrecadacao)
                    .join("")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((registerInput, index) => {
                  const register = Object.values(registerInput);

                  return (
                    <tr key={index}>
                      {register.map((registerInput, index) => (
                        <td key={index}>{registerInput}</td>
                      )
                      )}
                      <td>
                      <Pencil
                        size={32}
                        onClick={() => {
                          editRegister(registerInput, index);
                          setModal(false);
                        }}
                      />
                      </td>
                      <td>
                        <Trash
                          size={32}
                          onClick={() => deletarEntrada(registerInput.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
