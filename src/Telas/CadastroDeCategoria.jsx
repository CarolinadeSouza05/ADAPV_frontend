

import React, { useState, useEffect, useContext  } from "react";
import { getAllCategorias, createRegisterCategoria, editRegisterCategoria,} from "../api/index";
import { Inputs } from "../components/inputs";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { AsideCategoria } from "../components/AsideCategoria";
import vetor3 from "../imagens/vector-3.svg"
import baixar from "../imagens/baixar.png";
import "./CadastroDeProduto.css";
import { AsideAdm } from "./Adm/AsideAdm";
import { HeaderAdm } from "../components/HeaderAdm";
import { format } from "date-fns";
import { StoreContext } from "../context/index.jsx";


const menuProps = "CadatroProduto" || "CadatroCategoria"

export function CadastroCategoria(props) {
  const useStore = useContext(StoreContext);
  const { user } = useStore();
  const [allRegisters, setAllRegisters] = useState([]);
  const [menu, setMenu] = useState(menuProps);
  const [categoria, setCategoria] = useState({
    id: "",
    nome: "",
    edit: -1,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const categorias = await getAllCategorias(user.id, user.token);
        setAllRegisters(categorias);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }
    fetchData();
  }, []);

  async function handleChange(e) {
    const { id, value } = e.target;
    console.log("O elemento " + id + " tem um novo valor " + value);
    setCategoria({ ...categoria, [id]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (categoria.edit === -1) {
      await handleCadastro(user.id, user.token);
    } else {
      await handleAtualizacao(user.id, user.token);
    }
  }

  async function handleCadastro() {
    if (categoria.nome) {
      const dataAux = new Date();
      const formatData = format(dataAux, "yyyy-MM-dd");
      const categoriaAtualizado = { 
        ...categoria,
        data: formatData,
      };

      await createRegisterCategoria(categoriaAtualizado, user.id, user.token);
      resetForm();
    } else {
      setValidated(true);
    }

    const categorias = await getAllCategorias(user.id, user.token);
    setAllRegisters(categorias);
  }

  async function handleAtualizacao() {
    await editRegisterCategoria(categoria, setCategoria);

    const categorias = await getAllCategorias(user.id, user.token);
    setAllRegisters(categorias);
    resetForm();
  }

  function resetForm() {
    setCategoria({
      codigo: "",
      nome: "",
      edit: -1,
    });
  }

  const [validated, setValidated] = useState(false);

  return (
    <>
      <AsideAdm />
      <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />
      <main className="mainSection main-adm-register">
        <section className="FormProduto_container">
          <div className="form-produtos-titulo centro_logo">
            <div className="titulo">
              <img
                className="vector vectoranimais"
                src={vetor3}
                alt="Vector"
              />
              <>
                Cadastro de <span className="span1">Categorias</span>
              </>
            </div>

            <Link to={"/adm/cadastro/produto"}>
              <ArrowLeft className="arrow" size={32} onClick={() => setMenu("CadastroProduto")} />
            </Link>
          </div>

          <form noValidate onSubmit={handleFormSubmit}>
            <Inputs
              type="number"
              text="Código da Categoria"
              placeholder="00000"
              value={categoria.codigo}
              id="codigo"
              name="codigo"
              onChange={handleChange}
              disabled
              style={{ display: "none" }}
              className={validated && !categoria.codigo ? "input-invalid" : ""}
            />

            <Inputs
              type="text"
              text="Nome da Categoria"
              placeholder="Digite o nome da Categoria"
              value={categoria.nome}
              id="nome"
              name="nome"
              onChange={handleChange}
              required
              className={validated && !categoria.nome ? "input-invalid" : ""}
            />

            <div className="btnProduto mainSection">
              <button type="submit">
                {categoria.edit === -1 ? "Cadastrar Categoria" : "Atualizar Categoria"}
              </button>
            </div>
            <a href='/manuais/manual_categorias_produtos.pdf' download="manual_categorias_produtos.pdf">
              <img
                className="vectorbaixar"
                src={baixar}
                alt="Baixar"
              />
              Manual do Usuário
            </a>
          </form>

          {validated && (
            <div className="alert">Por favor, preencha todos os campos!</div>
          )}

        </section>

        <div className="alinha">
          <section className="table-container container-main cadastros flex-col aside-cadastro-aceitafazer">
            <AsideCategoria setFormCategoria={setCategoria} onInsert={resetForm} />
          </section>
        </div>
      </main>
    </>
  );
}

