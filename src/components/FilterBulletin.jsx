import { format } from "date-fns";
import { useContext, useState } from "react";
import Calendar from "react-calendar";
import { IoMdClose } from "react-icons/io";
import { getBulletinAll } from "../api";
import { StoreContext } from "../context";

export function FilterBulletin({ setInfosBulletin }){
    const [dates, setDates] = useState({
        dateStart: new Date(),
        dateEnd: new Date()
    });
    const useStore = useContext(StoreContext);
    const { user } = useStore();

    return(
        <div className="container-filter">
            <form className="filter" onSubmit={submit}>
                <header className="filter-header">
                    <h3>Filtro</h3>
                    
                    <label htmlFor="filter">
                        <IoMdClose />
                    </label>
                </header>

                <div className="filter-calendar">
                    <span>Data Inicio:</span>
                    <Calendar 
                        className="calendar" 
                        value={dates.dateStart ? new Date(dates.dateStart) : null} 
                        onChange={(e) =>
                            setDates({
                                ...dates,
                                dateStart: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                            })
                        }
                    />
                </div>

                <div className="filter-calendar">
                    <span>Data Final:</span>
                    <Calendar 
                        className="calendar" 
                        value={dates.dateEnd ? new Date(dates.dateEnd) : null} 
                        onChange={(e) =>
                            setDates({
                                ...dates,
                                dateEnd: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                            })
                        }
                    />
                </div>

                <button className="btn-filter">
                    <span>Filtrar</span>
                </button>
            </form>
        </div>
    )

    async function submit(e){
        e.preventDefault();
        const datesAux = {
            dateStart: format(new Date(dates.dateStart), "yyyy-MM-dd"), 
            dateEnd: format(new Date(dates.dateEnd), "yyyy-MM-dd")
        }
        
        const aux  = await getBulletinAll(datesAux, user.id, user.token);

        if(aux.status){
            setInfosBulletin(aux.bulletins);
        }
    }
}