import "./CardsAnalyticsAdm.css";

export function CardsAnalyticsAdm({ spanText, staticsText, porcentText, color }){
    return(
        <div className="card">
            <div className="card-title">
                <span className="span">{ spanText }</span>
                <h3 className="h3">{ staticsText }</h3>
            </div>

            <div className="card-grapich" style={{ border: `8px solid ${color}` }}>
                <h3 className="h3">{ porcentText }</h3>

                <div className="card-ball"></div>
            </div>
        </div>
    )
}