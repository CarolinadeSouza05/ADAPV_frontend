import "./CardBox.css";
import { FaRegMoneyBill1 } from "react-icons/fa6";

export function CardBox(){
    return(
        <div className="container-cardbox">
            <header className="header-cardbox">
                <FaRegMoneyBill1 size={28} />
            </header>

            <section className="body-cardbox">
                <h3>R$4, 678.67</h3>

                <span>Rendimento Geral</span>
            </section>
        </div>
    )
}