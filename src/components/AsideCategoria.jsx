import React, { useState, useEffect, useContext} from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { deleteCategoriaP, getAllCategorias } from "../api";
import vetor4 from "../imagens/vector-4.svg"
import { StoreContext } from "../context/index.jsx";


export function AsideCategoria({ setFormCategoria, onInsert }) {
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    const tableHead = ["ID", "Nome"];

    const [allRegisters, setAllRegisters] = useState([]);

    function editCategoria(categoriaP) {
        const { edit, ...rest } = categoriaP;
        const aux = {
            edit: 1,
            ...rest
        };
        setFormCategoria(aux);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const categorias = await getAllCategorias(user.token, user.id);
                setAllRegisters(categorias);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchData();
    }, [onInsert]);

    async function deleteCategoria(codigo) {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir a categoria?");
        if (confirmDelete) {
          try {
            await deleteCategoriaP(codigo);
            const categorias = await getAllCategorias(user.token, user.id);
            setAllRegisters(categorias);
          } catch (error) {
            console.error("Erro ao excluir a categoria:", error);
          }
        }
      }

    return (
        <>
            <div className="aside-categoriaP-header">
            <div className="titulo">
                <img
                    className="vector vectorEntrada"
                    src={vetor4}
                    alt="Vector"
                />
                <>
                Registros de Categorias
              </>
            </div></div>

            <table className="table">
                <thead>
                    <tr style={{display:'none'}}>
                        {tableHead.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th scope="col">Editar</th>
                        <th scope="col">Deletar</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(allRegisters) && allRegisters.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nome}</td>
                            <td>
                                <Pencil
                                    size={32}
                                    onClick={() => editCategoria(categoria)}
                                />
                            </td>
                            <td>
                                <Trash
                                    size={32}
                                    onClick={() => deleteCategoria(categoria.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
