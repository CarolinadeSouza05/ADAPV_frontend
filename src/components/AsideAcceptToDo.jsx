import { MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import "./AsideAcceptToDo.css";

export function AsideAccepToDo({ infoAll, titleTable, editRegister, deleteRegister }) {
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="aside-accepttodo-header">
                <div className="title-accepttodo-header">
                    <img
                        className="vector vectorEntrada"
                        src={"vector-3.svg"}
                        alt="Vector"
                    />
                    <h2>{titleTable}</h2>
                </div>

                <div className="search">
                    <input
                        type="text"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder={"Pesquise pelo nome"}
                    />

                    <MagnifyingGlass size={26} />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {infoAll !== undefined && infoAll?.filter((info) => Object.values(info.name)
                        .join("")
                        .toLowerCase()
                        .includes(search.toLowerCase()))
                        .map((info, index) => (
                            <tr key={index}>
                                <td data-label="Id">{index + 1}</td>
                                <td data-label="AccepToDo-Name">{info.name}</td>
                                <td data-label="Action-Edit">
                                    <Pencil size={32} onClick={() => editRegister(info)} />
                                </td>
                                <td data-label="Action-Delete">
                                    <Trash size={32} onClick={() => deleteRegister(info)} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}