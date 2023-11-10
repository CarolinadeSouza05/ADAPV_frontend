import { Link } from "react-router-dom";
import "./CardNewUser.css";

export function CardNewUser({ Icon, sizeIcon, h4Text, h4Class, spanText, redirection = false }){
    return(
        <>
            {!redirection ? (
                <div className="new-user-card">
                    <Icon size={sizeIcon} />

                    <h4 className={h4Class}>{ h4Text }</h4>
                    <span className="span">{ spanText }</span>
                </div>
            ) : (
                <Link to={"/adm/cadastro/usuario"} className="new-user-card">
                    <Icon size={sizeIcon} />

                    <h4 className={h4Class}>{ h4Text }</h4>
                    <span className="span">{ spanText }</span>
                </Link>
            )}
        </>
    )
}