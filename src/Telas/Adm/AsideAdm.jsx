import { useState } from "react";
import "./AsideAdm.css";
import { CgMenuGridO } from "react-icons/cg";
import { BiSolidDashboard } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs"
import { Link } from "react-router-dom";

export function AsideAdm(){
    const [menu, setMenu] = useState(false);

    return(
        <aside className={`container-aside-adm ${menu}`}>
            <div className="aside-adm-main">
                <div className="aside-menu-header">
                    <CgMenuGridO className="svg-menu-adm" onClick={() => handleMenu()} />
                </div>

                <div className="aside-menu-main">
                    <ul className="container-list-menu">
                        <li className="list-menu">
                            <Link to="/adm">
                                <BiSolidDashboard size={26} />
                            </Link>
                        </li>
                        
                        <li className="list-menu">
                            <Link to="/adm/cadastro">
                                <BsPeopleFill size={26} />
                            </Link>
                        </li>

                        <li className="list-menu">
                            <TbReportSearch size={26} />
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );

    function handleMenu(){
        setMenu(!menu);
    }
}