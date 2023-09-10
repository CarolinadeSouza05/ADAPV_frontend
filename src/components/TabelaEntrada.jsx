import { useState, useEffect } from 'react';
import { fetchData, postData, putData, deleteData } from '../api/index.js';
import '../Telas/DesignarAtividades.css'
import { getEntradas } from '../util/index.jsx';

export function LancEntradaTable({ entradas: entradasProp, updateEntrada, deleteEntrada }) {
  const [entradas, setEntradas] = useState([]);
  const [editingEntrada, setEditingEntrada] = useState(null);

  useEffect(() => {
    const fetchEntradas = async () => {
      try {
        const data = await getEntradas('/entradas');
        setEntradas(data);
      } catch (error) {
        console.error('Erro ao buscar entradas:', error);
      }
    };

    fetchEntradas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEntrada(id);
      const updatedEntradas = entradas.filter((entrada) => entrada.id !== id);
      setEntradas(updatedEntradas);
    } catch (error) {
      console.error('Erro ao excluir entrada:', error);
    }
  };

  const handleUpdate = async (id, updatedEntrada) => {
    try {
      await updateEntrada(id, updatedEntrada);
      const updatedEntradas = entradas.map((entrada) =>
        entrada.id === id ? updatedEntrada : entrada
      );
      setEntradas(updatedEntradas);
      setEditingEntrada(null); // Limpa o estado de edição
    } catch (error) {
      console.error('Erro ao atualizar a entrada:', error);
    }
  };

  return (
    <div className="container-atividades">
      <table className="table-atividades">
        <thead>
          <tr>
            <th className="nome33">Tipo de Arrecadação</th>
            <th className="nome34">Valor R$</th>
            <th className="nome35">Data</th>
            <th className="nome36">Ações</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map((entrada) => (
            <tr key={entrada.id}>
              {editingEntrada !== null && editingEntrada.id === entrada.id ? (
                <>
                  <td className='nome'>
                    <input
                      type="text"
                      value={editingEntrada.tipoArrecadacao}
                      onChange={(e) =>
                        setEditingEntrada({
                          ...editingEntrada,
                          tipoArrecadacao: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className='nome1'>
                    <input
                      type="text"
                      value={editingEntrada.valor}
                      onChange={(e) =>
                        setEditingEntrada({
                          ...editingEntrada,
                          valor: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className='nome2'>
                    <input
                      type="date"
                      value={editingEntrada.data}
                      onChange={(e) =>
                        setEditingEntrada({
                          ...editingEntrada,
                          data: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className='nome3'>
                  <button onClick={() => handleUpdate(entrada.id, editingEntrada)}>Salvar</button>
                    <button onClick={() => setEditingEntrada(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{entrada.tipoArrecadacao}</td>
                  <td>{entrada.valor}</td>
                  <td>{entrada.data}</td>
                  <td>
                  <button  className="deleteButton"  onClick={() => handleDelete(entrada.id)}>
                    <img
                          className="vector2"
                          src="https://file.rendit.io/n/0g6kigcGeXMwjbnZhsjn.svg"
                          alt="Delete"
                        />
                    </button>
                    <button className="editButton"  onClick={() => setEditingEntrada(entrada)}>
                    <img
                          className="vector2"
                          src="https://file.rendit.io/n/9dOign94pFv0x3CzVfoM.svg"
                          alt="Edit"
                        />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
