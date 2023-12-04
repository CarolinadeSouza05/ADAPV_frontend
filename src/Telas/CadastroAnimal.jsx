import Tooltip from '@material-ui/core/Tooltip'; 
import { Modal } from "../components/ModalAnimal";
import { Select } from "../components/Select";
import { Inputs } from "../components/inputs";
import img_animais from "../imagens/cadastroanimal.png";
import baixar from "../imagens/baixar.png";
import vector3 from "../imagens/vector-3.svg";
import "./CadastroAnimal.css";
import { Cards } from "@phosphor-icons/react";
import { useEffect, useState ,useContext} from "react";
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
import { Form, Row, Col } from "react-bootstrap";
import { StoreContext } from "../context/index.jsx";

export function CadastroAnimal(props) {
  const useStore = useContext(StoreContext);
  const { user } = useStore();
  const [modal, setModal] = useState(false);
  const [allRegisters, setAllRegisters] = useState([]);
  const tableHead = ["Código", "Especie", "Nome", "Idade", "Pelagem", "Genero", "Porte", "Especial", "Vacinado", "Castrado", "Foto"];
  const [validado, setValidated] = useState(false);  
  const [animal, setAnimal] = useState({
    especie: "",
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
      animal.especie &&
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

      const aux = await handleSubmitAnimais(register,user.token, user.id);
      
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
      especie: "",
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
        <Tooltip title="Preencha as informações do animal para cadastrá-lo no sistema." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
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
        </Tooltip>

          <form noValidate onSubmit={handleFormSubmit}>
            <Tooltip title="Informe o tipo/especie do animal" placement="left" classes={{ tooltip: 'custom-tooltip' }}>
            <div>
              <Select
                text="Selecione a espécie"
                name="especie"
                id="especie"
                value={animal.especie}
                onChange={handleChange}
                options={["Cachorro", "Gato"]}
                className={validado && !animal.genero ? "input-invalid" : ""}
                required
              />
            </div>
          </Tooltip>
          <Tooltip title="Informe o nome do animal, que ira ser cadastrado." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
            <div>
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
            </div>
          </Tooltip>

          <Tooltip title="Informe a idade do animal em anos." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
            <div>
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
            </div>
          </Tooltip>

          <Tooltip title="Descreva a cor e/ou tipo de pelagem do animal." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
            <div> 
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
            </div>
          </Tooltip>

          <Tooltip title="Selecione o gênero do animal." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
            <div>
              <Select
                text="Selecione o Gênero"
                name="genero"
                id="genero"
                value={animal.genero}
                onChange={handleChange}
                options={["Macho", "Fêmea"]}
                className={validado && !animal.genero ? "input-invalid" : ""}
                required
              />
            </div>
          </Tooltip>

          <Tooltip title="Escolha o porte do animal. Por exemplo: Pequeno, Médio ou Grande." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
            <div>
              <Select
                text="Selecione o Porte"
                name="porte"
                id="porte"
                value={animal.porte}
                onChange={handleChange}
                className={validado && !animal.porte ? "input-invalid" : ""}
                options={["Grande", "Médio", "Pequeno"]}
                required
              />
            </div>
          </Tooltip>

          <Tooltip title="O animal possui alguma necessidade especial, seja em alimentação ou locomoção? Selecione Sim ou Não." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
            <div>
              <Select
                text="Possui necessidades especiais"
                name="necessidadesEspeciais"
                id="necessidadesEspeciais"
                value={animal.necessidadesEspeciais}
                className={validado && !animal.necessidadesEspeciais ? "input-invalid" : ""}
                onChange={handleChange}
                options={["Sim", "Não"]}
                required
              />
              </div>
          </Tooltip>

              <Row>
              <Col md={6}>
              <Tooltip title="O animal está com as vacinas em dia? Escolha Sim ou Não." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
                <div>
                <Select
                  text="Está vacinado"
                  name="vacinas"
                  id="vacinas"
                  value={animal.vacinas}
                  className={validado && !animal.vacinas ? "input-invalid" : ""}
                  onChange={handleChange}
                  options={["Sim", "Não"]}
                  required
                />
                              </div>
          </Tooltip>
              </Col>
              <Col md={6}>
              <Tooltip title="O animal está castrado? Escolha Sim ou Não." placement="left" classes={{ tooltip: 'custom-tooltip' }}>
                <div>
                <Select
                  text="Está castrado"
                  name="castrado"
                  id="castrado"
                  value={animal.castrado}
                  className={validado && !animal.castrado ? "input-invalid" : ""}
                  onChange={handleChange}
                  options={["Sim", "Não"]}
                  required
                />
                              </div>
          </Tooltip>
              </Col>
            </Row>
            <div className="alinhando_img_import"> 
            <div className="foto-animal-container">
              <span className="foto-span">Foto do Animal</span>
              <label htmlFor="foto" className="foto-label">Foto do Animal</label>
              <input type="file" name="foto" id="foto" onChange={onChange} />
            </div>

            {animal.foto.length > 0 && (
              <img src={`data:image;base64,${animal.foto}`} alt="" className="container_animal_import" />
            )}</div>

            <div className="btnanimais mainSectionAnimal">
              <button type="submit">
                {animal.edit === -1 ? "Cadastrar animal" : "Atualizar animal"}
              </button>
            </div>
          </form>
          <a href='/manuais/manual_animais.pdf' download="manual_animais.pdf">
            <img
              className="vectorbaixar"
              src={baixar}
              alt="Baixar"
            />
            Manual do Usuário
          </a>
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
