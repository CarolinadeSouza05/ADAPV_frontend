import "./HeaderAdm.css";

export function HeaderAdm({ h1Text, classNameRegister }){
    return(
        <header className={`dashboard-adm-header ${classNameRegister}`}>
            <h1 className="h1">{ h1Text }</h1>
        </header>
    )
}