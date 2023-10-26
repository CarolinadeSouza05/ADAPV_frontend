import "./Adm.css";
import { CgMenuGridO } from "react-icons/cg"

export function Adm(){
    return (
        <main className="container-main-adm">
            <aside className="aside-container-adm">
                <div className="aside-menu-header">
                    <CgMenuGridO className="svg-menu-adm" />
                </div>
            </aside>
        </main>
    )
}