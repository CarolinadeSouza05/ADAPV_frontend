import { MdFilterListAlt } from "react-icons/md";
import { HeaderAdm } from "../../components/HeaderAdm";
import { AsideAdm } from "./AsideAdm";
import "./BulletinAll.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoMdClose } from "react-icons/io";

export function BulletinAll() {
    return(
        <>
            <HeaderAdm h1Text="Relatório Geral" classNameRegister={true} />
            <AsideAdm />

            <main className="main-adm-register">
                <div className="container-main-adm-bulletin">
                    <div className="header-adm-bulletin">
                        <h3>Relatório Geral de Cadastro</h3>
                        
                        <div className="container-filter-button">
                            <input type="checkbox" id="filter" name="filter" />
                            <label htmlFor="filter" className="filter-button">
                                <span>Filtro</span>
                                <MdFilterListAlt />
                            </label>

                            <div className="container-filter">
                                <div className="filter">
                                    <header className="filter-header">
                                        <h3>Filtro</h3>
                                        
                                        <IoMdClose />
                                    </header>

                                    <div className="filter-calendar">
                                        <span>Data Inicio:</span>
                                        <Calendar className="calendar" />
                                    </div>

                                    <div className="filter-calendar">
                                        <span>Data Final:</span>
                                        <Calendar className="calendar" />
                                    </div>

                                    <button className="btn-filter">
                                        <span>Filtrar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}