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
                <Route path='/adm' element={<Adm />}  />
                <Route path='/animal' element={<CadastroAnimal />} />
                <Route path='/voluntario' element={<RegisterVolunteer />} />
                <Route path='/usuario' element={<RegisterUser />} />
                <Route path="/produto" element={<CadastroProduto />} />
                <Route path="/designar-voluntario" element={<CadastroDesignar />} />
                <Route path='/adocao' element={<CadastroAdocao />} />
                <Route path='/agendamento' element={<CadastroAgendamento />} />
                <Route path="/categoria" element={<CadastroCategoria />} />
                <Route path="/aceitafazer" element={<RegisterAcceptToDo />} />
                <Route path="/adm/relatorio/geral" element={<BulletinAll />} />
                <Route path="/impressao_termo" element={<ImpressaoTermo />} />
                <Route path="/autorizar-adocao" element={<AutorizarAdocao />} />
            </Routes>
        </BrowserRouter>
    )
}
