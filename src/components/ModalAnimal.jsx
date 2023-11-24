import React, { useState } from "react";
import { MagnifyingGlass, Pencil, Trash, X } from "@phosphor-icons/react";
import './Modal.css'
import { excluirAnimais, getAnimais } from "../api/index";
import { useEffect } from "react";

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
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir o animal?");
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
  useEffect(() => {
    async function fetchData() {
      try {
        const animais = await getAnimais();
        // const animaisComImagens = await carregarImagens();
        // setRegisterAll(animaisComImagens);
      } catch (error) {
        console.error("Erro ao carregar animais:", error);
      }
    }

    fetchData();
  }, []);

  function onChangeSearchvalue(value) {
    setSearch(value);
  }

  return (
    <div className="modal">
      <div className="modal-container flex-col">
        <div className="modal-container-title">
          <h2>{title}</h2>

          <div className="search_animais">
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
                      {Object.entries(registerInput).map(([key, value], index) => {
                        if (key === "foto") {
                          const imageUrl = registerInput.imagemBase64;

                          return (
                            <td key={index}>
                              <img style={{ maxWidth: '80px', height: 'auto'}} src={`data:image;base64,${registerInput.foto}`}  alt="Imagem do Animal" />
                            </td>
                          );
                        }
                        return (
                          <td key={index}>
                            {value}
                          </td>
                        );
                      })}
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
