import "react-calendar/dist/Calendar.css";
import { MdFilterListAlt } from "react-icons/md";
import { FilterBulletin } from "../../../components/FilterBulletin";
import { HeaderAdm } from "../../../components/HeaderAdm";
import { MdQuestionMark } from "react-icons/md";
import { AsideAdm } from "../AsideAdm";
import "./BulletinAll.css";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { format, isValid } from "date-fns";
import { ModalBulletin } from "./ModalBulletin";

export function BulletinAll() {
    const [infosBulletin, setInfosBulletin] = useState([]);
    const [modal, setModal] = useState(false);
    const [infosModal, setInfosModal] = useState([]);

    console.log(infosBulletin);

    return(
        <>
            <HeaderAdm h1Text="Relatório Geral" classNameRegister={true} />
            <AsideAdm />

            <main className="main-adm-register">
                <div className="container-main-adm-bulletin">
                    <div className="header-adm-bulletin">
                        <div className=""></div>

                        <div className="header-bulletin-help">
                            <MdQuestionMark />

                            <div className="text-bulletin-help">
                                <span>Os dados que nao apareceram, estão vazios, portanto não serão mostrados!</span>
                            </div>
                        </div>

                        <div className="container-filter-button">
                            <input type="checkbox" id="filter" name="filter" />
                            <label htmlFor="filter" className="filter-button">
                                <span>Filtro</span>
                                <MdFilterListAlt />
                            </label>

                            <FilterBulletin setInfosBulletin={setInfosBulletin} />
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Data do Ultimo Cadastrado</th>
                                <th>Nome do Ultimo Cadastro</th>
                                <th>Quantidade de Cadastro no Intervalo de Tempo</th>
                                <th>Cadastros</th>
                            </tr>
                        </thead>

                        <tbody>
                            {infosBulletin.length > 0 && infosBulletin.map((info, index) => {
                                return(
                                    <>
                                        {info.allDataInInterval.length > 0 && (
                                            <tr key={index}>
                                                <td>{info.nameTableQuery}</td>
                                                <td>{isValid(new Date(info.quantData.data_ultimo_cadastro)) ? format(new Date(info.quantData.data_ultimo_cadastro), "dd/MM/yyyy") : ""}</td>
                                                <td>{info.quantData.nome}</td>
                                                <td>{info.quantData.quantidade_cadastros}</td>
                                                <td onClick={() => handleModal(info)}><CiMenuKebab /></td>
                                            </tr>
                                        )}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>

            {modal && (
                <ModalBulletin infosModal={infosModal} setModal={setModal} />
            )}
        </>
    );

    function handleModal(info){
        setInfosModal(info);
        setModal(true);
    }
}