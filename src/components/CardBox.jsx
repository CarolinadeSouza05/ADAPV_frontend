import "./CardBox.css";

export function CardBox({ numberMoney, iconCard, textBodyCard, colorPrinc = "#fff", arrowIndication, porcentMonth, colorInfosMonth }){
    return(
        <div className="container-cardbox" style={{ backgroundColor: colorPrinc }}>
            <header className="header-cardbox">
                {iconCard}

                    <div className={`header-candbox-info-month ${porcentMonth > 0 ? "positive" : porcentMonth < 0 ? "negative" : "null"}`}>
                        {arrowIndication && (
                            <>
                                {arrowIndication}

                                <p>
                                    <span style={{ color: `${colorInfosMonth}` }}>{differencyPorcent()}</span> 
                                    nos ultimos 30 dias
                                </p>
                            </>
                        )}
                    </div>
            </header>

            <section className="body-cardbox" style={{ color: colorPrinc === "#fff" && "#000" }}>
                <h3>R$ {parseFloat(numberMoney).toFixed(2)}</h3>

                <span>{textBodyCard}</span>
            </section>
        </div>
    );

    function differencyPorcent(){
        if(porcentMonth !== null)
            return `${parseFloat(porcentMonth).toFixed(2)}% `
        else
            return `${parseFloat(0).toFixed(2)}% `
    }
}