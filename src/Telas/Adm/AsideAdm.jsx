import { useState } from "react";
import "./AsideAdm.css";
import { CgMenuGridO } from "react-icons/cg"

export function AsideAdm(){
    const [menu, setMenu] = useState(false);

    return(
        <aside className={`container-aside-adm ${menu}`}>
            <div className="aside-adm-main">
                <div className="aside-menu-header">
                    <CgMenuGridO className="svg-menu-adm" onClick={() => handleMenu()} />
                </div>
            </div>
        </aside>
    );

    function handleMenu(){
        setMenu(!menu);
    }
}