import { format } from "date-fns";
import { BiCategory } from "react-icons/bi";
import { MdAttachMoney, MdDateRange, MdDriveFileRenameOutline } from "react-icons/md";

export function TableExpense({ datas, categoryAll }){

    return(
        <>
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
                </tr>
            </thead>
            
            <tbody>
                {datas && datas.map((data, index) => (
                    <tr key={index}>
                        <td>{data.nome}</td>
                        <td>{categoryAll.find((cat) => cat.id === data.categoria).nome}</td>
                        <td>{data.valor}</td>
                        <td>{format(new Date(data.data), "dd/MM/yyyy")}</td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}