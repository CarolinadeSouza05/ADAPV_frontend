import React from 'react';
import { useEffect, useState } from 'react';
import { urLBase } from '../api/index.js';
import Barradebusca from '../components/Barradebusca';

export default function FormAdocao(props) {
    const [animalSelecionado, setAnimalSelecionado] = useState({});
    const [animais, setAnimais] = useState();
    const [validado, setValidado] = useState(false);
    const [adocao, setAdocao] = useState({
        codAdocao: 0,
        animal: {},
        adotante: "",
        data: "",
    })

    useEffect(() => {
        setAdocao(props.adocaoEmEdicao);
    }, [props.adocaoEmEdicao]);

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

    function manupilaAlteracao(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setAdocao({ ...adocao, [id]: valor });
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
                        "data": adocao.data
                    })
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
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
                        "data": adocao.data,
                    })
                }).then((resposta) => {
                    return (resposta.json())
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);

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
            <form className='form_agenda'
                onSubmit={gravarAdocao}
                noValidate
                validated={validado}>
                <input
                    type="text"
                    id="codAdocao"
                    name="codAdocao"
                    value={adocao.codAdocao}
                    onChange={manupilaAlteracao}
                    hidden
                />
                <div>
                    <Barradebusca
                        placeHolder={'Informe o animal'}
                        dados={animais}
                        campoChave={"id"}
                        campoBusca={"nome"}
                        funcaoSelecao={setAnimalSelecionado}
                    ></Barradebusca>
                </div>
                <div >
                    <label htmlFor="adotante" className="montserrat-bold-cod-gray-12px">Adotante:</label>
                    <input
                        type="text"
                        id="adotante"
                        name="adotante"
                        value={adocao.adotante}
                        onChange={manupilaAlteracao}
                        className="flex-row-item "
                        required
                    />
                </div>
                <div>
                    <label htmlFor="data" className="montserrat-bold-cod-gray-12px">Data:</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        value={adocao.data}
                        onChange={manupilaAlteracao}
                        className="flex-row-item"
                        required
                    />
                </div>
                <div className='alinha_button'>
                    <button type="submit" className='botao_agendar montserrat-bold-concrete-16px'>{props.modoEdicao ? "Alterar" : "Adotado"}</button></div>
            </form>
        </div>
    );
}

