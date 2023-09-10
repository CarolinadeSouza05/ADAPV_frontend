import React, { useState } from 'react';
import { Cabecalho } from '../components/Cabecalho'
import { Footer } from '../components/Footer'
import './DesignarAtividades.css'

export function DesignarAtividades(props) {
  const [atividade, setAtividade] = useState('');
  const [busca, setBusca] = useState('');
  const [data, setData] = useState('');
  const [volunteers, setVolunteers] = useState([
    {
      nome: 'João',
      atividade: 'Atividade 1',
      data: '2023-05-01',
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [editingNome, setEditingNome] = useState('');
  const [editingAtividade, setEditingAtividade] = useState('');
  const [editingData, setEditingData] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!atividade || !busca || !data) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const newVolunteer = {
      nome: busca,
      atividade: atividade,
      data: data,
    };

    setVolunteers([...volunteers, newVolunteer]);

    setAtividade('');
    setBusca('');
    setData('');
  };

  const handleAtividadeChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setAtividade(filteredValue);
  };
  
  const handleBuscaChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setBusca(filteredValue);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleDeleteVolunteer = (index) => {
    const updatedVolunteers = [...volunteers];
    updatedVolunteers.splice(index, 1);
    setVolunteers(updatedVolunteers);
  };

  const handleEditVolunteer = (index) => {
    const selectedVolunteer = volunteers[index];
    setEditingVolunteer(selectedVolunteer);
    setEditingNome(selectedVolunteer.nome);
    setEditingAtividade(selectedVolunteer.atividade);
    setEditingData(selectedVolunteer.data);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    const updatedVolunteers = [...volunteers];
    const editedVolunteer = {
      ...editingVolunteer,
      nome: editingNome,
      atividade: editingAtividade,
      data: editingData,
    };
    updatedVolunteers.splice(volunteers.indexOf(editingVolunteer), 1, editedVolunteer);
    setVolunteers(updatedVolunteers);
    setEditMode(false);
    setEditingVolunteer(null);
    setEditingNome('');
    setEditingAtividade('');
    setEditingData('');
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingVolunteer(null);
    setEditingNome('');
    setEditingAtividade('');
    setEditingData('');
  };

  return (
    <>
    <Cabecalho />
    <div className="designaratvRootRoot">
      <h1 className="designarAtividadesParaVoluntrios">Designar atividades para voluntários</h1>
      <div className="groupdes">
        <form className="groupdes" onSubmit={handleSubmit}>
          <input
            type="text"
            id="atividade"
            className="botao_atividade"
            placeholder="Atividade"
            value={atividade}
            onChange={handleAtividadeChange}
          />
          <input
            type="text"
            id="busca"
            placeholder="Selecione um voluntário..."
            className="rua1 faaUmaBuscaEspecfica"
            value={busca}
            onChange={handleBuscaChange}
          />
          <input
            type="date"
            id="data"
            className="rua2 atividade"
            value={data}
            onChange={handleDataChange}
          />
          <button type="submit" id="buscar" className="botao_login login">
            Designar
          </button>
        </form>
      </div>

      <h2 className="listaDeVoluntrios">Lista de voluntários</h2>
      <div className="container-atividades">
        <table className="table-atividades">
          <thead>
            <tr>
              <th className="nome33">Nome</th>
              <th className="nome34">Atividade</th>
              <th className="nome35">Data</th>
              <th className="nome36">Ações</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer, index) => (
              <tr key={index}>
                <td className="nome">
                  {editMode && editingVolunteer === volunteer ? (
                    <input
                      type="text"
                      value={editingNome}
                      onChange={(e) => setEditingNome(e.target.value)}
                    />
                  ) : (
                    volunteer.nome
                  )}
                </td>
                <td className="nome1">
                  {editMode && editingVolunteer === volunteer ? (
                    <input
                      type="text"
                      value={editingAtividade}
                      onChange={(e) => setEditingAtividade(e.target.value)}
                    />
                  ) : (
                    volunteer.atividade
                  )}
                </td>
                <td className="nome2">
                  {editMode && editingVolunteer === volunteer ? (
                    <input
                      type="date"
                      value={editingData}
                      onChange={(e) => setEditingData(e.target.value)}
                    />
                  ) : (
                    volunteer.data
                  )}
                </td>
                <td className="nome3">
                  {editMode && editingVolunteer === volunteer ? (
                    <>
                      <button className="saveButton" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button className="cancelButton" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="deleteButton" onClick={() => handleDeleteVolunteer(index)}>
                        <img
                          className="vector2"
                          src="https://file.rendit.io/n/0g6kigcGeXMwjbnZhsjn.svg"
                          alt="Delete"
                        />
                      </button>
                      <button className="editButton" onClick={() => handleEditVolunteer(index)}>
                        <img
                          className="vector2"
                          src="https://file.rendit.io/n/9dOign94pFv0x3CzVfoM.svg"
                          alt="Edit"
                        />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
    </>
  );
}
