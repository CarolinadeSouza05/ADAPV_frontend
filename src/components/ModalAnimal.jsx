import React, { useState } from "react";
import { MagnifyingGlass, Pencil, Trash, X } from "@phosphor-icons/react";
import './Modal.css'
import { excluirAnimais, getAnimais } from "../api/index";

export function Modal(props) {
  const { title, tableHead, registerAll, setRegisterAll, setFormValidate, ChangeValueObject, setModal } = props;
  const [search, setSearch] = useState("");

  function editRegister(register, index) {
    if (ChangeValueObject) {
      ChangeValueObject(register);
    }
    setFormValidate(register);
  }

  async function deletarAnimal(id) {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir o Animal?");
    if (confirmDelete) {
      try {
        await excluirAnimais(id);
        const animais = await getAnimais();
        setRegisterAll(animais);
      } catch (error) {
        console.error("Erro ao excluir o Animal:", error);
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
              placeholder="Pesquise pelo nome do animal"
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
                  register.nome.toLowerCase().includes(search.toLowerCase())
                )
                .map((registerInput, index) => {
                  return (
                    <tr key={index}>
                      {Object.values(registerInput).map((registerInput, index) => (
                        <td key={index}>
                          {registerInput}
                        </td>
                      ))}
                      <td>
                        <Pencil
                          size={32}
                          onClick={() => editRegister(registerInput, index)}
                        />
                      </td>
                      <td>
                        <Trash
                          size={32}
                          onClick={() => deletarAnimal(registerInput.id)}
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
