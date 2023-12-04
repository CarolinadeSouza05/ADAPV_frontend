import { HeaderAdm } from "../../components/HeaderAdm"
import { AsideAdm } from "./AsideAdm";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/index";
import './Estoque.css';
import CaixadeSelecao from "../../components/CaixadeSelecao";
import { handleSubmit, urLBase } from "../../api";


export function Estoque() {
    const [categorias, setCategorias] = useState([]);
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    const [categoriaSelecionada,setCategoraSelecionada] = useState({});
    const [validado, setValidado] = useState(false);
    const [retiradas,setRetiradas]=useState({
        id_retirada :0,
        categoria_codigo:{},
        quantidade_retirada:new Date().toISOString().split('T')[0],
        data_retirada:"",
    })

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

useEffect(() => {
    // Chamada da função para buscar as categorias iniciais
    fetchCategoriasIniciais();
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

    return (
        <div>
            <HeaderAdm h1Text={"Estoque"} classNameRegister={true} />
            <AsideAdm />
            <div className="container_estoque">
                {/* Exibe as categorias e a quantidade total de produtos para cada categoria */}
                {categorias.map((categoria) => (
                    <div key={categoria.id}>
                        <h2>{categoria.nome}</h2>
                        <p>Quantidade Total: {categoria.quantidade_total}</p>
                    </div>
                ))}

                {/* ---------------------------------------------------- */}
                <div>
                    ------------------------------------------------------
                    <form onSubmit={handleSubmit}>
                        <label>Categoria:</label>
                        <CaixadeSelecao
                            url={urLBase + "/security/categoria/" + user.id}
                            campoChave={"id"}
                            campoExibicao={"nome"}
                            funcaoSelecao={setCategoraSelecionada}
                        ></CaixadeSelecao>
                        <label>Quantidade:</label>
                        <input type="number" name="quantidade"/>
                        <button type="submit">Retirada</button>
                    </form>

                </div>
            </div>
        </div>
    )
}