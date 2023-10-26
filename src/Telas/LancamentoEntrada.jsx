import { Modal } from "../components/ModalEntradas";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { Inputs } from "../components/inputs";
import "./LancamentoEntrada.css";
import vector3 from "../imagens/vector-3.svg"
import img_entradas from "../imagens/money_cat.png"

import { Cards } from "@phosphor-icons/react";

import { useState, useEffect } from "react";
import {
  getEntradas,
  handleSubmitEntradas,
  editarEntradas,
} from "../api/index";

export default function LancamentoEntrada(props) {
  const [modal, setModal] = useState(false);
  const [allRegisters, setAllRegisters] = useState([]);

  const tableHead = ["Código", "Tipo de Arrecadaçao", "Valor", "Data"];

  const [validado, setValidated] = useState(false);
  const [entrada, setEntrada] = useState({
    tipo_arrecadacao: "",
    valor: "",
    data: "",
    edit: -1,
  });

  function maskPrice(event) {
    var price = event.target.value;
    price = price.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    price = price.replace(/(\d)(\d{2})$/, "$1.$2"); // Insere o separador decimal
    price = price.replace(/(?=(\d{3})+(\D))\B/g, ""); // Remove o separador de milhar
    event.target.value = "R$" + price; // Adiciona o símbolo "R$"
  }

  //-------------------------

  useEffect(() => {
    async function fetchData() {
      const entradas = await getEntradas();
      setAllRegisters(entradas);
    }
    fetchData();
  }, []);

  function handleChange(e) {
    const { id, value } = e.target;
    console.log("O elemento " + id + " tem um novo valor " + value);
    setEntrada({ ...entrada, [id]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (entrada.edit === -1) {
      handleCadastro();
    } else {
      handleAtualizacao();
    }
  }

  async function handleCadastro() {
    // Verifique se todos os campos estão preenchidos
    if (
      entrada.tipo_arrecadacao &&
      entrada.valor &&
      entrada.data
    ) {
      await handleSubmitEntradas(entrada);
      // Limpe os campos do formulário

    } else {
      // Exiba o alerta
      setValidated(true);
    }

    const entradas = await getEntradas();
    setAllRegisters(entradas);
    resetForm();
  }

  async function handleAtualizacao() {
    await editarEntradas(entrada, setEntrada);

    const entradas = await getEntradas();
    setAllRegisters(entradas);
    resetForm();
  }

  function resetForm() {
    setEntrada({
      tipo_arrecadacao: "",
      valor: "",
      data: "",
      edit: -1,
    });
  }



  return (
    <>
      <Cabecalho />
      <main className="mainSectionEntrada">
        <section className="FormEntrada_container">
          <div className="form-entradas-titulo centro_logo">
            <div className="tituloEntrada">
              <img
                className="vector vectorEntrada"
                src={vector3}
                alt="Vector"
              />
              <span className="span0"> Lançamento </span><span className="span1"> de Entradas</span></div>
            <Cards
              className="svg-modal"
              size={32}
              onClick={() => setModal(true)}
            />
          </div>

          <form noValidate onSubmit={handleFormSubmit}>
            <Inputs
              type="text"
              text="Tipo de Arrecadação"
              placeholder="Digite o meio de arrecadação..."
              value={entrada.tipo_arrecadacao}
              id="tipo_arrecadacao"
              name="tipo_arrecadacao"
              onChange={handleChange}
              required
              className={validado && !entrada.tipo_arrecadacao ? "input-invalid" : ""}
            />

            <Inputs
              type="text"
              text="Valor Arrecadado"
              placeholder="R$..."
              value={entrada.valor}
              id="valor"
              name="valor"
              onChange={handleChange}
              required
              maskPrice={maskPrice}
              className={validado && !entrada.valor ? "input-invalid" : ""}
            />

            <Inputs
              type="date"
              text="Data Arrecadada"
              placeholder="Valor (R$)"
              value={entrada.data}
              id="data"
              name="data"
              onChange={handleChange}
              required
              className={validado && !entrada.data ? "input-invalid" : ""}
            />

            <div className="btnEntrada mainSectionEntrada">
              <button type="submit">
                {entrada.edit === -1 ? "Lançar Entrada" : "Atualizar Entrada"}
              </button>
            </div>
          </form>

          {/* {validado && (
            <div className="alert">Por favor, preencha todos os campos!</div>
          )} */}
        </section>

        <div className="alinha">
          <img
            src={img_entradas}
            alt="imagem-fundo-entradas"
            className="img_entrada"
          />
        </div>
      </main>

      {modal ? (
        <Modal
          title={"Lançamento de Entradas"}
          setModal={setModal}
          tableHead={tableHead}
          registerAll={allRegisters}
          setRegisterAll={setAllRegisters}
          setFormValidate={setEntrada}
        />
      ) : null}

      <Footer />
    </>
  );
}
