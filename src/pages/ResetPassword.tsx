import React from 'react'

import '../styles/pages/forgot-password.css';
import logoImg from '../images/Logotipo.svg'
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'


export default function ForgotPassword(){
    return(
        <div id='page-reset'>
         
            <aside>
             <img src={logoImg} alt=""/> 
             
             <h2>Belém</h2>
             <p>Pará</p>

             </aside>
             <div className='reset-form'>
               <h2>Redefinição de Senha</h2>
               
               <p>Escolha uma nova senha para você
                 acessar o dashboard do Happy</p>

               <label>Nova Senha</label>
               <input type="text"/>

               <label>Repetir Senha</label>
               <input type="text"/>

               <Link to="/forgotPassword" className="icon-back">
                 <FiArrowLeft size={22} color="#15C3D6"/>
               </Link>

                 <button  className="send-button">
                   Entrar
                 </button>
             </div>
        </div>
    )
}