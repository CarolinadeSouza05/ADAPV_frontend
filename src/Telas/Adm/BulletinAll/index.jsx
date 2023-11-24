import "react-calendar/dist/Calendar.css";
import { MdFilterListAlt } from "react-icons/md";
import { FilterBulletin } from "../../../components/FilterBulletin";
import { HeaderAdm } from "../../../components/HeaderAdm";
import { AsideAdm } from "../AsideAdm";
import "./BulletinAll.css";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { format, isValid } from "date-fns";

export function BulletinAll() {
    const [infosBulletin, setInfosBulletin] = useState([]);

    console.log(infosBulletin);

    return(
        <>
            <HeaderAdm h1Text="Relatório Geral" classNameRegister={true} />
            <AsideAdm />

            <main className="main-adm-register">
                <div className="container-main-adm-bulletin">
                    <div className="header-adm-bulletin">                        
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
                                    <tr key={index}>
                                        <td>{info.nameTableQuery}</td>
                                        <td>{isValid(new Date(info.quantData.data_ultimo_cadastro)) ? format(new Date(info.quantData.data_ultimo_cadastro), "dd/MM/yyyy") : ""}</td>
                                        <td>{info.quantData.nome}</td>
                                        <td>{info.quantData.quantidade_cadastros}</td>
                                        <td><CiMenuKebab /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}