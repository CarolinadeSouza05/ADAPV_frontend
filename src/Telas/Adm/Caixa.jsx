import React from "react";
import { HeaderAdm } from "../../components/HeaderAdm";
import { AsideAdm } from "./AsideAdm";
import "./Caixa.css";
import { CardBox } from "../../components/CardBox";
import { FaRegMoneyBill1, FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaLongArrowAltUp, FaMoneyCheck } from "react-icons/fa";
import { MdMoneyOff } from "react-icons/md";
import { MdDriveFileRenameOutline, MdAttachMoney, MdDateRange  } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { format } from "date-fns";

export function Caixa(){
    const cardsBoxArray = [
        {
            numberMoney: "4,678.67",
            iconCard: <FaRegMoneyBill1 size={28} />,
            colorPrinc: "#3AB1B9",
            textBodyCard: "Rendimento Geral"
        },

        {
            numberMoney: "4,678.67",
            iconCard: <MdMoneyOff size={28} />,
            colorPrinc: "#DC2626",
            textBodyCard: "Despesa Geral"
        },

        {
            numberMoney: "4,678.67",
            iconCard: <FaMoneyBillTrendUp color="#000" size={28} />,
            arrowIndication: <FaLongArrowAltUp color="#16A34A" />,
            porcentMonth: "2.11%",
            colorInfosMonth: "#16A34A",
            textBodyCard: "Rendimento Mensal",
        },

        {
            numberMoney: "4,678.67",
            iconCard: <FaMoneyCheck color="#000" size={28} />,
            arrowIndication: <FaLongArrowAltUp color="#DC2626" />,
            porcentMonth: "2.11%",
            colorInfosMonth: "#DC2626",
            textBodyCard: "Despesa Mensal",
        },
    ]

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
                        {cardsBoxArray.map((card) => (
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
                        <button>Despesa Total</button>
                        <button>Rendimento Mensal</button>
                        <button>Despesa Mensal</button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <MdDriveFileRenameOutline size={22} />
                                    Nome
                                </th>

                                <th>
                                    <BiCategory size={22} />
                                    Categoria/Fonte
                                </th>

                                <th>
                                    <MdAttachMoney size={22} />
                                    Valor
                                </th>

                                <th>
                                    <MdDateRange size={22} />
                                    Data
                                </th>

                                <th>
                                    <FiUserPlus size={22} />
                                    Usuário Cadastrado
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Ração</td>
                                <td>Produto</td>
                                <td>R$50.00</td>
                                <td>{format(new Date(), "dd/MM/yyyy")}</td>
                                <td>Alerrando</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}