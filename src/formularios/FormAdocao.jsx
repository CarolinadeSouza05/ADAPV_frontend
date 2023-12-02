import React from 'react';
import { useEffect, useState, useContext  } from 'react';
import { urLBase } from '../api/index.js';
import { Form, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import baixar from "../imagens/baixar.png";
import Tooltip from '@material-ui/core/Tooltip'; 
import { StoreContext } from "../context/index.jsx";


export default function FormAdocao(props) {
    const useStore = useContext(StoreContext);
    const { user } = useStore();
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
        data: new Date().toISOString().split('T')[0],
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
        fetch(`${urLBase}/security/adocoes/${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": user.token,
            },
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
        const dataAtual = new Date().toISOString().split('T')[0];
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                //PUT
                fetch(urLBase + '/adocoes', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "token": user.token,
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
                        "data": adocao.data || dataAtual,
                        "concordo": adocao.concordo,
                        "status": adocao.status
                    })
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        setAdocao(adocaoInicial);
                        fetch(urLBase + '/adocoes', {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "token": user.token,
                            },
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
                        "Content-Type": "application/json",
                        "token": user.token,
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
                        "data": adocao.data || dataAtual,
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
                        fetch(`${urLBase}/security/adocoes/${user.id}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "token": user.token,
                            },
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
                
                <Tooltip title="Código da adoção (oculto)" placement="top">
                    
                        <Form.Group className="mb-3">
                            <Form.Control
                                hidden
                                type="text"
                                id='codAdocao'
                                name='codAdocao'
                                value={adocao.codAdocao}
                                onChange={manupilaAlteracao} />
                        </Form.Group>
        
                </Tooltip>

                <Row className='alinhando_dados_animal'>

                    <Tooltip title="Espécie do animal" placement="top">
                        
                            <Form.Group as={Col} md='2'>
                                <Form.Control
                                    type={'text'}
                                    name={'especie'}
                                    placeholder={'Espécie'}
                                    value={animalSelecionado ? animalSelecionado.especie : ''}
                                    className="flex-row-item_adocao"
                                    disabled={true}
                                />
                            </Form.Group>
            
                    </Tooltip>

                    <Tooltip title="Nome do animal" placement="top">
                        
                            <Form.Group as={Col} md='2'>
                                <Form.Control
                                    type={'text'}
                                    name={'nome'}
                                    placeholder={'Nome'}
                                    className="flex-row-item_adocao"
                                    value={animalSelecionado ? animalSelecionado.nome : ''}
                                    disabled={true}
                                />
                            </Form.Group>
            
                    </Tooltip>

                    <Tooltip title="Gênero do animal" placement="top">
                        
                            <Form.Group as={Col} md='2'>
                                <Form.Control
                                    type={'text'}
                                    name={'genero'}
                                    placeholder={'Gênero'}
                                     // value={animalSelecionado.genero}
                                value={animalSelecionado ? animalSelecionado.genero : ''}
                                    className="flex-row-item_adocao"
                                    disabled={true}
                                />
                            </Form.Group>
            
                    </Tooltip>

                    <Tooltip title="Porte do animal" placement="top">
                        
                            <Form.Group as={Col} md='2'>
                                <Form.Control
                                    type={'text'}
                                    name={'porte'}
                                    placeholder={'Porte'}
                                                // value={animalSelecionado.porte}
                                value={animalSelecionado ? animalSelecionado.porte : ''}
                                    className="flex-row-item_adocao"
                                    disabled={true}
                                />
                            </Form.Group>
            
                    </Tooltip>

                    {/* Imagem do animal não necessita de tooltip pois não é um campo interativo */}
                    
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

                <Tooltip title="Nome do adotante" placement="top">
                    
                        <Form.Group as={Col} md={10}>
                            <Form.Control
                                required
                                type="text"
                                id='adotante'
                                name='adotante'
                                placeholder='Nome do Adotante'
                                className="flex-row-item_adocao"
                                value={adocao.adotante}
                                onChange={manupilaAlteracao}
                            />
                        </Form.Group>
        
                </Tooltip>

                <Row>

                    <Tooltip title="Número de celular do adotante" placement="top">
                        
                            <Form.Group as={Col} md={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    id='celular'
                                    name='celular'
                                    placeholder='(XX) XXXXX-XXXX'
                                    maxLength={15}
                                    onInput={maskCel}
                                    className="flex-row-item_adocao"
                                    value={adocao.celular}
                                    onChange={manupilaAlteracao}
                                />
                            </Form.Group>
            
                    </Tooltip>

                    <Tooltip title="CPF do adotante" placement="top">
                        
                            <Form.Group as={Col} md={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    id='cpf'
                                    name='cpf'
                                    placeholder='XXX.XXX.XXX-XX'
                                    maxLength={14}
                                    onInput={maskCPF}
                                    className="flex-row-item_adocao"
                                    value={adocao.cpf}
                                    onChange={manupilaAlteracao}
                                />
                            </Form.Group>
            
                    </Tooltip>

                </Row>


                <Tooltip title="E-mail do adotante" placement="top">
                    
                        <Form.Group as={Col} md={10}>
                            <Form.Control
                                required
                                type="text"
                                id='email'
                                name='email'
                                placeholder='exemplo@gmail.com'
                                className="flex-row-item_adocao"
                                value={adocao.email}
                                onChange={manupilaAlteracao}
                            />
                        </Form.Group>
        
                </Tooltip>

                <Row>

                    <Tooltip title="Endereço de residência do adotante" placement="top">
                        
                            <Form.Group as={Col} md={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    id='rua'
                                    name='rua'
                                    placeholder='Rua'
                                    className="flex-row-item_adocao"
                                    value={adocao.rua}
                                    onChange={manupilaAlteracao}
                                />
                            </Form.Group>
            
                    </Tooltip>


                    <Tooltip title="Número da residência do adotante" placement="top">
                        
                            <Form.Group as={Col} md={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    id='numero'
                                    name='numero'
                                    placeholder='Número'
                                    className="flex-row-item_adocao"
                                    value={adocao.numero}
                                    onChange={manupilaAlteracao}
                                />
                            </Form.Group>
            
                    </Tooltip>

                </Row>

                <Row>

                    <Tooltip title="Bairro de residência do adotante" placement="top">
                        
                            <Form.Group as={Col} md={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    id='bairro'
                                    name='bairro'
                                    placeholder='Bairro'
                                    className="flex-row-item_adocao"
                                    value={adocao.bairro}
                                    onChange={manupilaAlteracao}
                                />
                            </Form.Group>
            
                    </Tooltip>

                    <Tooltip title="Cidade de residência do adotante" placement="top">
                        
                            <Form.Group as={Col} md={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    id='cidade'
                                    name='cidade'
                                    placeholder='Cidade'
                                    className="flex-row-item_adocao"
                                    value={adocao.cidade}
                                    onChange={manupilaAlteracao}
                                />
                            </Form.Group>
            
                    </Tooltip>

                </Row>

                <Tooltip title="Data da adoção" placement="top">
                    
                <Form.Group as={Col} md={10}>
                    <Form.Control
                        hidden
                        type="date"
                        id='data'
                        name='data'
                        className="flex-row-item_adocao"
                        value={adocao.data}
                        onChange={manupilaAlteracao}
                         // Impede que o usuário altere a data
                    />
                </Form.Group>
        
                </Tooltip>

                <Tooltip title="Concordo com os termos de adoção" placement="top">
                    
                        <Form.Group as={Col} md={10}>
                            <Form.Check
                                required
                                type="checkbox"
                                id='concordo'
                                name='concordo'
                                value={adocao.concordo}
                                onChange={handleCheckboxChange}
                                label={
                                    <span>
                                        Li e concordo com todos os 
                                        <a href="#" style={{marginLeft: '5px'}}onClick={(e) => { e.preventDefault(); props.exibirTermos() }}>
                                            termos
                                        </a>.
                                    </span>
                                }
                            />
                        </Form.Group>
        
                </Tooltip>

                <Tooltip title="Status da adoção (oculto)" placement="top">
                    
                        <Form.Group className="mb-3">
                            <Form.Control
                                hidden
                                type="text"
                                id='status'
                                name='status'
                                value={adocao.status}
                                onChange={manupilaAlteracao} />
                        </Form.Group>
        
                </Tooltip>

                {/* Área para os botões e download do manual, sem Tooltips */}
                <div className='alinhando_botao_adocao'>
                    <button type='button' className='botao_solicitar_adocao montserrat-bold-concrete-16px'>Voltar</button>
                    <button type="submit" className='botao_solicitar_adocao montserrat-bold-concrete-16px'>Solicitar Adoção</button>
                </div>
                
                <div>
                    <a href='/manuais/manual_adocao.pdf' download="manual_adocao.pdf">
                        <img
                            className="vectorbaixar"
                            src={baixar}
                            alt="Baixar"
                        />
                        Manual do Usuário
                    </a>
                </div>

            </Form>
        </div>
    );
}

