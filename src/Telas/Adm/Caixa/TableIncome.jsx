import { format } from "date-fns";
import { MdAttachMoney, MdDateRange } from "react-icons/md";

export function TableIncome({ datas }) {

    return (
        <>
            <thead>
                <tr>
                    <th>
                        <MdAttachMoney size={22} />
                        Valor
                    </th>
                    <th>
                        <MdDateRange size={22} />
                        Data
                    </th>
                </tr>
            </thead>
            <tbody>
                {datas && datas.map((data, index) => (
                    <tr key={index}>
                        <td>{data.valor}</td>
                        <td>{format(new Date(data.data), "dd/MM/yyyy")}</td>
                    </tr>
                ))}
            </tbody>
        </>
    );
}
