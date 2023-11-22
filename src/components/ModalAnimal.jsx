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
  async function obterImagem(id) {
    try {
      const response = await fetch(`http://localhost:4001/animais/${id}`);
      const buffer = await response.arrayBuffer();
      return { foto: { data: new Uint8Array(buffer) } };
    } catch (error) {
      console.error("Erro ao obter a imagem:", error);
      return null;
    }
  }
  async function obterImagemDoBanco(id) {
    try {
      const response = await obterImagem(id);
  
      console.log("Resposta da API:", response);
  
      if (response && response.foto && response.foto.data) {
        const arrayBuffer = response.foto.data.buffer;
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

        const imageUrl = `data:image/jpg;base64,${base64String}`;
        console.log("Image URL:", imageUrl);
        return imageUrl;
      } else {
        console.error(
          "A resposta da API não possui o formato esperado:",
          response
        );
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter a imagem:", error);
      return null;
    }
  }
  


  async function carregarImagens() {
    return Promise.all(registerAll.map(async (registerInput) => {
      if (registerInput.foto) {
        registerInput.imagemBase64 = await obterImagemDoBanco(registerInput.id);
      }
      return registerInput;
    }));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const animais = await getAnimais();
        const animaisComImagens = await carregarImagens();
        setRegisterAll(animaisComImagens);
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
                      {Object.entries(registerInput).map(([key, value], index) => {
                        if (key === "foto") {
                          const imageUrl = registerInput.imagemBase64;

                          return (
                            <td key={index}>
                              {imageUrl && <img style={{ maxWidth: '100%', height: 'auto' }} src={`data:image/jpeg;base64,${imageUrl}`} alt={`Imagem de ${registerInput.nome}`} />}
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
