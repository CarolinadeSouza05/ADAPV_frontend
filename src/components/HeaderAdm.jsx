import { BsMoon, BsSun } from "react-icons/bs";
import "./HeaderAdm.css";

export function HeaderAdm({ h1Text }){
    return(
        <header className="dashboard-adm-header">
            <h1 className="h1">{ h1Text }</h1>

            <div className="dashboard-adm-header menu">
                <div className="dashboard-adm-header menu-themes">
                    <BsSun size={18} />
                    <BsMoon size={18} />
                </div>

                <div className="dashboard-adm-header profile"></div>
            </div>
        </header>
    )
}