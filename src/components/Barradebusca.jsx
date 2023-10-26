import React, { useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import './Barradebusca.css'

//caixa onde o usuário pode buscar o cadastro de outros registros para usar no preenchimento do seu formulário
export default function Barradebusca({ placeholder, dados, campoChave, campoBusca, funcaoSelecao, valor }) {

    const inputBusca = useRef();
    const [termoBusca, setTermoBusca] = useState(valor ? valor : "");
    const [dadosLista, setDadosLista] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(false);
    const [validadePersonalizada, setValidadePersonalizada] = useState("");


    // Filtrar os dados baseados no termo de busca
    function filtrarResultado() {
        setDadosLista(dados.filter((item) => {
            return termoBusca.length >= 1 ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase()) : false
        }))
    }

    return (
        <div>
            <div className="barrabusca">
                <FaSearch />
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    value={termoBusca}
                    onChange={e => {
                        setTermoBusca(e.target.value.toLowerCase());
                        filtrarResultado();
                        if (!itemSelecionado) {
                            setValidadePersonalizada('Por favor, selecione um item da lista.');
                        } else {
                            setValidadePersonalizada("");
                        }
                    }}
                    onInvalid={e => setValidadePersonalizada('Por favor, selecione um item da lista.')}
                    required
                    ref={inputBusca}
                    aria-invalid={validadePersonalizada !== ""}
                    aria-describedby={validadePersonalizada !== "" ? "error-msg" : ""}
                />
                <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                        onClick={() => {
                            setTermoBusca("");
                            setDadosLista(dados);
                            setItemSelecionado(false);
                            setValidadePersonalizada("Por favor, selecione um item da lista.");
                            inputBusca.current.focus();
                            // setTermoBusca("");
                            filtrarResultado();
                            // setItemSelecionado(false);
                            // funcaoSelecao({});
                            inputBusca.current.setAttribute('aria-invalid', true);
                            inputBusca.current.setCustomValidity('Erro');
                        }}
                    /></svg>
            </div>

            <div className="resultado" style={{ display: dadosLista.length > 0 ? 'block' : 'none' }}>
                <ul data-resultado>
                    {dadosLista.map((item) => {
                        return <li key={item[campoChave]}
                            onClick={() => {
                                setTermoBusca(item[campoBusca]);
                                setItemSelecionado(true);
                                funcaoSelecao(item);
                                inputBusca.current.setCustomValidity("");
                                let componenteResultado = document.querySelector('[data-resultado]');
                                componenteResultado.style.display = 'none';
                            }}>
                            {
                                item[campoChave] + ' - ' + item[campoBusca]
                            }

                        </li>
                    })

                    }
                </ul>
            </div>
        </div>
    );
}
