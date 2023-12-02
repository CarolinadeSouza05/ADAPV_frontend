import { CardBox } from "../../../components/CardBox";
import "./SkeletonCaixa.css"

export function SkeletonCaixa({ datesBox, cardsBoxArray }){
    return(
        <>
            <header className="skeleton caixa-header">
                <h2 className="h2">Caixa Geral</h2>

                <p></p>
            </header>
            
            <section className="skeleton cards-box">
                {datesBox.length > 0 && cardsBoxArray.map((card) => (
                    <CardBox
                        arrowIndication={card.arrowIndication}
                        colorInfosMonth={card.colorInfosMonth}
                        iconCard={card.iconCard}
                        numberMoney={card.numberMoney}
                        porcentMonth={card.porcentMonth}
                        textBodyCard={card.textBodyCard}
                        colorPrinc={card.colorPrinc}
                        key={`card-box-${card.textBodyCard}`}
                    />
                ))}
            </section>

            <div className="group-buttons-box">
                <button>Rendimento Total</button>
                <button >Despesa Total</button>
                <button>Rendimento Mensal</button>
                <button>Despesa Mensal</button>
            </div>

            <table>

            </table>
        </>
    );
}