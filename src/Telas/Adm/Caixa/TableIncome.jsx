import { format } from "date-fns";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { MdAttachMoney, MdDateRange } from "react-icons/md";

export function TableIncome({ datas }){
    console.log(datas);

    return(
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
                <tr>
                    <td>1</td>
                    <td>P4vG&?0Vk1T</td>
                    <td>R$50.00</td>
                    <td>{format(new Date(), "dd/MM/yyyy")}</td>
                </tr>
            </tbody>
        </>
    )
}