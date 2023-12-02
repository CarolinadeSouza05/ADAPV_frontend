import { Cabecalho } from "../components/Cabecalho";
import { Footer } from "../components/Footer";
import { FormRegisterDonation } from "../formularios/FormRegisterDonation";
import "./RegisterDonation.css";
import img_doacao from "../imagens/img-doacao.jpg";

export function RegisterDonation(){
    return(
        <>
            <Cabecalho />
            <main className="main-donation">
                <img src={img_doacao} alt="Imagem Principal Adoção" className="main-donation-img" />

                <section className="container-main cadastros flex-col">
                    <header className="aside-header alinhamento">
                        <img src="/ADAPV_frontend/static/media/vector-3.5db8d58864e31ef14ecca5d93286a2b4.svg" alt="" />
                        <h2>Pet<span>Adote</span></h2>
                    </header>

                    <section className="aside-body">
                        <p>Seja um agente transformador para o <span>bem</span> una-se a nós nesta jornada!</p>

                        <p>Sua contribuição é vital. Ao nos ajudar, você não apenas oferece um lar cheio de amor para animais de estimação necessitados, mas também combate a fome e promove o <span>bem-estar</span> de inúmeras vidas. Juntos, podemos mudar a realidade de centenas de animais, criando um futuro mais esperançoso e acolhedor para todos eles.
                        </p>
                    </section>
                </section>

                <section className="container-main form-cadastro alinhamento">
                    <FormRegisterDonation />
                </section>
            </main>

            <Footer />
        </>
    )
}