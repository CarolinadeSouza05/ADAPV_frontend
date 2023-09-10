import { useState, useEffect } from 'react';

export function LancEntradaForm({ addEntrada }) {
  const [tipoArrecadacao, setTipoArrecadacao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntrada = {
      tipoArrecadacao,
      valor,
      data
    };
    addEntrada(newEntrada);
    setTipoArrecadacao('');
    setValor('');
    setData('');
  };

  return (
    <form className="groupdes" onSubmit={handleSubmit}>
      <input
        type="text"
        id="tipoArrecadacao"
        placeholder="Tipo de arrecadação..."
        className="rua1 faaUmaBuscaEspecfica"
        value={tipoArrecadacao}
        onChange={(e) => setTipoArrecadacao(e.target.value)}
      />
      <input
        type="text"
        id="valor"
        className="botao_atividade"
        placeholder="Valor (R$)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <input
        type="date"
        id="data"
        className="rua2 atividade"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit" id="buscar" className="botao_login login">
        Lançar
      </button>
    </form>
  );
}