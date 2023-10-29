import "./CardsAdm.css";

export function CardsAdm(){
    return(
        <div className="card">
            <div className="card-title">
                <span className="span">Total lucrado</span>
                <h3 className="h3">R$1000,45</h3>
            </div>

            <div className="card-grapich">
                <h3 className="h3">81%</h3>

                <div className="card-ball"></div>
            </div>
        </div>
    )
}