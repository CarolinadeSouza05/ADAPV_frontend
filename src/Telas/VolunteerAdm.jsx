import { useContext, useEffect, useState } from "react";
import { HeaderAdm } from "../components/HeaderAdm";
import { AsideAdm } from "./Adm/AsideAdm";
import { NameToAccepToDoAllFromVolunteer } from "../util";
import { StoreContext } from "../context";
import { format, isValid, parseISO } from "date-fns";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "./VolunteerAdm.css"
import { deleteRegisterVoluntario, getAllRegisterVoluntario } from "../api";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

export function VolunteerAdm(){
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    const [acceptToDoAll, setAcceptToDoAll] = useState([]);
    const [registerVolunteers, setRegisterVolunteers] = useState([]);
    const tableHead = ["Id", "Nome Completo", "Telefone", "Dias da semana", "Período", "Data", "O que aceitaria fazer"]

    useEffect(() => {
        (async function () {
          await NameToAccepToDoAllFromVolunteer(setRegisterVolunteers, setAcceptToDoAll, user.token, user.id);
        })();
      }, []);

    return(
        <>
            <AsideAdm />
            <HeaderAdm h1Text={"Cadastro"} classNameRegister="true" />
            
            <main className="main-adm-register volunteer-adm">
                <header className="header-volunteer-adm">
                    <h2>Registro de Voluntários</h2>
                    
                    <div className="button-modal-volunteer">
                        <FaPlus size={28} />
                        <span>Add</span>
                    </div>
                </header>

                <table>
                    <thead>
                        <tr>
                        {tableHead.map((head, index) => (
                            <th scope="col" key={index}>
                            {head}
                            </th>
                        ))}
                        <th scope="col">Editar</th>
                        <th scope="col">Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registerVolunteers !== undefined && registerVolunteers.length > 0 &&
                        registerVolunteers.map((registerInput, index) => (
                                <tr key={index}>
                                    {Object.values(registerInput).map((input) => (
                                        <>
                                            {typeof input === 'object' ? (
                                                <div className="td-maps horizontal-divide">
                                                {input.map((item, indexItem) => (
                                                    <td key={`td-map-${indexItem}`}>{item}</td>
                                                ))}
                                                </div>
                                                ) : typeof input === "number" ? (
                                                <td>{input}</td>
                                            ) : (
                                                <td>{isValid(input) ? format(parseISO(input), 'dd/MM/yyyy') : input}</td>
                                            )}
                                        </>
                                        ))}
                                    <td>
                                        <FaPencil
                                        size={28}
                                        />
                                    </td>
                                    <td>
                                        <FaRegTrashAlt
                                            size={28}
                                            onClick={() => deleteRegister(registerInput.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </main>

            <ToastContainer />
        </>
    );

    async function deleteRegister(id) {
        if (window.confirm("Tem certeza de que deseja excluir o voluntário?")) {
          const aux = registerVolunteers.filter((volunteer) => volunteer.id === id);
          const message = await deleteRegisterVoluntario(aux[0], user.token, user.id);
          setRegisterVolunteers(await getAllRegisterVoluntario(user.token, user.id));
          toast.success(message && "Voluntário Deletado com sucesso", {
            position: "bottom-left",
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            theme: "light",
          })
        }
    
        await NameToAccepToDoAllFromVolunteer(setRegisterVolunteers, setAcceptToDoAll, user.token, user.id);
      }
}