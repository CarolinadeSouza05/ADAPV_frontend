import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CadastroDenuncia } from './Telas/CadastroDenuncia'
import { Home } from './Telas/Home'
import { Login } from './Telas/Login'

import { Admin } from './Telas/Admin'
import LancamentoEntrada from './Telas/LancamentoEntrada'
import Pagpets from './Telas/Pagpets'
import { SobreNos } from './Telas/SobreNos'

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
                <Route path="/admin" element={<Admin />}/>
            </Routes>
        </BrowserRouter>
    )
}
