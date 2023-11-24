import React, { useEffect, useState } from "react";
import "./Pagpets.css";
import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { getAnimais, getAnimalsPagination } from "../api";
import { Link } from "react-router-dom";

export default function Pagpets() {
  const [animaisAll, setAnimalsAll] = useState([]);
  const [animalsAllFilter, setAnimalsAllFilter] = useState([]);
  const [page, setPage] = useState(1);

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
        <div className="group">
          <h2 className="title2">PETS ESPERANDO POR UM LAR</h2>
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
                <input type="checkbox" id="dogCheckbox" className="checkbox" />
                Cachorro
              </label>
              <label className="checkbox-label" htmlFor="catCheckbox">
                <input type="checkbox" id="catCheckbox" className="checkbox" />
                Gato
              </label>
              <label className="checkbox-label" htmlFor="puppyCheckbox">
                <input
                  type="checkbox"
                  id="puppyCheckbox"
                  className="checkbox"
                />
                Filhote
              </label>
              <label className="checkbox-label" htmlFor="adultCheckbox">
                <input
                  type="checkbox"
                  id="adultCheckbox"
                  className="checkbox"
                />
                Adulto
              </label>
              <label className="checkbox-label" htmlFor="smallSizeCheckbox">
                <input
                  type="checkbox"
                  id="smallSizeCheckbox"
                  className="checkbox"
                />
                Porte pequeno
              </label>
              <label className="checkbox-label" htmlFor="mediumSizeCheckbox">
                <input
                  type="checkbox"
                  id="mediumSizeCheckbox"
                  className="checkbox"
                />
                Porte médio
              </label>
              <label className="checkbox-label" htmlFor="largeSizeCheckbox">
                <input
                  type="checkbox"
                  id="largeSizeCheckbox"
                  className="checkbox"
                />
                Porte grande
              </label>
            </div>
            <div>
              <button className="botaoprimario7">Aplicar filtros</button>
            </div>
            <div className="botaosec">
              <button className="clearFiltersButton">Limpar filtros</button>
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
                       <Link to={`/adocao?animalId=${animal.id}`}>
                        <button className="applyFiltersButton">Quero adotar</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div id="loading-animation" class="heading large-text"><p>l</p><p>o</p><p>a</p><p>d</p><p>i</p><p>n</p><p>g</p></div>
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
