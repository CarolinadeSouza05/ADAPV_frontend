import { subMonths } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { FaLongArrowAltUp, FaMoneyCheck } from "react-icons/fa";
import { FaMoneyBillTrendUp, FaRegMoneyBill1 } from "react-icons/fa6";
import { MdMoneyOff } from "react-icons/md";
import { getAllCategorias, getAllDatesBox } from "../../../api";
import { CardBox } from "../../../components/CardBox";
import { HeaderAdm } from "../../../components/HeaderAdm";
import { StoreContext } from "../../../context";
import { AsideAdm } from "../AsideAdm";
import "./Caixa.css";
import { TableExpense } from "./TableExpense";
import { TableIncome } from "./TableIncome";
import { SkeletonCaixa } from "./SkeletonCaixa";

export function Caixa(){
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    const [datesBox, setDatesBox] = useState([]);
    const [tableCurrent, setTableCurrent] = useState("Rendimento-Total");
    const [categoryAll, setCategoryAll] = useState([]);
    const [loading, setLoading] = useState(true);
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
            numberMoney: datesBox[3]?.queryDatas?.reduce(
                (accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0),
            iconCard: <FaMoneyBillTrendUp color="#000" size={28} />,
            arrowIndication: <FaLongArrowAltUp color="#16A34A" />,
            porcentMonth: datesBox[3]?.differencyPorcent,
            colorInfosMonth: "#16A34A",
            textBodyCard: "Rendimento Mensal",
        },

        {
            numberMoney: datesBox[2]?.queryDatas?.reduce(
                (accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0),
            iconCard: <FaMoneyCheck color="#000" size={28} />,
            arrowIndication: <FaLongArrowAltUp color="#DC2626" />,
            porcentMonth: datesBox[2]?.differencyPorcent,
            colorInfosMonth: "#DC2626",
            textBodyCard: "Despesa Mensal",
        },
    ];

    useEffect(() => {
        (async () => {
            const dateNow = new Date();
            const dateMonthBack = subMonths(dateNow, 1);
            
            const datesBox = await getAllDatesBox({ dateNow, dateMonthBack }, user.id, user.token);
            const categoryAll = await getAllCategorias(user.token, user.id);
            setCategoryAll(categoryAll);

            if(datesBox.status)
                setDatesBox(datesBox.bulletins);

            const timeout = setTimeout(() => {
                setLoading(false);
            }, 2000);
            
            return () => clearTimeout(timeout);
        })()
    }, []);

    return(
        <>
            <HeaderAdm h1Text={"Caixa"} classNameRegister={true} />
            <AsideAdm />

            <main className="main-adm-register main-box">
                <div className="container-caixa-main">
                    {loading ? (
                        <SkeletonCaixa datesBox={datesBox} cardsBoxArray={cardsBoxArray} />
                    ) : (
                        <>
                            <header className="caixa-header">
                                <h2 className="h2">Caixa Geral</h2>

                                <p>Você gastou 
                                    <span className="expenses">{` R$${parseFloat(datesBox[2]?.queryDatas?.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0)).toFixed(2)} `}
                                    </span> e ganhou
                                    <span className="incomes">{` R$ ${parseFloat(datesBox[3]?.queryDatas?.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.valor),0)).toFixed(2)}`}
                                    </span> este mês
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
                                <button className={tableCurrent} onClick={() => setTableCurrent("Rendimento-Total")}>Rendimento Total</button>
                                <button className={tableCurrent} onClick={() => setTableCurrent("Despesa-Total")}>Despesa Total</button>
                                <button className={tableCurrent} onClick={() => setTableCurrent("Rendimento-Mensal")}>Rendimento Mensal</button>
                                <button className={tableCurrent} onClick={() => setTableCurrent("Despesa-Mensal")}>Despesa Mensal</button>
                            </div>

                            <table>
                                {renderizarDados()}
                            </table>
                        </>
                    )}
                </div>
            </main>
        </>
    );

    function renderizarDados() {
        switch (tableCurrent) {
          case "Rendimento-Total":
            return (
              <TableIncome datas={datesBox[0]?.queryDatas} />
            );
          case "Despesa-Total":
            return (
              <TableExpense datas={datesBox[1]?.queryDatas} categoryAll={categoryAll} />
            );
          case "Rendimento-Mensal":
            return (
                <TableIncome datas={datesBox[3]?.queryDatas} />
            );
          case "Despesa-Mensal":
            return (
                <TableExpense datas={datesBox[2]?.queryDatas} categoryAll={categoryAll} />
            );
          default:
            return null;
        }
      };
}