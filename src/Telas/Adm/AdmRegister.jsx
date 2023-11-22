import { Link } from "react-router-dom";
import { HeaderAdm } from "../../components/HeaderAdm";
import adocoes from "../../imagens/adocoes.png";
import agendamento from "../../imagens/agendamento.png";
import cadastro_aceitafazer from "../../imagens/cadastro-aceitafazer.png";
import cadastro_animal from "../../imagens/cadastro-animal.png";
import cadastro_categoria from "../../imagens/cadastro-categoria.png";
import cadastro_produto from "../../imagens/cadastro-produto.png";
import cadastro_usuario from "../../imagens/cadastro-usuario.png";
import cadastro_voluntario from "../../imagens/cadastro-voluntario.png";
import designar_atividades from "../../imagens/designar-atividades.png";
import "./AdmRegister.css";
import { AsideAdm } from "./AsideAdm";

export function AdmRegister(){
    const cards = [
        { id: 1, name: "Cadastro de Voluntários", imageUrl: cadastro_voluntario, path: "/adm/cadastro/voluntario" },
        { id: 2, name: "Cadastro de Aceita Fazer", imageUrl: cadastro_aceitafazer, path: "/adm/cadastro/aceitafazer" },
        { id: 3, name: "Cadastro de Usuário", imageUrl: cadastro_usuario, path: "/adm/cadastro/usuario" },
        { id: 4, name: "Cadastro de Produtos", imageUrl: cadastro_produto, path: "/adm/cadastro/produto" },
        { id: 5, name: "Cadastro de Categoria", imageUrl: cadastro_categoria, path: "/adm/cadastro/categoria" },
        { id: 6, name: "Cadastro de Animais", imageUrl: cadastro_animal, path: "/adm/cadastro/animal" },
        { id: 7, name: "Adoções", imageUrl: adocoes, path: "/adm/cadastro/adocao" },
        { id: 8, name: "Designar Atividades", imageUrl: designar_atividades, path: "/adm/cadastro/designar-voluntario" },
        { id: 9, name: "Agendamento", imageUrl: agendamento, path: "/adm/cadastro/agendamento" },
    ];

    return(
        <main className="container-main-adm">
            <AsideAdm />

            <section className="container-adm adm-register">
                <HeaderAdm h1Text={"Dashboard"} />

                <div className="card-container">
                    {cards.map((card) => (
                        <Link key={card.id} className="card-register" to={card.path}>
                            <img src={card.imageUrl} alt={card.name} />
                            <p>{card.name}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}