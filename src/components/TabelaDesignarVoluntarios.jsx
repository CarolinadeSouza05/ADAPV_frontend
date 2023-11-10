import { Button, Container, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import '../Telas/CadastroDesignar.css'

export function TabelaDesignarVoluntarios(props) {

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Código do Voluntário</th>
                        <th>Nome do Voluntário</th>
                        <th>Telefone</th>
                        <th>Disponibilidade</th>
                        <th>Período</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listadevoluntarios?.map((voluntario) => {
                        return (
                            <tr key={voluntario.id}>
                                <td>{voluntario.id}</td>
                                <td>{voluntario.nome}</td>
                                <td>{voluntario.telefone}</td>
                                <td>{voluntario.disponibilidade}</td>
                                <td>{voluntario.periodo}</td>
                                <td>
                                    <Button
                                    className="botao_table_designar_voluntario"
                                        onClick={() => {
                                            const lista = props.listadevoluntarios.filter((volu) =>
                                                volu.id !== voluntario.id)
                                            props.setDesignarTarefas({ ...props.dadosDesignarTarefas, listadevoluntarios: lista })
                                            props.setListaItens(lista)
                                        }
                                    }
                                    ><FaTrash /></Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    )
}
