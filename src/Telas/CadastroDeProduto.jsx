import Tooltip from '@material-ui/core/Tooltip'; 
import * as Popover from '@radix-ui/react-popover';
import { Modal } from "../components/ModalProduto";
import { Select } from "../components/Select";
import { Inputs } from "../components/inputs";
import { Textarea } from "../components/textarea";
import { HeaderAdm } from "../components/HeaderAdm";
import img_produtos from "../imagens/gatinhoo.png";
import baixar from "../imagens/baixar.png";
import vector3 from "../imagens/vector-3.svg";
import "./CadastroDeProduto.css";

import { Cards, DotsThreeVertical, PlusCircle } from "@phosphor-icons/react";

import { useEffect, useState, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { editarProdutos, getProdutos, handleSubmit, } from "../api/index"; 
import { AsideAdm } from "./Adm/AsideAdm";
import { format } from 'date-fns';
import { StoreContext } from "../context/index.jsx";


export function CadastroProduto() {
  const useStore = useContext(StoreContext);
  const { user } = useStore();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [allRegisters, setAllRegisters] = useState([]);
  const [menu, setMenu] = useState("CadastroProduto");

  const apiCategoria = "http://localhost:4000/categoria";
  const tableHead = ["Codigo", "Nome", "Preço", "Descrição", "Categoria"];

  const [validado, setValidated] = useState(false);
  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    preco: "",
    descricao: "",
    categoria: "",
    edit: -1,
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const produtos = await getProdutos(user.id, user.token);
      setAllRegisters(produtos);
      try {
        const response = await fetch(apiCategoria);
        const data = await response.json();

        if (response.ok) {
          setCategories(data); // Defina as categorias recuperadas da API
        } else {
          console.error("Erro ao buscar categorias:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchData();
  }, []);

  function maskPrice(event) {
    var price = event.target.value;
    price = price.replace(/\D/g, "");
    price = price.replace(/(\d)(\d{2})$/, "$1.$2");
    price = price.replace(/(?=(\d{3})+(\D))\B/g, "");
    event.target.value = "R$" + price;
  }

  function handleChange(e) {
    const { id, value } = e.target;
    console.log("O elemento " + id + " tem um novo valor " + value);
    if (id === "categoriaNome") {
      // Extrai o ID da categoria selecionada
      const categoriaId = categories.find(category => category.nome === value)?.id;
      setProduto({ ...produto, categoria: categoriaId });
    } else {
      setProduto({ ...produto, [id]: value });
    }
  }

  function handleMenuChange(selectedMenu) {
    setMenu(selectedMenu);

    if (selectedMenu === "CadastroProduto") {
      navigate("/adm/cadastro/produto");
    } else if (selectedMenu === "CadastroCategoria") {
      navigate("/adm/cadastro/categoria");
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (produto.edit === -1) {
      handleCadastro();
    } else {
      handleAtualizacao();
    }
    console.log("Formulário enviado");
  }

  async function handleCadastro() {
    if (
      produto.nome &&
      produto.preco &&
      produto.descricao &&
      produto.categoria
    ) {
      const preco = produto.preco.replace(/[^\d.]/g, "");
      const dataAux = new Date();
      const formatData = format(dataAux, "yyyy-MM-dd");

      const produtoAtualizado = {
        ...produto,
        preco,
        data: formatData 
      };
      
      await handleSubmit(produtoAtualizado, user.id, user.token);
      resetForm();
    } else {
      setValidated(true);
    }

    const produtos = await getProdutos(user.id, user.token);
    setAllRegisters(produtos);
  }

  async function handleAtualizacao() {
    await editarProdutos(produto, setProduto);

    const produtos = await getProdutos(user.id, user.token);
    setAllRegisters(produtos);
    resetForm();
  }

  function resetForm() {
    setProduto({
      codigo: "",
      nome: "",
      preco: "",
      descricao: "",
      categoria: "",
      edit: -1,
    });
  }

  return (
    <>
      <AsideAdm />
      <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />
      <main className="mainSection main-adm-register">
        <section className="FormProduto_container">
        <Tooltip title="Preencha as informações do produto para cadastrá-lo no sistema." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
          <div className="form-produtos-titulo centro_logo">
            <div className="titulo">
              <img
                className="vector vectoranimais"
                src={vector3}
                alt="Vector"
              />
              <>
                Cadastro de <span className="span1">Produtos</span>
              </>
            </div>
            <Popover.Root>
              <Popover.Trigger className="popover-trigger">
                <DotsThreeVertical size={32} />
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content className="popover-content">
                  <button className="button-popover-trigger" onClick={() => setModal(true)}>
                    <Cards size={32} />
                    <span>Modal</span>
                  </button>

                  <button className="button-popover-trigger" onClick={() => handleMenuChange("CadastroCategoria")}>
                    <PlusCircle size={32} />
                    <span>Cadastrar Categoria</span>
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
          </Tooltip>

          <form noValidate onSubmit={handleFormSubmit}>
            <Inputs
              type="number"
              text="Código do Produto"
              placeholder="00000"
              value={produto.codigo}
              id="codigo"
              name="codigo"
              onChange={handleChange}
              disabled
              style={{ display: "none" }}
              className={validado && !produto.codigo ? "input-invalid" : ""}
            />

        <Tooltip title="Insira o nome do produto a ser cadastrado." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
          <div>
            <Inputs
              type="text"
              text="Nome do Produto"
              placeholder="Digite o nome do Produto"
              value={produto.nome}
              id="nome"
              name="nome"
              onChange={handleChange}
              required
              className={validado && !produto.nome ? "input-invalid" : ""}
            />
          </div>
        </Tooltip>

        <Tooltip title="Defina o preço pelo qual o produto foi adquirido." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
          <div>
            <Inputs
              type="text"
              text="Preço Desejado"
              placeholder="Valor (R$)"
              value={produto.preco}
              id="preco"
              name="preco"
              onChange={handleChange}
              required
              maskPrice={maskPrice}
              className={validado && !produto.preco ? "input-invalid" : ""}
            />
          </div>
        </Tooltip>

        <Tooltip title="Descreva o produto detalhadamente." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
          <div>
            <Textarea
              text="Descrição"
              placeholder="Descrição"
              value={produto.descricao}
              id="descricao"
              name="descricao"
              onChange={handleChange}
              required
              className={validado && !produto.descricao ? "input-invalid" : ""}
            />
          </div>
        </Tooltip>

        <Tooltip title="Selecione a categoria a qual pertence o produto." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
          <div>
            <Select
              text="Selecione a Categoria"
              name="categoriaNome"
              id="categoriaNome"
              value={categories.find(category => category.id === produto.categoria)?.nome || ''}
              onChange={handleChange}
              options={categories.map(category => category.nome)}
              required
              className={validado && !produto.categoria ? "input-invalid" : ""}
            />
            {/* Campo oculto para armazenar o ID da categoria */}
            <input
              type="hidden"
              name="categoria"
              id="categoria"
              value={produto.categoria}
              onChange={handleChange}
            />
          </div>
        </Tooltip>

        <div className="btnProduto mainSection">
          <button type="submit">
            {produto.edit === -1 ? "Cadastrar Produto" : "Atualizar Produto"}
          </button>
        </div>

        <a href='/manuais/manual_produto.pdf' download="manual_produto.pdf">
          <img
            className="vectorbaixar"
            src={baixar}
            alt="Baixar"
          />
          Manual do Usuário
        </a>
      </form>

          {validado && (
            <div className="alert">Por favor, preencha todos os campos!</div>
          )}

        </section>

        <div className="alinha">
          <img
            src={img_produtos}
            alt="imagem-fundo-produtos"
            className="img_produto"
          />
        </div>
      </main>

      {modal ? (
        <Modal
          title={"Cadastro de Produtos"}
          setModal={setModal}
          tableHead={tableHead}
          registerAll={allRegisters}
          setRegisterAll={setAllRegisters}
          setFormValidate={setProduto}
          categories={categories} 
        />
      ) : null}
    </>
  );
}
