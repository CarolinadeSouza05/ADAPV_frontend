import { Modal } from "../components/ModalAnimal";
import { Select } from "../components/Select";
import { Inputs } from "../components/inputs";
import img_animais from "../imagens/cadastroanimal.png";
import vector3 from "../imagens/vector-3.svg";
import "./CadastroAnimal.css";
import { Cards } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  editarAnimais,
  getAnimais,
  handleSubmitAnimais,
} from "../api/index";
import { HeaderAdm } from "../components/HeaderAdm";
import { AsideAdm } from "./Adm/AsideAdm";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function CadastroAnimal(props) {
  const [modal, setModal] = useState(false);
  const [allRegisters, setAllRegisters] = useState([]);
  const tableHead = ["Código", "Nome", "Idade", "Pelagem", "Genero", "Porte", "Especial", "Vacinado", "Castrado", "Foto"];
  const [validado, setValidated] = useState(false);  
  const [animal, setAnimal] = useState({
    nome: "",
    idade: "",
    pelagem: "",
    genero: "",
    porte: "",
    necessidadesEspeciais: "",
    vacinas: "",
    castrado: "",
    foto: "",
    edit: -1,
  });

  useEffect(() => {
    async function fetchData() {
      // Carregando todos os registros de animais
      const animais = await getAnimais();
      setAllRegisters(animais);
    }
    fetchData();
  }, []);

  // Função para lidar com as mudanças nos campos do formulário
  function handleChange(e) {
    const { id, value } = e.target;
    console.log("O elemento " + id + " tem um novo valor " + value);
    setAnimal({ ...animal, [id]: value });
  }

  // Função para lidar com a seleção de arquivo de imagem
  // function handleFileChange(e) {
  //   const file = e.target.files[0];
  //   if(file){
  //   setAnimal({ ...animal, foto: file });
  // }}

  // Função para lidar com o envio do formulário
  async function handleFormSubmit(e) {
    e.preventDefault();

    if (animal.edit === -1) {
      await handleCadastro();
    } else {
      await handleAtualizacao();
    }
  }

  // Função para lidar com o cadastro de animais
  async function handleCadastro() {
    // Verifique se todos os campos estão preenchidos
    if (
      animal.nome &&
      animal.idade &&
      animal.pelagem &&
      animal.genero &&
      animal.porte &&
      animal.necessidadesEspeciais &&
      animal.vacinas &&
      animal.castrado &&
      animal.foto
    ) {
      const dataAux = new Date();
      const formatData = format(dataAux, "yyyy-MM-dd");
      const { ...rest } = animal;
      const register = {
        data: formatData,
        ...rest,
      }

      const aux = await handleSubmitAnimais(register);
      
      toastMessageLogin(aux);
    } else {
      setValidated(true);
    }

    const animais = await getAnimais();
    setAllRegisters(animais);
    resetForm();
  }

  // Função para lidar com a atualização de animais
  async function handleAtualizacao() {
    await editarAnimais(animal, setAnimal);

    // Atualizar a lista de animais após a atualização
    const animais = await getAnimais();
    setAllRegisters(animais);
    resetForm();
  }

  // Função para redefinir os campos do formulário
  function resetForm() {
    setAnimal({
      nome: "",
      idade: "",
      pelagem: "",
      genero: "",
      porte: "",
      necessidadesEspeciais: "",
      vacinas: "",
      castrado: "",
      foto: "",
      edit: -1,
    });
    setValidated(false);
  }

  function onChange(e){
    console.log("file uploaded: ", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  function handleReaderLoaded(e){
    console.log("file uploaded 2: ", e);
    let binaryString = e.target.result;
    setAnimal({ ...animal, "foto": btoa(binaryString)});
  };

  function toastMessageLogin(message) {
    const toastMessage = {
      message: message.status ? message.mensagem : "Erro ao cadastrar Animal",
      status: message.status ? "success" : "error",
    };

    toast[toastMessage.status](toastMessage.message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <AsideAdm />
      <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />

      <main className="mainSectionAnimal ">
        <section className="Formanimais_container">
          <div className="form-animais-titulo centro_logo">
            <div className="titulo">
              <img
                className="vector vectoranimais"
                src={vector3}
                alt="Vector"
              />
              <>
                Cadastro de <span className="span1">Animais</span>
              </>
            </div>
            <Cards
              className="svg-modal"
              size={32}
              onClick={() => setModal(true)}
            />
          </div>

          <form noValidate onSubmit={handleFormSubmit}>
            <Inputs
              type="text"
              text="Digite o nome do animal"
              placeholder="Billy"
              value={animal.nome}
              id="nome"
              name="nome"
              onChange={handleChange}
              className={validado && !animal.nome ? "input-invalid" : ""}
              required
            />

            <Inputs
              type="number"
              text="Idade do animal"
              placeholder="Digite a idade do animal"
              value={animal.idade}
              id="idade"
              name="idade"
              onChange={handleChange}
              className={validado && !animal.idade ? "input-invalid" : ""}
              required
            />

            <Inputs
              type="text"
              text="Pelagem"
              placeholder="Cor dos pelos"
              value={animal.pelagem}
              id="pelagem"
              name="pelagem"
              onChange={handleChange}
              className={validado && !animal.pelagem ? "input-invalid" : ""}
              required
            />

            <Select
              text="Selecione o Genero"
              name="genero"
              id="genero"
              value={animal.genero}
              onChange={handleChange}
              options={["Macho", "Femea"]}
              className={validado && !animal.genero ? "input-invalid" : ""}
              required
            />

            <Select
              text="Selecione o Porte"
              name="porte"
              id="porte"
              value={animal.porte}
              onChange={handleChange}
              className={validado && !animal.porte ? "input-invalid" : ""}
              options={["Grande", "Medio", "Pequeno"]}
              required
            />

            <Select
              text="Possui necessidades especiais?"
              name="necessidadesEspeciais"
              id="necessidadesEspeciais"
              value={animal.necessidadesEspeciais}
              className={validado && !animal.necessidadesEspeciais ? "input-invalid" : ""}
              onChange={handleChange}
              options={["Sim", "Não"]}
              required
            />

            <Select
              text="Está vacinado?"
              name="vacinas"
              id="vacinas"
              value={animal.vacinas}
              className={validado && !animal.vacinas ? "input-invalid" : ""}
              onChange={handleChange}
              options={["Sim", "Não"]}
              required
            />

            <Select
              text="Esta castrado?"
              name="castrado"
              id="castrado"
              value={animal.castrado}
              className={validado && !animal.castrado ? "input-invalid" : ""}
              onChange={handleChange}
              options={["Sim", "Não"]}
              required
            />

            {/* <div className="file_entrada"> */}
            <div className="foto-animal-container">
                <span className="foto-span">Foto do Animal</span>
                <label htmlFor="foto" className="foto-label">Foto do Animal</label>
                <input type="file" name="foto" id="foto" onChange={onChange} />
            </div>
            
            {animal.foto.length > 0 && (
              <img src={`data:image;base64,${animal.foto}`} alt="" />
            )}

            <div className="btnanimais mainSectionAnimal">
              <button type="submit">
                {animal.edit === -1 ? "Cadastrar animais" : "Atualizar animais"}
              </button>
            </div>
          </form>
          {/* 
          {validado && (
            <div className="alert">Por favor, preencha todos os campos!</div>
          )} */}
          {/* Exibir a imagem selecionada pelo usuário */}

        </section>

        <div className="alinha">
          <img
            src={img_animais}
            alt="imagem-fundo-animais"
            className="img_animais"
          />
        </div>
      </main>

      {modal ? (
        <Modal
          title={"Cadastro de Animais"}
          setModal={setModal}
          tableHead={tableHead}
          registerAll={allRegisters}
          setRegisterAll={setAllRegisters}
          setFormValidate={setAnimal}
        />
      ) : null}

      <ToastContainer />
    </>
  );
}
