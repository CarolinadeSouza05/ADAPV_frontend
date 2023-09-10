import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Telas/Login'
import { Home } from './Telas/Home'
import { CadastroDenuncia } from './Telas/CadastroDenuncia'
import { CadastroPessoa } from './Telas/CadastroPessoa'
import { CadastroVoluntario } from './Telas/CadastroVoluntario'
import { DesignarAtividades } from './Telas/DesignarAtividades'
import LancamentoEntrada from './Telas/LancamentoEntrada'
import Pagpets from './Telas/Pagpets'
import { CadastroAnimal } from './Telas/CadastroAnimal'
import { CadastroProduto } from './Telas/CadastroDeProduto'
import { SobreNos } from './Telas/SobreNos'

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="/cadastro-denuncia" element={<CadastroDenuncia />} />
                <Route path='/cadastro-voluntario' element={<CadastroVoluntario />} />
                <Route path='/cadastro' element={<CadastroPessoa />} />
                <Route path="/designar-voluntario" element={<DesignarAtividades />} />
                <Route path="/lancar-entrada" element={<LancamentoEntrada/>} />
                <Route path='/pets' element={<Pagpets />} />
                <Route path='/cadastro-animal' element={<CadastroAnimal />} />
                <Route path="/cadastro-produto" element={<CadastroProduto />} />
                <Route path="/sobre" element={<SobreNos />} />
            </Routes>
        </BrowserRouter>
    )
}