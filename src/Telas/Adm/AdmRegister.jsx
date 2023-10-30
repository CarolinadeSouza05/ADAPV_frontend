import { Link } from "react-router-dom";
import { HeaderAdm } from "../../components/HeaderAdm";
import adocoes from "../../imagens/adocoes.png";
import cadastro_animal from "../../imagens/cadastro-animal.png";
import cadastro_voluntario from "../../imagens/cadastro-voluntario.png";
import designar_atividades from "../../imagens/designar_atividades.png"
import agendamento from "../../imagens/agendamento.png";
import "./AdmRegister.css";
import { AsideAdm } from "./AsideAdm";

export function AdmRegister(){
    const cards = [
        { id: 1, name: "Cadastro de Voluntários", imageUrl: cadastro_voluntario, path: "/cadastro-voluntario" },
        { id: 2, name: "Cadastro de Animais", imageUrl: cadastro_animal, path: "/cadastro-animal" },
        { id: 3, name: "Adoções", imageUrl: adocoes, path: "/cadastro-adocao" },
        { id: 4, name: "Designar Atividades", imageUrl: designar_atividades, path: "/designar-voluntario" },
        { id: 5, name: "Agendamento", imageUrl: agendamento, path: "/cadastro-agendamento" },
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