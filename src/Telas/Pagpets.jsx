import React, { useEffect, useState } from "react";
import "./Pagpets.css";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { getAnimais, getAnimalsPagination } from "../api";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

export default function Pagpets() {
  const [animaisAll, setAnimalsAll] = useState([]);
  const [animalsAllFilter, setAnimalsAllFilter] = useState([]);
  const [page, setPage] = useState(1);

  const [filterSpecies, setFilterSpecies] = useState({
    dog: false,
    cat: false,
  });
  const [filterSize, setFilterSize] = useState({
    small: false,
    medium: false,
    large: false,
  });
  const [filterAge, setFilterAge] = useState({
    zeroToTwo: false,
    threeToFour: false,
    aboveFour: false,
  });
  

  // filtro de espécie
  const handleSpeciesChange = (e) => {
    setFilterSpecies({ ...filterSpecies, [e.target.name]: e.target.checked });
  };

  // filtro de tamanho
  const handleSizeChange = (e) => {
    setFilterSize({ ...filterSize, [e.target.name]: e.target.checked });
  };

  // filtro de idade
  const handleAgeChange = (e) => {
    setFilterAge({ ...filterAge, [e.target.name]: e.target.checked });
  };
  


  const applyFilters = () => {
    let filteredAnimals = animaisAll;
  
    // Filtro de espécie
    if (filterSpecies.dog || filterSpecies.cat) {
      filteredAnimals = filteredAnimals.filter((animal) =>
        (filterSpecies.dog && animal.especie === "Cachorro") ||
        (filterSpecies.cat && animal.especie === "Gato")
      );
    }
  
    // Filtro de tamanho
    if (filterSize.small || filterSize.medium || filterSize.large) {
      filteredAnimals = filteredAnimals.filter((animal) =>
        (filterSize.small && animal.porte === "Pequeno") ||
        (filterSize.medium && animal.porte === "Medio") ||
        (filterSize.large && animal.porte === "Grande")
      );
    }

    // Filtro de idade
    if (filterAge.zeroToTwo || filterAge.threeToFour || filterAge.aboveFour) {
      filteredAnimals = filteredAnimals.filter((animal) => {
        const age = parseInt(animal.idade);
        return (
          (filterAge.zeroToTwo && age >= 0 && age <= 2) ||
          (filterAge.threeToFour && age >= 3 && age <= 4) ||
          (filterAge.aboveFour && age > 4)
        );
      });
    }
  
    setAnimalsAllFilter(filteredAnimals);
  };

  const clearFilters = () => {
    setFilterSpecies({ dog: false, cat: false });
    setFilterSize({ small: false, medium: false, large: false });
    setFilterAge({ zeroToTwo: false, threeToFour: false, aboveFour: false });
    setAnimalsAllFilter(animaisAll);
  };
  
    

  useEffect(() => {
    (async () => {
      const itensForPage = 12;
      const animals = await getAnimalsPagination({ itensForPage, page });

      if(Array.isArray(animals)){
        setAnimalsAllFilter(animals);
      }
    })()
  }, [page])

  useEffect(() => {
    (async () => {
      const animalsAll = await getAnimais();

      if(Array.isArray(animalsAll)){
        setAnimalsAll(animalsAll);
      }
    })()
  }, [])

  return (
    <>
      <Cabecalho />
      <main className="pagpetsRootRoot">
        <div>
          <h2 className="title2">PETS ESPERANDO POR UM LAR</h2>
        </div>
        <div className="group">
          <div className="search-container">
            <input
              type="text"
              className="searchInput"
              label="Pesquisar um pet"
            />
            <div className="botaoprimario">
              <button className="searchButton">Pesquisar</button>
            </div>
          </div>
        </div>
        <div className="container-pet">
          <div className="filtersWrapper">
            <h3 className="filtersTitle">FILTROS</h3>
            <div className="checkbox-container">
              <label className="checkbox-label" htmlFor="dogCheckbox">
              <input
                  type="checkbox"
                  id="dogCheckbox"
                  className="checkbox"
                  name="dog"
                  checked={filterSpecies.dog}
                  onChange={handleSpeciesChange}
                />
                Cachorro
              </label>
              <label className="checkbox-label" htmlFor="catCheckbox">
              <input
                type="checkbox"
                id="catCheckbox"
                className="checkbox"
                name="cat"
                checked={filterSpecies.cat}
                onChange={handleSpeciesChange}
              />
                Gato
              </label>
              <label className="checkbox-label" htmlFor="smallSizeCheckbox">
              <input
                type="checkbox"
                id="smallSizeCheckbox"
                className="checkbox"
                name="small"
                checked={filterSize.small}
                onChange={handleSizeChange}
              />
                Porte pequeno
              </label>
              <label className="checkbox-label" htmlFor="mediumSizeCheckbox">
              <input
                type="checkbox"
                id="mediumSizeCheckbox"
                className="checkbox"
                name="medium"
                checked={filterSize.medium}
                onChange={handleSizeChange}
              />

                Porte médio
              </label>
              <label className="checkbox-label" htmlFor="largeSizeCheckbox">
              <input
                  type="checkbox"
                  id="largeSizeCheckbox"
                  className="checkbox"
                  name="large"
                  checked={filterSize.large}
                  onChange={handleSizeChange}
                />
                Porte grande
              </label>
              <label className="checkbox-label" htmlFor="zeroToTwoCheckbox">
                <input
                  type="checkbox"
                  id="zeroToTwoCheckbox"
                  className="checkbox"
                  name="zeroToTwo"
                  checked={filterAge.zeroToTwo}
                  onChange={handleAgeChange}
                />
                0-2 anos
              </label>

              <label className="checkbox-label" htmlFor="threeToFourCheckbox">
                <input
                  type="checkbox"
                  id="threeToFourCheckbox"
                  className="checkbox"
                  name="threeToFour"
                  checked={filterAge.threeToFour}
                  onChange={handleAgeChange}
                />
                3-4 anos
              </label>

              <label className="checkbox-label" htmlFor="aboveFourCheckbox">
                <input
                  type="checkbox"
                  id="aboveFourCheckbox"
                  className="checkbox"
                  name="aboveFour"
                  checked={filterAge.aboveFour}
                  onChange={handleAgeChange}
                />
                Acima de 4 anos
              </label>
            </div>
            <div>
            <button className="botaoprimario7" onClick={applyFilters}>
              <FaFilter size={16} />
              <span>Aplicar filtros</span>
            </button>
            </div>
            <div className="botaosec">
            <button className="clearFiltersButton" onClick={clearFilters}>Limpar filtros</button>
            </div>
          </div>
          <div className="group2">
            {animalsAllFilter.length > 0 ? (
              animalsAllFilter.map((animal) => (
                <div className="pet">
                  <img
                    alt=""
                    className=""
                    src={`data:image;base64,${animal.foto}`}
                  />
                  <div className="rectangle2">
                    <div className="group12">
                      <span className="petName">{animal.nome}</span>
                      <div className="linepet"></div>
                      <span className="petAge">{animal.idade} ano</span>
                      <div className="linepet"></div>
                      <span className="petGender">{animal.genero}</span>
                    </div>
                    <div className="botaoprimario1">
                      <img
                        alt=""
                        className="vectorpet"
                        src="https://file.rendit.io/n/ilD2joUeeLVTRBHLtWzP.svg"
                      />
                       {/* Usando o Link para conectar com a página de adoção */}
                       <Link to={`/adocao?animalId=${animal.id}`} state={{ animal: animal }}>
                        <button className="applyFiltersButton">Quero adotar</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div id="loading-animation" class="heading large-text"><p>L</p><p>o</p><p>a</p><p>d</p><p>i</p><p>n</p><p>g</p><p>.</p><p>.</p><p>.</p></div>
            )}
          </div>
        </div>

        <div className="container-pages-animals">
          <FaAnglesLeft size={32} onClick={() => page !== 1 && setPage(page - 1)} />
          <span>{page}</span>
          <FaAnglesRight size={32} onClick={() => page !== Math.ceil(animaisAll.length / 12) && setPage(page + 1)} />
        </div>
      </main>

      <Footer />
    </>
  );
}
