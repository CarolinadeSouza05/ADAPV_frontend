import React, { useRef, useState } from 'react';
import './CadastroAnimal.css';
import { Cabecalho } from '../components/Cabecalho';
import { Footer } from '../components/Footer';

export function CadastroAnimal(props) {
  const [animais, setAnimais] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [pelagem, setPelagem] = useState('');
  const [genero, setGenero] = useState('');
  const [porte, setPorte] = useState('');
  const [necessidadesEspeciais, setNecessidadesEspeciais] = useState('');
  const [vacinas, setVacinas] = useState('');
  const [castrado, setCastrado] = useState('');
  const [foto, setFoto] = useState(null);
  const [editMode, setEditMode] = useState(false); // Added editMode state
  const [animalIndex, setAnimalIndex] = useState(null); 
  const fileInputRef = useRef(null); // Added fileInputRef

  const handleEditAnimal = (index) => {
    const animal = animais[index];
    setNome(animal.nome);
    setIdade(animal.idade);
    setPelagem(animal.pelagem);
    setGenero(animal.genero);
    setPorte(animal.porte);
    setNecessidadesEspeciais(animal.necessidadesEspeciais);
    setVacinas(animal.vacinas);
    setCastrado(animal.castrado);
    setFoto(animal.foto);
    setEditMode(true);
    setAnimalIndex(index);
  
    // Rolar para o início da página
    window.scrollTo(0, 0);
  };
  


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFoto(selectedFile);
  };

  const handleCheckboxChange = (event, setState) => {
    const { id } = event.target;

    if (id === setState) {
      setState('');
    } else {
      setState(id);
    }
  };

  const handleNomeChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setNome(filteredValue);
  };
  
  const handleIdadeChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/\D/g, '');
    setIdade(filteredValue);
  };
  
  const handlePelagemChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setPelagem(filteredValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validação dos campos
    if (nome.length < 2 || idade.length < 2 || pelagem.length < 2) {
      alert('Os campos devem ter no mínimo 2 letras!');
      return;
    }

    // Validação dos checkboxes
    if (!genero || !porte || !necessidadesEspeciais || !vacinas || !castrado) {
      alert('Por favor, marque todos os checkboxes!');
      return;
    }

    if (editMode) {
      const updatedAnimal = {
        nome,
        idade,
        pelagem,
        genero,
        porte,
        necessidadesEspeciais,
        vacinas,
        castrado,
        foto,
      };
      const updatedAnimais = [...animais];
      updatedAnimais[animalIndex] = updatedAnimal;
      setAnimais(updatedAnimais);
      setEditMode(false);
    } else {
      const newAnimal = {
        nome,
        idade,
        pelagem,
        genero,
        porte,
        necessidadesEspeciais,
        vacinas,
        castrado,
        foto,
      };
      setAnimais([...animais, newAnimal]);
    }

    // Limpa os campos do formulário
    setNome('');
    setIdade('');
    setPelagem('');
    setGenero('');
    setPorte('');
    setNecessidadesEspeciais('');
    setVacinas('');
    setCastrado('');
    setFoto(null); 
    fileInputRef.current.value = null;
  };
  const handleDeleteAnimal = (index) => {
    const confirmation = window.confirm("Tem certeza de que deseja excluir o animal?");
  
    if (confirmation) {
      const updatedAnimais = [...animais];
      updatedAnimais.splice(index, 1);
      setAnimais(updatedAnimais);
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="containeranimal">
        <div className="image-animal"></div>
        <div className="colunas-animal">
          <div className="titulo22">
            <img class="vector" src={"vector-3.svg"} alt="Vector" />
            <span className="titulo-cadastro">Cadastro</span>
            <span className="titulo-animal"> de Animais</span>
          </div>
          <div className="animal-for">
            <div className="linha-animal">
              <div className="cadastro-label nome32">Nome:</div>
              <input type="text" id="nome" className="border8-9" value={nome} onChange={handleNomeChange} />
            </div>

            <div className="linha-animal">
              <div className="cadastro-label nome32">Idade Aproximada:</div>
              <input type="text" id="idade" className="border8-9" value={idade} onChange={handleIdadeChange} />
            </div>

            <div className="linha-animal">
              <div className="cadastro-label nome32">Cor da Pelagem:</div>
              <input type="text" id="pelagem" className="border8-9" value={pelagem} onChange={handlePelagemChange} />
            </div>

            <div className="linha-animal">
              <div className="cadastro-label nome32">Gênero:</div>
              <div className="checkboxaligh">
                <div className="checkbox">
                  <label htmlFor="macho" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="macho"
                      className="cadastro-checkbox"
                      checked={genero === 'macho'}
                      onChange={(event) => handleCheckboxChange(event, setGenero)}
                    />
                    Macho
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="femea" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="femea"
                      className="cadastro-checkbox"
                      checked={genero === 'femea'}
                      onChange={(event) => handleCheckboxChange(event, setGenero)}
                    />
                    Fêmea
                  </label>
                </div>
              </div>
            </div>

            <div className="linha-animal">
              <div className="cadastro-label nome32">Porte:</div>
              <div className="checkboxaligh2">
                <div className="checkbox">
                  <label htmlFor="pequeno" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="pequeno"
                      className="cadastro-checkbox"
                      checked={porte === 'pequeno'}
                      onChange={(event) => handleCheckboxChange(event, setPorte)}
                    />
                    Pequeno
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="medio" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="medio"
                      className="cadastro-checkbox"
                      checked={porte === 'medio'}
                      onChange={(event) => handleCheckboxChange(event, setPorte)}
                    />
                    Médio
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="grande" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="grande"
                      className="cadastro-checkbox"
                      checked={porte === 'grande'}
                      onChange={(event) => handleCheckboxChange(event, setPorte)}
                    />
                    Grande
                  </label>
                </div>
              </div>
            </div>

            <div className="linha-animal">
              <div className="cadastro-label nome32">Possui Necessidades Especiais?</div>
              <div className="checkboxaligh3">
                <div className="checkbox">
                  <label htmlFor="sim-necessidades" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="sim-necessidades"
                      className="cadastro-checkbox"
                      checked={necessidadesEspeciais === 'sim-necessidades'}
                      onChange={(event) => handleCheckboxChange(event, setNecessidadesEspeciais)}
                    />
                    Sim
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="nao-necessidades" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="nao-necessidades"
                      className="cadastro-checkbox"
                      checked={necessidadesEspeciais === 'nao-necessidades'}
                      onChange={(event) => handleCheckboxChange(event, setNecessidadesEspeciais)}
                    />
                    Não
                  </label>
                </div>
              </div>
            </div>

            <div className="linha-animal">
              <div className="cadastro-label nome32">Vacinas:</div>
              <div className="checkboxaligh4">
                <div className="checkbox">
                  <label htmlFor="sim-vacinas" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="sim-vacinas"
                      className="cadastro-checkbox"
                      checked={vacinas === 'sim-vacinas'}
                      onChange={(event) => handleCheckboxChange(event, setVacinas)}
                    />
                    Sim
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="nao-vacinas" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="nao-vacinas"
                      className="cadastro-checkbox"
                      checked={vacinas === 'nao-vacinas'}
                      onChange={(event) => handleCheckboxChange(event, setVacinas)}
                    />
                    Não
                  </label>
                </div>
              </div>
            </div>

            <div className="linha-animal">
              <div className="cadastro-label nome32">Já foi castrado?</div>
              <div className="checkboxaligh5">
                <div className="checkbox">
                  <label htmlFor="sim-castrado" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="sim-castrado"
                      className="cadastro-checkbox"
                      checked={castrado === 'sim-castrado'}
                      onChange={(event) => handleCheckboxChange(event, setCastrado)}
                    />
                    Sim
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="nao-castrado" className="cadastro-checkbox-label">
                    <input
                      type="checkbox"
                      id="nao-castrado"
                      className="cadastro-checkbox"
                      checked={castrado === 'nao-castrado'}
                      onChange={(event) => handleCheckboxChange(event, setCastrado)}
                    />
                    Não
                  </label>
                </div>
              </div>
            </div>

            <div className="linha-animal">
              <div className="custom-file-input">
                <input
                  type="file"
                  id="foto"
                  className="cadastro-file-input"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
                <button className="botao_ins cadanimal2" onClick={handleButtonClick}>
                  Selecionar foto
                </button>
              </div>
            </div>
            <div className="">
              <button className="botao_ins cadanimal2" onClick={handleSubmit}>
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="titulo-animal-cadastrado">Animais Cadastrados</h2>
      <div className="container-animal">
        <div className="container-animal-cadastrado">
          {animais.map((animal, index) => (
            <div key={index} className="animal-cadastrado">
              <div className="info-animal-cadastrado">
                <div className="nome-animal-cadastrado">{animal.nome}</div>
                <div className="idade-animal-cadastrado">{animal.idade} anos</div>
                <div className="pelagem-animal-cadastrado">Cor da Pelagem: {animal.pelagem}</div>
                <div className="genero-animal-cadastrado">Gênero: {animal.genero}</div>
                <div className="porte-animal-cadastrado">Porte: {animal.porte}</div>
                <div className="necessidades-animal-cadastrado">Necessidades Especiais: {animal.necessidadesEspeciais}</div>
                <div className="vacinas-animal-cadastrado">Vacinas: {animal.vacinas}</div>
                <div className="castrado-animal-cadastrado">Castrado: {animal.castrado}</div>
              <div className='info-foto-animal-cadastrado'>
                <div className="foto-animal-cadastrado">
                  {animal.foto && <img src={URL.createObjectURL(animal.foto)} alt="Foto do animal" />}
                </div>
              </div>
              </div>
              <div className='botoes-animais-cadastro'>
                <button className="botao_ins cadanimal2" onClick={() => handleEditAnimal(index)}>
                  Editar
                </button>
                <button className="botao_ins2 cadanimal3" onClick={() => handleDeleteAnimal(index)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
