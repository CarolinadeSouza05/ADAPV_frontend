import { Cabecalho } from '../components/Cabecalho'
import { Footer } from '../components/Footer'
import './Home.css'
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-bootstrap';
import image_home from "../imagens/img_home.png"
import { StoreContext } from '../context';
import { useContext } from 'react';

export function Home() {
    const useStore = useContext(StoreContext);
    const { user } = useStore();

    console.log(user);

    return (
        <>
            <Cabecalho />
            <main className='main-home'>
                <div className='text_home_left'>
                    <div className='span1_home title_home'>Procurando por um novo companheiro peludo?</div><br/>
                    <div className='span2_home subtitle_home'> Que tal adotar um pet?</div>
                    <div className='texto_home'>O nosso sistema de adoção de pets é a solução perfeita para encontrar o seu amigo de quatro patas.
                        <br/><br/>Com uma ampla seleção de cães e gatos de todas as idades e raças, você certamente encontrará o seu par ideal.</div><br/>
                    <div class="botoes_home">
                        <LinkContainer to="/pets"><NavLink><button type="button" class="botao_home1 montserrat-bold-concrete-16px">Adote um Pet</button></NavLink></LinkContainer>
                        <LinkContainer to="/doacao"><NavLink><button type="button" class="botao_home2" >Faça uma doação</button></NavLink></LinkContainer>
                    </div>
                </div>
                <div className='text_home_right'>
                    <img src={image_home} alt="" className='img_home'/>
                </div>
            </main>
            <Footer />
        </>
    )
}