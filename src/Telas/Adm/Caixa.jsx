import React from "react";
import { HeaderAdm } from "../../components/HeaderAdm";
import { AsideAdm } from "./AsideAdm";
import "./Caixa.css";
import { CardBox } from "../../components/CardBox";

export function Caixa(){
    return(
        <>
            <HeaderAdm h1Text={"Caixa"} classNameRegister={true} />
            <AsideAdm />

            <main className="main-adm-register">
                <div className="container-caixa-main">
                    <header className="caixa-header">
                        <h2 className="h2">Caixa Geral</h2>

                        <p>Você gastou 
                            <span className="expenses">-R$2.567</span> e ganhou
                            <span className="incomes">+R$5.878</span> este mês
                        </p>
                    </header>
                    
                    <section className="cards-box">
                        <CardBox />
                        <CardBox />
                        <CardBox />
                        <CardBox />
                    </section>
                </div>
            </main>
        </>
    )
}