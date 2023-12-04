import { HeaderAdm } from "../../components/HeaderAdm"
import { AsideAdm } from "./AsideAdm";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/index";
import './Estoque.css';
import CaixadeSelecao from "../../components/CaixadeSelecao";
import { urLBase } from "../../api";
import vetor3 from "../../imagens/vector-3.svg"


export function Estoque() {
    const [categorias, setCategorias] = useState([]);
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    const [categoriaSelecionada, setCategoraSelecionada] = useState({});
    const [validado, setValidado] = useState(false);
    const [retiradas, setRetiradas] = useState({
        id_retirada: 0,
        categoria_codigo: {},
        quantidade_retirada: new Date().toISOString().split('T')[0],
        data_retirada: "",
    })
    const [ultimasRetiradas, setUltimasRetiradas] = useState([]);
    const [ultimasEntradas, setUltimasEntradas] = useState([]);


    // Função para buscar as categorias iniciais
    const fetchCategoriasIniciais = async () => {
        try {
            const response = await fetch(`http://localhost:4000/security/categoria/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                }
            });
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };
    // funções para buscas as ultimas retiradas e entradas
    const fetchUltimasRetiradas = async () => {
        try {
            const response = await fetch(`http://localhost:4000/security/retiradas/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                }
            });
            const data = await response.json();
            setUltimasRetiradas(data);
        } catch (error) {
            console.error('Erro ao buscar últimas retiradas:', error);
        }
    };

    const fetchUltimasEntradas = async () => {
        try {
            const response = await fetch(`http://localhost:4000/security/produto/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                }
            });
            const data = await response.json();
            setUltimasEntradas(data);
        } catch (error) {
            console.error('Erro ao buscar últimas entradas:', error);
        }
    };



    useEffect(() => {
        // Chamada das funções ao carregar a pagina
        fetchCategoriasIniciais();
        fetchUltimasRetiradas();
        fetchUltimasEntradas();
    }, [user.id, user.token]);



    //Lidar com a saida de produtos
    function handleSubmit(evento) {
        const dataAtual = new Date().toISOString().split('T')[0];
        const form = evento.currentTarget;

        if (form.checkValidity()) {
            fetch(urLBase + '/security/retiradas/' + user.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                },
                body: JSON.stringify({
                    'categoria_codigo': categoriaSelecionada.id,
                    'quantidade_retirada': parseInt(form.quantidade.value, 10), // Converte a string para número
                    'data_retirada': dataAtual
                })
            })
                .then((resposta) => resposta.json())
                .then((dados) => {
                    console.log(dados); // Fazer algo com a resposta, se necessário

                    // Após a retirada, atualiza as categorias com um novo GET
                    fetchCategoriasIniciais();
                })
                .catch((erro) => {
                    console.error('Erro na requisição:', erro);
                });
        } else {
            setValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }
    const formatarData = (data) => {
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // Mês é base 0
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
      };
    return (
        <div>
            <HeaderAdm h1Text={"Estoque"} classNameRegister={true} />
            <AsideAdm />
            <div className="container_estoque">
                <div className="cards_do_estoque">
                    {/* Exibe as categorias e a quantidade total de produtos para cada categoria */}
                    {categorias.map((categoria) => (
                        <div key={categoria.id} className="card_estoque">
                            <p>{categoria.nome} <br />Quantidade Total: {categoria.quantidade_total}</p>
                        </div>
                    ))}
                </div>
                
                {/* ---------------------------------------------------- */}


                <div className="formulario_retiradas">

                    <div className="titulo_estoque">
                        <img
                            className="vector vectoranimais"
                            src={vetor3}
                            alt="Vector"
                        />
                        <>
                            Realizar <span className="span1">Retiradas</span>
                        </></div>

                    <form onSubmit={handleSubmit}>

                        <div className="caixa_selecao_estoque">
                            <CaixadeSelecao
                                url={urLBase + "/security/categoria/" + user.id}
                                campoChave={"id"}
                                campoExibicao={"nome"}
                                funcaoSelecao={setCategoraSelecionada}
                            ></CaixadeSelecao></div>
                        <label>Categoria Selecionada:</label>
                        <input placeholder={"Nome"}
                            value={categoriaSelecionada.nome}
                            className="flex-row-item-estoque"
                            disabled={true}></input>
                        <label style={{ marginLeft: "10px" }}>Quantidade:</label>
                        <input type="number" name="quantidade" className="flex-row-item-estoque" />
                        <div className="alinha_botao_estoque">
                            <button type="submit" className="botao_estoque montserrat-bold-concrete-16px">Retirada</button>
                        </div>
                    </form>

                </div>
            </div>
            {/* ---------------------------------------------------- */}
            {/* Tabelas */}
            {/* // Renderização das últimas 3 retiradas */}
            <hr/>
            <div className="tabelas-container_estoque">
                
                {/* // Renderização das últimas 3 entradas */}
                <div className="ultimas_entradas">
                <div className="titulo_estoque_table">
                        <img
                            className="vector vectoranimais"
                            src={vetor3}
                            alt="Vector"
                        />
                        <>
                            Últimas <span className="span1">Entradas</span>
                        </></div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Categoria</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ultimasEntradas.slice().reverse().slice(0, 3).map((produto) => (
                                
                                <tr key={produto.codigo}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>{produto.categoria}</td>
                                    <td>{formatarData(produto.data)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="ultimas_retiradas">
                <div className="titulo_estoque_table">
                        <img
                            className="vector vectoranimais"
                            src={vetor3}
                            alt="Vector"
                        />
                        <>
                            Últimas <span className="span1">Retiradas</span>
                        </></div>
                    <table>
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Quantidade Retirada</th>
                                <th>Data Retirada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ultimasRetiradas.slice().reverse().slice(0, 3).map((retirada) => (
                                <tr key={retirada.id_retirada}>
                                    <td>{retirada.categoria_codigo}</td>
                                    <td>{retirada.quantidade_retirada}</td>
                                    <td>{formatarData(retirada.data_retirada)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                </div>




        </div>
    )
}