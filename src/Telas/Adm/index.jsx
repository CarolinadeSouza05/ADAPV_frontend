import { BsMoon, BsSun } from "react-icons/bs";
import "./Adm.css";
import { AsideAdm } from "./AsideAdm";
import { CardsAdm } from "../../components/CardsAdm";

export function Adm(){
    return (
        <main className="container-main-adm">
            <AsideAdm />

            <section className="container-dashboard-adm">
                <header className="dashboard-adm-header">
                    <h1 className="h1">Dashboard</h1>

                    <div className="dashboard-adm-header menu">
                        <div className="dashboard-adm-header menu-themes">
                            <BsSun size={18} />
                            <BsMoon size={18} />
                        </div>

                        <div className="dashboard-adm-header profile"></div>
                    </div>
                </header>

                <section className="container-dashboard-adm-main">
                    <div className="dashboard-adm-main-analytics">
                        <h2 className="h2">Análiticos</h2>

                        <div className="analytics-cards">
                            <CardsAdm />
                            <CardsAdm />
                            <CardsAdm />
                        </div>
                    </div>
                </section>
            </section>
        </main>
    )
}