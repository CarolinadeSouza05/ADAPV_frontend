import { HeaderAdm } from "../../components/HeaderAdm"
import { AsideAdm } from "./AsideAdm";
import { useState, useEffect,useContext } from "react";
import { StoreContext } from "../../context/index";
import './Estoque.css';

export function Estoque() {
    const [categorias, setCategorias] = useState([]);
    const useStore = useContext(StoreContext);
    const { user } = useStore();
    const [categoriaId, setCategoriaId] = useState("");
    const [quantidade, setQuantidade] = useState("");

    //Lidar com a saida de produtos
    const handleRetirada = async () => {
        try {
            // Realize a chamada à nova rota que processa a retirada
            const response = await fetch(`http://localhost:4000/security/categoria/retirada/${categoriaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                },
                body: JSON.stringify({ quantidade }) // Envie a quantidade no corpo da requisição
            });

            const data = await response.json();
            console.log(data); // Trate a resposta conforme necessário
        } catch (error) {
            console.error('Erro ao processar retirada:', error.message);
        }
    };

    //busca a quantidade total de produtos
    useEffect(() => {
        async function fetchCategorias() {
            const response = await fetch('http://localhost:4000/security/categoria/quantidade-total/'+user.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': user.token
                }
            });
            const data = await response.json();
            setCategorias(data);
        }
        fetchCategorias();
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        // Valide os dados do formulário conforme necessário

        // Chame a função de retirada
        handleRetirada();
    };
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

<div>
    {/* formulario para retirada de produtos */}
            <h2>Retirada de Produtos</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Categoria:
                    <input type="text" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} />
                </label>
                <label>
                    Quantidade:
                    <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                </label>
                <button type="submit">Realizar Retirada</button>
            </form>
        </div>
        </div></div>
    )
}