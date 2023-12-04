import { useState } from "react";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { FaBoxOpen, FaHands, FaTasks, FaUser } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GiArchiveRegister } from "react-icons/gi";
import { MdCategory, MdOutlinePets, MdOutlineVolunteerActivism } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { TbPigMoney, TbReportSearch } from "react-icons/tb";
import { TfiAgenda } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { CiBoxes } from "react-icons/ci";
import "./AsideAdm.css";

export function AsideAdm(){
    const [menu, setMenu] = useState(false);
    const cardsRegister = [
        { id: 1, name: "Voluntários", icon: MdOutlineVolunteerActivism, path: "/adm/cadastro/voluntario" },
        { id: 2, name: "Cadastro de Tarefas", icon: FaTasks, path: "/adm/cadastro/aceitafazer" },
        { id: 3, name: "Cadastro de Usuário", icon: FaUser, path: "/adm/cadastro/usuario" },
        { id: 4, name: "Cadastro de Produtos", icon: FaBoxOpen, path: "/adm/cadastro/produto" },
        { id: 5, name: "Cadastro de Categoria", icon: MdCategory, path: "/adm/cadastro/categoria" },
        { id: 6, name: "Cadastro de Animais", icon: MdOutlinePets, path: "/adm/cadastro/animal" },
        { id: 7, name: "Autorizar Adoções", icon: FaHands, path: "/adm/autorizar-adocao" },
        { id: 8, name: "Designar Atividades", icon: AiOutlineDeliveredProcedure, path: "/adm/cadastro/designar-voluntario" },
        { id: 9, name: "Agendamento", icon: TfiAgenda, path: "/adm/cadastro/agendamento" },
        { id: 10, name: "Lançamento de Entrada", icon: FaMoneyCheckDollar, path: "/adm/cadastro/lancar-entrada" },
    ];

    const cardsBulletin = [
        { id: 1, name: "Relatório Geral de Cadastro", icon: GiArchiveRegister, path: "/adm/relatorio/geral" }
    ]

    return(
        <aside className={`container-aside-adm ${menu}`}>
            <div className="aside-adm-main">
                <div className="aside-menu-header">
                    <CgMenuGridO className="svg-menu-adm" onClick={() => handleMenu()} />
                </div>

                <div className="aside-menu-main">
                    <ul className="container-list-menu">
                        <li className="list-menu">
                                <Link to="/adm" className="list-menu-icon">
                                    <BiSolidDashboard size={26} />
                                    <span>Dashboard</span>
                                </Link>
                        </li>
                    
                        <li className="list-menu menu-registers">
                            <div className="list-menu-icon">
                                <BsPeopleFill size={26} />
                                <span>Cadastros</span>
                            </div>

                            <ul className="container-list-menu-ul registers" style={{ marginTop: `150%` }}>
                                {cardsRegister.sort((card1, card2) => card1.name.localeCompare(card2.name)).map((card) => (
                                    <>
                                        <Link key={card.id} to={card.path}>
                                            <card.icon />
                                            <span>{card.name}</span>
                                        </Link>
                                    </>
                                ))}
                            </ul>
                        </li>

                        <li className="list-menu menu-bulletin">
                            <div className="list-menu-icon">
                                <TbReportSearch size={26} />
                                <span>Relatórios</span>
                            </div>

                            <ul className="container-list-menu-ul bulletins" style={{ marginTop: `${10 * cardsBulletin.length}%` }}>
                                {cardsBulletin.sort((card1, card2) => card1.name.localeCompare(card2.name)).map((card) => (
                                    <>
                                        <Link key={card.id} to={card.path}>
                                            <card.icon />
                                            <span>{card.name}</span>
                                        </Link>
                                    </>
                                ))}
                            </ul>
                        </li>

                        <li className="list-menu">
                            <div className="list-menu-icon">
                                <Link to="/adm/caixa">
                                    <TbPigMoney  size={26} />
                                    <span>Caixa</span>
                                </Link>
                            </div>
                        </li>

                        <li className="list-menu">
                            <div className="list-menu-icon">
                                <Link to="/adm/estoque">
                                    <CiBoxes size={26} />
                                    <span>Estoque</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

                <footer className="footer-aside-menu-main">
                    <li className="list-menu-icon">
                        <Link to="/home">
                            <RxExit size={26} />
                            <span>Sair</span>
                        </Link>
                    </li>
                </footer>
            </div>
        </aside>
    );

    function handleMenu(){
        setMenu(!menu);
    }
}