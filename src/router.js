import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Telas/Login'
import { Home } from './Telas/Home'
import { CadastroDenuncia } from './Telas/CadastroDenuncia'

// import { CadastroVoluntario } from './Telas/RegisterVolunteer'
import {CadastroDesignar} from './Telas/CadastroDesignar'
import LancamentoEntrada from './Telas/LancamentoEntrada'
import Pagpets from './Telas/Pagpets'
import { CadastroAnimal } from './Telas/CadastroAnimal'
import { CadastroProduto } from './Telas/CadastroDeProduto'
import { SobreNos } from './Telas/SobreNos'
import {CadastroCategoria} from './Telas/CadastroDeCategoria';
import {CadastroAdocao} from './Telas/CadastroAdocao';
import {CadastroAgendamento} from './Telas/CadastroAgendamento'
import {RegisterDonation} from './Telas/RegisterDonation';

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="/cadastro-denuncia" element={<CadastroDenuncia />} />
                {/* <Route path='/cadastro-voluntario' element={<CadastroVoluntario />} /> */}
                <Route path="cadastro-categoria" element={<CadastroCategoria />} />               
                <Route path="/designar-voluntario" element={<CadastroDesignar />} />
                <Route path="/lancar-entrada" element={<LancamentoEntrada/>} />
                <Route path='/pets' element={<Pagpets />} />
                <Route path='/cadastro-animal' element={<CadastroAnimal />} />
                <Route path="/cadastro-produto" element={<CadastroProduto />} />
                <Route path="/sobre" element={<SobreNos />} />
                <Route path='/cadastro-adocao' element={<CadastroAdocao />} />
                <Route path='/cadastro-agendamento' element={<CadastroAgendamento />} />
                <Route path='/doacao' element={<RegisterDonation />} />
            </Routes>
        </BrowserRouter>
    )
}