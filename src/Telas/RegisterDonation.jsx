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
                        <p>Lidere a mudança para o <span>bem</span>, Junte-se a nós!</p>

                        <p>Ajude nós a encontrar lares amorosos e até combater a fome e apoiar o <span>bem-estar</span>, 
                            sua doação muda a história de milhões de animais de estimação e suas famílias.
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