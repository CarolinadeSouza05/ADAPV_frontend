import "./CardNewUser.css";

export function CardNewUser({ Icon, sizeIcon, h4Text, h4Class, spanText }){
    return(
        <div className="new-user-card">
            <Icon size={sizeIcon} />

            <h4 className={h4Class}>{ h4Text }</h4>
            <span className="span">{ spanText }</span>
        </div>
    )
}