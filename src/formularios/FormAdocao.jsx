import React from 'react';
import { useEffect, useState } from 'react';
import { urLBase } from '../api/index.js';
import { Form, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function FormAdocao(props) {
    const location = useLocation();
    const [animalSelecionado, setAnimalSelecionado] = useState({});
    const [animais, setAnimais] = useState();
    const [validado, setValidado] = useState(false);
    const [adocao, setAdocao] = useState({
        codAdocao: 0,
        animal: {},
        adotante: "",
        celular: "",
        cpf: "",
        email: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        data: "",
        concordo: false,
        status: false,
    })

    const adocaoInicial = {
        codAdocao: 0,
        animal: {},
        adotante: "",
        celular: "",
        cpf: "",
        email: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        data: "",
        concordo: false,
        status: false,
    };
    const [mostrarModal, setMostrarModal] = useState(false);
    //Mascara celular
    function maskCel(event) {
        var celular = event.target.value;
        celular = celular.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
        celular = celular.replace(/^(\d{2})(\d)/g, "($1) $2"); // Insere o parênteses e o espaço após os dois primeiros dígitos
        celular = celular.replace(/(\d{5})(\d)/, "$1-$2"); // Insere o hífen após os primeiros cinco dígitos
        event.target.value = celular;
    }

    //Mascara CPF
    function maskCPF(event) {
        var cpf = event.target.value;
        cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
        cpf = cpf.replace(/^(\d{3})(\d)/g, "$1.$2"); // Insere o ponto após os três primeiros dígitos
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o ponto após os seis primeiros dígitos
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Insere o hífen no final
        event.target.value = cpf;
    }
    //Recebendo os Dados do banco de dados
    useEffect(() => {
        fetch(urLBase + "/animais", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setAnimais(dados);
            }
            else {

            }
        })
    }, []);


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const animalId = searchParams.get('animalId');

        // Verifica se animais é uma matriz e se animalId está definido
        if (Array.isArray(animais) && animalId) {
            const animalSelecionadoFake = animais.find(animal => String(animal.id) === animalId);
            setAnimalSelecionado(animalSelecionadoFake || {});
        }
    }, [location.search, animais]);

    useEffect(() => {
        setAdocao(props.adocaoEmEdicao);
    }, [props.adocaoEmEdicao]);



    function manupilaAlteracao(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setAdocao({ ...adocao, [id]: valor });
    }

    function handleCheckboxChange(e) {
        const isChecked = e.target.checked;
        setAdocao({ ...adocao, concordo: isChecked });
    }



    function gravarAdocao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                //PUT
                fetch(urLBase + '/adocoes', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "codAdocao": adocao.codAdocao,
                        "animal": animalSelecionado,
                        "adotante": adocao.adotante,
                        "celular": adocao.celular,
                        "cpf": adocao.cpf,
                        "email": adocao.email,
                        "rua": adocao.rua,
                        "numero": adocao.numero,
                        "bairro": adocao.bairro,
                        "cidade": adocao.cidade,
                        "data": adocao.data,
                        "concordo": adocao.concordo,
                        "status": adocao.status
                    })
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        setAdocao(adocaoInicial);
                        setMostrarModal(true);
                        fetch(urLBase + '/adocoes', {
                            method: "GET"
                        })  
                            .then((resposta) => resposta.json())
                            .then((adocaoAtualizado) => {
                                props.setAdocao(adocaoAtualizado);
                                // props.exibirTabela(true);
                            });
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar alteração adocao:" + erro.message);
                });

            }
            else {
                //POST
                fetch(urLBase + "/adocoes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "codAdocao": adocao.codAdocao,
                        "animal": animalSelecionado,
                        "adotante": adocao.adotante,
                        "celular": adocao.celular,
                        "cpf": adocao.cpf,
                        "email": adocao.email,
                        "rua": adocao.rua,
                        "numero": adocao.numero,
                        "bairro": adocao.bairro,
                        "cidade": adocao.cidade,
                        "data": adocao.data,
                        "concordo": adocao.concordo,
                        "status": adocao.status
                    })
                }).then((resposta) => {
                    return (resposta.json())
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        setAdocao(adocaoInicial);
                        // Após o cadastro bem-sucedido, faça uma nova solicitação GET para obter o adocao recém-criado
                        fetch(urLBase + '/adocoes/', {
                            method: "GET"
                        })
                            .then((resposta) => resposta.json())
                            .then((adocaoAtualizado) => {
                                props.setAdocao(adocaoAtualizado);

                                // Atualize animalSelecionado aqui com os detalhes do animal do adocao recém-criado
                                setAnimalSelecionado(adocaoAtualizado.animal);
                            });

                        // let adocoes = [...props.listadeadocoes];
                        // adocoes.push(adocao)
                        // props.setAdocao(adocoes);
                        // // props.exibirTabela(true);
                        // // Atualize animalSelecionado aqui

                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a adocao:" + erro.message);
                });
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }
    return (
        <div>
            <Form className='form-adocao' onSubmit={gravarAdocao}>

                <Form.Group className="mb-3" >
                    <Form.Control
                        hidden
                        type="text"
                        id='codAdocao'
                        name='codAdocao'
                        value={adocao.codAdocao}
                        onChange={manupilaAlteracao} /></Form.Group>

                <Row>

                    <Row className='alinhando_dados_animal'>
                        <Form.Group as={Col} md='2' >
                            <Form.Control
                                type={'text'}
                                name={'especie'}
                                placeholder={'Espécie'}
                                // value={animalSelecionado.especie}
                                value={animalSelecionado ? animalSelecionado.especie : ''}
                                className="flex-row-item_adocao"
                                disabled={true}

                            /></Form.Group>

                        <Form.Group as={Col} md='2' >
                            <Form.Control
                                type={'text'}
                                name={'nome'}
                                placeholder={'Nome'}
                                className="flex-row-item_adocao"
                                value={animalSelecionado ? animalSelecionado.nome : ''}
                                // value={animalSelecionado.nome}
                                disabled={true}

                            /></Form.Group>

                        <Form.Group as={Col} md='2' >
                            <Form.Control
                                type={'text'}
                                name={'genero'}
                                placeholder={'Gênero'}
                                // value={animalSelecionado.genero}
                                value={animalSelecionado ? animalSelecionado.genero : ''}
                                className="flex-row-item_adocao"
                                disabled={true}

                            /></Form.Group>

                        <Form.Group as={Col} md='2' >
                            <Form.Control
                                type={'text'}
                                name={'porte'}
                                placeholder={'Porte'}
                                // value={animalSelecionado.porte}
                                value={animalSelecionado ? animalSelecionado.porte : ''}
                                className="flex-row-item_adocao"
                                disabled={true}

                            /></Form.Group>
                        <Form.Group as={Col} md='2'>
                            {animalSelecionado && animalSelecionado.foto && (
                                <img
                                    src={`data:image;base64,${animalSelecionado.foto}`}
                                    alt={animalSelecionado.nome}
                                    className="imagem-animal"
                                />
                            )}
                        </Form.Group>


                    </Row>
                    <Form.Group as={Col} md={10}  >
                        {/* <Form.Label>Adotante</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            id='adotante'
                            name='adotante'
                            placeholder='Nome do Adotante'
                            className="flex-row-item_adocao"
                            value={adocao.adotante}
                            onChange={manupilaAlteracao} />
                    </Form.Group></Row>
                <Row>
                    <Form.Group as={Col} md={5}   >
                        {/* <Form.Label>Adotante</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            id='celular'
                            name='celular'
                            placeholder='(18)99999-9999'
                            maxLength={15}
                            className="flex-row-item_adocao"
                            onInput={maskCel}
                            value={adocao.celular}
                            onChange={manupilaAlteracao} />
                    </Form.Group>
                    <Form.Group as={Col} md={5}   >
                        {/* <Form.Label>Adotante</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            id='cpf'
                            name='cpf'
                            placeholder='999.999.999-99'
                            maxLength={14}
                            onInput={maskCPF}
                            className="flex-row-item_adocao"
                            value={adocao.cpf}
                            onChange={manupilaAlteracao} />
                    </Form.Group>
                </Row>
                <Form.Group as={Col} md={10}  >
                    {/* <Form.Label>Adotante</Form.Label> */}
                    <Form.Control
                        required
                        type="text"
                        id='email'
                        name='email'
                        placeholder='adapv@gmail.com'
                        className="flex-row-item_adocao"
                        value={adocao.email}
                        onChange={manupilaAlteracao} />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} md={5}   >
                        {/* <Form.Label>Adotante</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            id='rua'
                            name='rua'
                            placeholder='Rua'
                            className="flex-row-item_adocao"
                            value={adocao.rua}
                            onChange={manupilaAlteracao} />
                    </Form.Group>
                    <Form.Group as={Col} md={5}  >
                        {/* <Form.Label>Adotante</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            id='numero'
                            name='numero'
                            placeholder='Nº'
                            className="flex-row-item_adocao"
                            value={adocao.numero}
                            onChange={manupilaAlteracao} />
                    </Form.Group></Row>
                <Row>
                    <Form.Group as={Col} md={5}   >
                        {/* <Form.Label>Adotante</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            id='bairro'
                            name='bairro'
                            placeholder='Bairro'
                            className="flex-row-item_adocao"
                            value={adocao.bairro}
                            onChange={manupilaAlteracao} />
                    </Form.Group>
                    <Form.Group as={Col} md={5}   >
                        {/* <Form.Label>Adotante</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            id='cidade'
                            name='cidade'
                            placeholder='Cidade'
                            className="flex-row-item_adocao"
                            value={adocao.cidade}
                            onChange={manupilaAlteracao} />
                    </Form.Group></Row>
                <Form.Group as={Col} md={10}   >
                    {/* <Form.Label>Adotante</Form.Label> */}
                    <Form.Control
                        required
                        type="date"
                        id='data'
                        name='data'
                        // placeholder='(18)99999-9999'
                        className="flex-row-item_adocao"
                        value={adocao.data}
                        onChange={manupilaAlteracao} />
                </Form.Group>
                <Form.Group as={Col} md={10}  >
                    {/* <Form.Label>Adotante</Form.Label> */}
                    <Form.Check
                        required
                        type="checkbox"
                        id='concordo'
                        name='concordo'
                        // className="flex-row-item_adocao"
                        value={adocao.concordo}
                        onChange={handleCheckboxChange}
                        label={
                            <span>
                                Li e concordo com todos os{' '}
                                <a href="#" onClick={(e) => { e.preventDefault(); props.exibirTermos() }}>
                                    termos
                                </a>.
                            </span>
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control
                        hidden
                        type="text"
                        id='status'
                        name='status'
                        value={adocao.status}
                        onChange={manupilaAlteracao} /></Form.Group>
                <div className='alinhando_botao_adocao'>
                    <button type='button' className='botao_solicitar_adocao montserrat-bold-concrete-16px' >Voltar</button>
                    <button type="submit" className='botao_solicitar_adocao montserrat-bold-concrete-16px'>Solicitar Adoção</button>
                </div> </Form>
                        {/* Modal de Sucesso */}
            <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Parabéns!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Aguarde a sua autorização ser liberada.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

