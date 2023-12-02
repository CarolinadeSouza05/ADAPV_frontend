import { format } from "date-fns";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdAttachMoney, MdDateRange, MdDriveFileRenameOutline } from "react-icons/md";

export function TableExpense({ datas }){
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
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Ração</td>
                    <td>Produto</td>
                    <td>R$50.00</td>
                    <td>{format(new Date(), "dd/MM/yyyy")}</td>
                </tr>
            </tbody>
        </>
    )
}