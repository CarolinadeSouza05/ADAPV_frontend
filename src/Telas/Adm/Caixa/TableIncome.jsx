import { format } from "date-fns";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { MdAttachMoney, MdDateRange } from "react-icons/md";

export function TableIncome({ datas }) {

    return (
        <>
            <thead>
                <tr>
                    <th>
                        <AiOutlineFieldNumber size={22} />
                        Id
                    </th>
                    <th>
                        <FaKey size={22} />
                        Chave
                    </th>
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
                        <td>{index + 1}</td>
                        <td>{data.chave}</td>
                        <td>{data.valor}</td>
                        <td>{format(new Date(data.data), "dd/MM/yyyy")}</td>
                    </tr>
                ))}
            </tbody>
        </>
    );
}
