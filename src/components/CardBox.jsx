import "./CardBox.css";

export function CardBox({ numberMoney, iconCard, textBodyCard, colorPrinc = "#fff", arrowIndication, porcentMonth, colorInfosMonth }){
    return(
        <div className="container-cardbox" style={{ backgroundColor: colorPrinc }}>
            <header className="header-cardbox">
                {iconCard}

                    <div className="header-candbox-info-month">
                        {arrowIndication && (
                            <>
                                {arrowIndication}

                                <p><span style={{ color: `${colorInfosMonth}` }}>{porcentMonth}</span> nos ultimos 30 dias</p>
                            </>
                        )}
                    </div>
            </header>

            <section className="body-cardbox" style={{ color: colorPrinc === "#fff" && "#000" }}>
                <h3>R$ {numberMoney}</h3>

                <span>{textBodyCard}</span>
            </section>
        </div>
    )
}