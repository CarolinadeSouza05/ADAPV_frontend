import { useEffect, useState } from "react";
import Barradebusca from "../components/Barradebusca";
import {urLBase} from "../api/index";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { TabelaDesignarVoluntarios } from "../components/TabelaDesignarVoluntarios";
import CaixadeSelecao from "../components/CaixadeSelecao";

export default function FormDesignarTarefas(props) {
    const [validado, setValidado] = useState(false);
    const [VoluntarioSelecionado, setVoluntarioSelecionado] = useState({});
    const [atividadeSelecionada, setAtividadeSelecionada] = useState({});
    const [atividades, setAtividades] = useState();
    const [listadeVoluntariosSelecionados, setListadeVoluntariosSelecionados] = useState([]);

    const [designarTarefas, setDesignarTarefas] = useState({
        id_designar: 0,
        cod_atividade: {},
        data: "",
        hora: "",
        listadeVoluntarios: []
    });

    const {setAllRegisters} = props;

    //Recebendo os Dados do banco de dados das atividades
    useEffect(() => {
        fetch(urLBase + "/aceitariafazer", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setAtividades(dados);
            }
            else {
                // setAtividades([]);
            }
        })
    }, []);


    //// tentando editar

//    useEffect(() => {
//     if (props.editData) {
//       // Se houver dados de edição, atualize os campos do formulário
//       const { atividade, data, hora, listadeVoluntarios } = props.editData;
//       setAtividadeSelecionada(atividade);
//       setDesignarTarefas({
//         id_designar: 0,
//         cod_atividade: atividade,
//         data,
//         hora,
//         listadeVoluntarios
//       });
//     }
//   }, [props.editData]);

    function manipularMudanca(e) {
        const alvo = e.currentTarget.name;
        if (e.target.type === "checkbox") {
            setDesignarTarefas({
                ...designarTarefas,
                [alvo]: e.target.checked
            });
        } else {
            setDesignarTarefas({
                ...designarTarefas,
                [alvo]: e.target.value
            });
        }
    }

    function gravarDesignar() {
         let listadevolunarios_Json = [];
         for (const item of listadeVoluntariosSelecionados) {
             listadevolunarios_Json.push(
                 {
                    id: item.id 
                 }
             );
         }
        fetch(urLBase + "/designar_atividades", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "atividade": { "id": atividadeSelecionada.id },
                "data": designarTarefas.data,
                "hora": designarTarefas.hora,
                "listadeVoluntarios": listadevolunarios_Json
            })
            
        }).then((resposta) => {
            return (resposta.json());
        }).then((dados) => {
            if (dados.status) {
                setDesignarTarefas({ ...designarTarefas, id: dados.id });
                fetch(urLBase + "/designar_atividades", {
                    method: "GET"
                })
                .then((resposta) => {
                    return resposta.json();
                })
                .then((dados) => {
                    if (Array.isArray(dados)) {
                        setAllRegisters(dados); // Atualize os registros aqui
                    }
                })
            }
            alert(dados.mensagem);
        }).catch((erro) => {
            alert("Não foi possível gravar a tarefa: " + erro.message);
        })
    }

    const manipulaSubmissao = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            setValidado(false);
            gravarDesignar();
        } else {
            setValidado(true);
        }
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div>
            <Form onSubmit={manipulaSubmissao} validated={validado} className="Form_designar" >
                <Row className="alinhando_linhas_form_designar">
                <Col md={11}>
                    <Barradebusca
                        placeholder={'Informe a atividade'}
                        dados={atividades}
                        campoChave={"id"}
                        campoBusca={"name"}
                        funcaoSelecao={setAtividadeSelecionada}
                    ></Barradebusca>
                </Col></Row>
                <Row style={{ marginTop: '20px' , marginBottom: '20px'}} className="alinhando_linhas_form_designar">
                    <Form.Group as={Col} md='6' controlId="data_tarefa">
                        <Form.Label>Data</Form.Label>
                        <Form.Control required
                            type="date"
                            name="data"
                            value={designarTarefas.data}
                            onChange={manipularMudanca} />
                    </Form.Group>
                    <Form.Group as={Col} md='5' controlId="hora_tarefa">
                        <Form.Label>Hora</Form.Label>
                        <Form.Control required
                            type="time"
                            name="hora"
                            value={designarTarefas.hora}
                            onChange={manipularMudanca} />
                    </Form.Group>
                </Row>
                {/* <Row>
                    <div>
                        <Barradebusca
                            placeHolder={'Informe o voluntário'}
                            dados={listadeVoluntarios}
                            campoChave={"id"}
                            campoBusca={"nome"}
                            funcaoSelecao={setVoluntarioSelecionado}
                        ></Barradebusca>
                    </div>
                </Row> */}
                <Row className="alinhando_linhas_form_designar">
                    <Col md={11}>
                    <CaixadeSelecao url={urLBase + "/voluntarios"} campoChave={"id"} campoExibicao={"nome"} funcaoSelecao={setVoluntarioSelecionado}></CaixadeSelecao>
                    </Col>
                </Row>
                <Row className="alinhando_linhas_form_designar">
                    <Form.Group as={Col} md='2' controlId="id_voluntario">
                        <Form.Control
                            type={'text'}
                            name={'id'}
                            placeholder={'Código'}
                            value={VoluntarioSelecionado.id}
                            disabled={true}
                            style={{ marginTop: '30px' }}
                        /></Form.Group>

                    <Form.Group as={Col} md='2' controlId="nome_voluntario">
                        <Form.Control
                            type={'text'}
                            name={'nome'}
                            placeholder={'Nome'}
                            value={VoluntarioSelecionado.nome}
                            disabled={true}
                            style={{ marginTop: '30px' }}
                        /></Form.Group>

                    <Form.Group as={Col} md='2' controlId="telefone_voluntario">
                        <Form.Control
                            type={'text'}
                            name={'telefone'}
                            placeholder={'Telefone'}
                            value={VoluntarioSelecionado.telefone}
                            disabled={true}
                            style={{ marginTop: '30px' }}
                        /></Form.Group>
                    <Form.Group as={Col} md='2' controlId="disponibilidade_voluntario">
                        <Form.Control
                            type={'text'}
                            name={'disponibilidade'}
                            placeholder={'Disponibilidade'}
                            value={VoluntarioSelecionado.disponibilidade}
                            disabled={true}
                            style={{ marginTop: '30px' }}
                        /></Form.Group>
                    <Form.Group as={Col} md='2' controlId="periodo_voluntario">
                        <Form.Control
                            type={'text'}
                            name={'periodo'}
                            placeholder={'Periodo'}
                            value={VoluntarioSelecionado.periodo}
                            disabled={true}
                            style={{ marginTop: '30px' }}
                        /></Form.Group>

                    <Form.Group as={Col} md='1' controlId="acrescentar">
                        <Button className="botao_table_designar_voluntario"
                        onClick={() => {
                             const vol1 = {
                                id: VoluntarioSelecionado.id,
                                nome: VoluntarioSelecionado.nome,
                                telefone: VoluntarioSelecionado.telefone,
                                disponibilidade: VoluntarioSelecionado.disponibilidade,
                                periodo: VoluntarioSelecionado.periodo
                            }//A ... significa pegar a lista anterior e adicionar a uma nova lista podendo add novos valores
                            setListadeVoluntariosSelecionados([...listadeVoluntariosSelecionados, vol1])}}
                            style={{ marginTop: '30px' }}><FaCartPlus /></Button>
                    </Form.Group>
                </Row>
                
                <Row>
                    <TabelaDesignarVoluntarios 
                        listadevoluntarios={listadeVoluntariosSelecionados}
                        setDesignarTarefas={setDesignarTarefas}
                        dadosDesignarTarefas={designarTarefas}
                        setListaItens={setListadeVoluntariosSelecionados}></TabelaDesignarVoluntarios>
                </Row>
               <Row className="alinhando_botao_designar">
                <Button type="submit" className="botao_designar">Gravar Tarefa</Button>
               </Row>
            </Form>
        </div>
    );
}