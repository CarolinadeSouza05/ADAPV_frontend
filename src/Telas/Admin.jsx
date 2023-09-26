import "./Admin.css";
import { CgMenuGridO } from "react-icons/cg"

export function Admin(){
    return (
        <>
            <aside className="container-aside">
                <div className="aside-menus">
                    <div className="aside-header">
                        <CgMenuGridO size={34} />
                    </div>
                </div>
            </aside>
        </>
    );
}