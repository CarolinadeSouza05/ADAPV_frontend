import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CadastroDenuncia } from './Telas/TelaDenuncia'
import { Home } from './Telas/Home'
import { Login } from './Telas/Login'

import { Adm } from './Telas/Adm'
import { CadastroAdocao } from './Telas/CadastroAdocao'
import { CadastroAgendamento } from './Telas/CadastroAgendamento'
import { CadastroAnimal } from './Telas/CadastroAnimal'
import { CadastroCategoria } from './Telas/CadastroDeCategoria'
import { CadastroProduto } from './Telas/CadastroDeProduto'
import { CadastroDesignar } from './Telas/CadastroDesignar'
import { RegisterAcceptToDo } from "./Telas/RegisterAcceptToDo";
import LancamentoEntrada from './Telas/LancamentoEntrada'
import Pagpets from './Telas/Pagpets'
import { RegisterDonation } from './Telas/RegisterDonation'
import { RegisterVolunteer } from "./Telas/RegisterVolunteer"
import { SobreNos } from './Telas/SobreNos'
import { RegisterUser } from './Telas/RegisterUser'
import { StoreContext } from './context'
import { BulletinAll } from './Telas/Adm/BulletinAll'
import {AutorizarAdocao} from './Telas/AutorizarAdocao'
import { ImpressaoTermo } from './Telas/Impressao_termo'
import { Caixa } from './Telas/Adm/Caixa'
import { VolunteerAdm } from './Telas/VolunteerAdm'

export function Router(){
    const useStore = useContext(StoreContext);
    const { user } = useStore();

    useEffect(() => {
        if(window.location.pathname.includes("/adm") && user.role !== "ADMIN"){
            window.location.href = "/";
        }
    }, []);

    return(
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="/cadastro-denuncia" element={<CadastroDenuncia />} />
                <Route path="/lancar-entrada" element={<LancamentoEntrada/>} />
                <Route path='/pets' element={<Pagpets />} />
                <Route path="/sobre" element={<SobreNos />} />
                <Route path='/doacao' element={<RegisterDonation />} />
                <Route path='/cadastro-voluntario' element={<RegisterVolunteer />} />
                <Route path='/adm' element={<Adm />}  />
                <Route path='/adm/cadastro/animal' element={<CadastroAnimal />} />
                <Route path='/adm/cadastro/voluntario' element={<VolunteerAdm />} />
                <Route path='/adm/cadastro/usuario' element={<RegisterUser />} />
                <Route path="/adm/cadastro/produto" element={<CadastroProduto />} />
                <Route path="/adm/cadastro/designar-voluntario" element={<CadastroDesignar />} />
                <Route path='/adocao' element={<CadastroAdocao />} />
                <Route path='/adm/cadastro/agendamento' element={<CadastroAgendamento />} />
                <Route path="/adm/cadastro/categoria" element={<CadastroCategoria />} />
                <Route path="/adm/cadastro/aceitafazer" element={<RegisterAcceptToDo />} />
                <Route path="/adm/relatorio/geral" element={<BulletinAll />} />
                <Route path="/impressao_termo" element={<ImpressaoTermo />} />
                <Route path="/adm/autorizar-adocao" element={<AutorizarAdocao />} />
                <Route path="/adm/caixa" element={<Caixa />} />
            </Routes>
        </BrowserRouter>
    )
}
