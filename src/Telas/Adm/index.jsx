import { BsMoon, BsSun } from "react-icons/bs";
import "./Adm.css";
import { AsideAdm } from "./AsideAdm";
import { CardsAnalyticsAdm } from "../../components/CardsAnalyticsAdm";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { CardNewUser } from "../../components/CardNewUser";
import { HeaderAdm } from "../../components/HeaderAdm";

export function Adm(){
    const cardsAdmArray = [
        {
            spanText: "Total lucrado", 
            staticsText: "R$1000.45", 
            porcentText: "+81%",
            color: "#16A34A"
        },

        {
            spanText: "Visitas no site", 
            staticsText: "480", 
            porcentText: "+39%",
            color: "#DC2626"
        },

        {
            spanText: "Procuras", 
            staticsText: "250", 
            porcentText: "+18%",
            color: "#0284C7"
        }
    ]

    const newUserAdmArray = [
        {
            Icon: AiOutlineUser,
            sizeIcon: 48, 
            h4Text: "Jack",
            h4Class: "h4",
            spanText: "Online a 54m"
        },
        {
            Icon: AiOutlineUser,
            sizeIcon: 48, 
            h4Text: "Jack",
            h4Class: "h4",
            spanText: "Online a 54m"
        },
        {
            Icon: AiOutlineUser,
            sizeIcon: 48, 
            h4Text: "Jack",
            h4Class: "h4",
            spanText: "Online a 54m"
        },
        {
            Icon: AiOutlinePlus,
            sizeIcon: 64, 
            h4Text: "Adicionar",
            h4Class: "h4 add",
            spanText: "Novo Usuário"
        },
    ]

    return (
        <main className="container-main-adm">
            <AsideAdm />

            <section className="container-adm">
                <HeaderAdm h1Text={"Dashboard"} />

                <section className="container-dashboard-adm-main">
                    <div className="dashboard-adm-main-analytics">
                        <h2 className="h2">Análiticos</h2>

                        <div className="analytics-cards">
                            {cardsAdmArray.map((card) => (
                                <CardsAnalyticsAdm
                                    spanText={card.spanText}
                                    staticsText={card.staticsText}
                                    porcentText={card.porcentText}
                                    color={card.color}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="dashboard-adm-main-new-users">
                        <h2 className="h2">Novos Usuários</h2>

                        <div className="container-new-users">
                            {newUserAdmArray.map((cardNewUser) => (
                                <CardNewUser
                                    Icon={cardNewUser.Icon}
                                    sizeIcon={cardNewUser.sizeIcon}
                                    h4Text={cardNewUser.h4Text}
                                    h4Class={cardNewUser.h4Class}
                                    spanText={cardNewUser.spanText}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="dashboard-adm-main-registers-recents">
                        <h2 className="h2">Registros recentes</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Nome do Cadastro</th>
                                    <th>Quantidade Cadastrada (Ultima Semana)</th>
                                    <th>Ultimo Cadastro(Nome)</th>
                                    <th>Ultimo Cadastro (Data)</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Cadastro de Animais</td>
                                    <td>3</td>
                                    <td>Rex</td>
                                    <td>13/10/2023</td>
                                </tr>
                                <tr>
                                    <td>Adoção Realizada</td>
                                    <td>11</td>
                                    <td>Lulu</td>
                                    <td>29/07/2023</td>
                                </tr>
                                <tr>
                                    <td>Cadastro de Voluntário</td>
                                    <td>8</td>
                                    <td>Alerrando</td>
                                    <td>06/09/2023</td>
                                </tr>
                                <tr>
                                    <td>Cadastro de Produtos</td>
                                    <td>7</td>
                                    <td>Ração</td>
                                    <td>01/09/2023</td>
                                </tr>
                                <tr>
                                    <td>Agendamentos</td>
                                    <td>4</td>
                                    <td>Ricardo</td>
                                    <td>07/05/2023</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </main>
    )
}