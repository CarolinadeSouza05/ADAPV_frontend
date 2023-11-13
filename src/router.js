import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CadastroDenuncia } from './Telas/CadastroDenuncia'
import { Home } from './Telas/Home'
import { Login } from './Telas/Login'

import { Adm } from './Telas/Adm'
import { AdmRegister } from './Telas/Adm/AdmRegister'
import { CadastroAdocao } from './Telas/CadastroAdocao'
import { CadastroAgendamento } from './Telas/CadastroAgendamento'
import { CadastroAnimal } from './Telas/CadastroAnimal'
import { CadastroCategoria } from './Telas/CadastroDeCategoria'
import { CadastroProduto } from './Telas/CadastroDeProduto'
import { CadastroDesignar } from './Telas/CadastroDesignar'
import { RegisterOffice } from "./Telas/RegisterOffice";
import { RegisterAcceptToDo } from "./Telas/RegisterAcceptToDo";
import LancamentoEntrada from './Telas/LancamentoEntrada'
import Pagpets from './Telas/Pagpets'
import { RegisterDonation } from './Telas/RegisterDonation'
import { RegisterVolunteer } from "./Telas/RegisterVolunteer"
import { SobreNos } from './Telas/SobreNos'
import { RegisterUser } from './Telas/RegisterUser'

export function Router(){
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
                <Route path='/adm/cadastro' element={<AdmRegister />}  />
                <Route path='/adm/cadastro/animal' element={<CadastroAnimal />} />
                <Route path='/adm/cadastro/voluntario' element={<RegisterVolunteer />} />
                <Route path='/adm/cadastro/usuario' element={<RegisterUser />} />
                <Route path="/adm/cadastro/produto" element={<CadastroProduto />} />
                <Route path="/adm/cadastro/designar-voluntario" element={<CadastroDesignar />} />
                <Route path='/adm/cadastro/adocao' element={<CadastroAdocao />} />
                <Route path='/adm/cadastro/agendamento' element={<CadastroAgendamento />} />
                <Route path="/adm/cadastro/categoria" element={<CadastroCategoria />} />
                <Route path="/adm/cadastro/cargo" element={<RegisterOffice />} />
                <Route path="/adm/cadastro/aceitafazer" element={<RegisterAcceptToDo />} />
            </Routes>
        </BrowserRouter>
    )
}
