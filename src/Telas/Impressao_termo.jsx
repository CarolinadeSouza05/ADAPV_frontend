
import "./CadastroAdocao.css";
import { Cabecalho } from "../components/Cabecalho.jsx";
import "./Impressao_termo.css";
import vetor3 from '../imagens/vector-3.svg'
import img_impressao from "../imagens/logo_ong_2.png"

export function ImpressaoTermo({ adocao, onClose }) {

    return (
        <>
            <Cabecalho />
            <div className="impressao_termo">
                <div className="titulo_agenda">
                    <img
                        className="vector vectoranimais"
                        src={vetor3}
                        alt="Vector"
                    />
                    <>
                        Termo de adoção <span className="span1">e Responsabilidade</span>
                    </></div>

                <p><br /></p>
                <p>DADOS DO ADOTANTE:</p>
                <p><ul>
                    <li>Nome do adotante: <b>{adocao.adotante}</b></li>
                    <li>CPF: <b>{adocao.cpf}</b></li>
                    <li>Celular: <b>{adocao.celular}</b></li>
                    <li>E-mail: <b>{adocao.email}</b></li>
                    <li>Endereço: <b>{adocao.rua}, {adocao.numero}, {adocao.bairro}, {adocao.cidade}</b>.</li>
                    <li>Concordou com todos os termos abaixo: <b>{adocao.concordou}</b>.</li>
                </ul></p>
                <p>DADOS DO ANIMAL:</p>
                <p><ul>
                    <li>Nome do animal: <b>{adocao.animal.nome}</b></li>
                    <li>Espécie: <b>{adocao.animal.especie}</b></li>
                    <li>Cor da pelagem: <b>{adocao.animal.pelagem}</b></li>
                    <li>Idade: <b>{adocao.animal.idade}</b></li>
                    <li>Sexo: <b>{adocao.animal.genero}</b></li>
                    <li>Porte: <b>{adocao.animal.porte}</b></li>
                    <li>Possui necessidades especiais: <b>{adocao.animal.necessidadesEspeciais}</b></li>
                    <li>Está em dia com as vacinas: <b>{adocao.animal.vacinas}</b></li>
                    <li>Está castrado: <b>{adocao.animal.castrado}</b></li>

                </ul></p>
                <p>Ao adotar o animal acima descrito declaro-me apto para assumir a guarda e a responsabilidade
                    sobre este animal, eximindoo doador de toda e qualquer responsabilidade por quaisquer atos praticados
                    pelo animal a partir desta data.</p>

                <p>Declaro ainda estar cliente de todos os cuidados que este animal exige no que se refere à sua
                    guarda e manutenção, além de conhecer todos os riscos inerentes à espécie e raça no convivo com
                    humanos, estando apto a guarda-lo e vigiá-lo, comprometendo-me a proporcionar boas condições de
                    alojamento e alimentações, assim como, espaço físico que possibilite o animal se exercitar.</p>

                <p>Responsabilizo-me por preservar a saúde e integridade do animal e a submetê-lo aos cuidados médicos
                    veterinários sempre que necessário. Comprometo-me a não transmitir a posse deste animal a outrem
                    sem o conhecimento do doador (ONG ADAPV). Comprometo-me também, a permitir o acesso do doador
                    ao local onde se encontra o animal para averiguação de suas condições.</p>
                <br /><br /><br /><br /><br /><br />
                <p>Tenho conhecimento de que caso seja constatado por parte do doador situação inadequada para o
                    bem-estar do animal,perderei a sua guarda, sem prejuízo das penalidades legais. Comprometo-me ainda
                    em castrar o animal adotado se o doador já não o tiver feito, contribuindo assim para o controle da
                    população de animais domésticos. Comprometo-me a cumprir toda a legislação vigente, municipal,
                    estadual e federal, relativa à posse de animais.</p>

                <p>Declaro-me assim, ciente das normas acima, as quais aceito, assinando o presente termo de
                    Responsabilidade, assumindoplenamente os deveres que dele constam, bem como outros relacionados à
                    posse responsável e que não estejam incluídos neste termo.</p>

                <p>Autorizado em: <b>{adocao.data}</b></p><br />

                <p style={{ textAlign: 'center' }}><b>ABANDONAR OU MALTRATAR ANIMAIS É CRIME<br />
                    LEI 9605/98 ART. 32 – Pena de detenção de 3 meses a 1 ano e multa</b></p>
            
            
            </div>
            <div className="imagem_impressao">
                <img src={img_impressao} style={{ maxWidth: '25%'}}></img>
            </div>
        </>

    )
}