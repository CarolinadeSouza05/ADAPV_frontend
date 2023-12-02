import React, { useContext, useEffect, useState } from "react";
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
import { format, subMonths } from "date-fns";
import { StoreContext } from "../../context";
import { getAllDatesBox } from "../../api";

export function Caixa(){
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    const [datesBox, setDatesBox] = useState([]);
    const cardsBoxArray = [
        {
            numberMoney: datesBox[0]?.queryDatas?.reduce(
                (accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0),
            iconCard: <FaRegMoneyBill1 size={28} />,
            colorPrinc: "#3AB1B9",
            textBodyCard: "Rendimento Geral"
        },

        {
            numberMoney: datesBox[1]?.queryDatas?.reduce(
                (accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0),
            iconCard: <MdMoneyOff size={28} />,
            colorPrinc: "#DC2626",
            textBodyCard: "Despesa Geral"
        },

        {
            numberMoney: datesBox[2]?.queryDatas?.reduce(
                (accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0),
            iconCard: <FaMoneyBillTrendUp color="#000" size={28} />,
            arrowIndication: <FaLongArrowAltUp color="#16A34A" />,
            porcentMonth: datesBox[2]?.differencyPorcent,
            colorInfosMonth: "#16A34A",
            textBodyCard: "Rendimento Mensal",
        },

        {
            numberMoney: datesBox[3]?.queryDatas?.reduce(
                (accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0),
            iconCard: <FaMoneyCheck color="#000" size={28} />,
            arrowIndication: <FaLongArrowAltUp color="#DC2626" />,
            porcentMonth: datesBox[3]?.differencyPorcent,
            colorInfosMonth: "#DC2626",
            textBodyCard: "Despesa Mensal",
        },
    ];

    console.log(datesBox);

    useEffect(() => {
        (async () => {
            const dateNow = new Date();
            const dateMonthBack = subMonths(dateNow, 1);
            
            const aux = await getAllDatesBox({ dateNow, dateMonthBack }, user.id, user.token);

            if(aux.status)
                setDatesBox(aux.bulletins);
        })()
    }, []);

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