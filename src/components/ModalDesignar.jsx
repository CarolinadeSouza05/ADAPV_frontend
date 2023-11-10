import React, { useState } from "react";
import { MagnifyingGlass, Pencil, Trash, X } from "@phosphor-icons/react";
import './Modal.css'
import vetor3 from "../imagens/vector-3.svg";

export function Modal(props) {
  const { tableHead, registerAll, setModal ,onDeleteClick} = props;
  const [search, setSearch] = useState("");


  function onChangeSearchvalue(value) {
    setSearch(value);
  }



  return (
    <div className="modal">
      <div className="modal-container flex-col">
        <div className="modal-container-title ">
          <img
            className="vector vectoranimais"
            src={vetor3}
            alt="Vector"
          />
          <h2>
            Atividades <span className="span1">Cadastradas</span>
          </h2>

          <div className="search">
            <MagnifyingGlass size={26} />
            <input
              type="date"
              name="search"
              placeholder="Pesquise pela data"
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
                  register.data.toLowerCase().includes(search.toLowerCase())
                )
                .map((registerInput, index) => {
                  return (
                    <tr key={index}>
                      <td>{registerInput.id_designar}</td>
                      <td>{registerInput.atividade.name}</td>
                      <td>{registerInput.data}</td>
                      <td>{registerInput.hora}</td>
                      <td>
                        {registerInput.listadeVoluntarios.map((voluntario) => (
                          <div key={voluntario.id}>
                            <span>{voluntario.nome}</span>
                            <br />
                          </div>
                        ))}
                      </td>
                      <td>
                        <Pencil
                          size={32}
                        //  onClick={() => handleEditClick(registerInput)}
                        />
                      </td>
                      <td>
                        <Trash
                          size={32}
                            onClick={() => {
                        if (window.confirm("Confirma a exclusão desta denuncia?")){
                          onDeleteClick(registerInput.id_designar);
                        }
                      }}
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
