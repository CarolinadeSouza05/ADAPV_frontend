import { MagnifyingGlass, Pencil, Trash, X } from "@phosphor-icons/react";
import { useState } from "react";
import './Modal.css';
import { format, isValid } from "date-fns";

export function Modal(props) {
  const { title, tableHead, registerAll, editRegister, deleteRegister, setModal } = props;
  const [search, setSearch] = useState("");

  return (
    <div className="modal">
      <div className="modal-container flex-col">
        <div className="modal-container-title">
          <h2>{title}</h2>

          <div className="search">
            <input
              type="text"
              name="search"
              onChange={(e) => onChangeSearchvalue(e.target.value)}
              value={search}
              placeholder={"Pesquise pelo nome"}
            />

            <MagnifyingGlass size={26} />
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
              registerAll.filter((register) => Object.values(register.nome).join("").toLowerCase().includes(search.toLowerCase()))
                .map((registerInput, index) => {
                  const register = [];
                  Object.values(registerInput).forEach((values) => {
                    if (values !== registerInput.senha) {
                      return register.push(values);
                    }
                  });

                  return (
                    <tr key={index}>
                      {Object.values(register).map((input) => (
                        <>
                          {typeof input === 'object' ? (
                            <div className="td-maps horizontal-divide">
                              {input.map((item, indexItem) => (
                                <td key={`td-map-${indexItem}`}>{item}</td>
                              ))}
                            </div>
                            ) : (
                              <td>{isValid(input) ? format(new Date(input), 'dd/MM/yyyy') : input}</td>
                          )}
                        </>
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
                          onClick={() => deleteRegister(registerInput.id)}
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

  function onChangeSearchvalue(value) {
    setSearch(value);
  }
}
