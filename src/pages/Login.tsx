import React from 'react'

import '../styles/pages/login.css';
import logoImg from '../images/Logotipo.svg'


export default function Login(){
    return(
        <div id='page-login'>
         
            <aside>
             <img src={logoImg} alt=""/> 
             
             <h2>Belém</h2>
             <p>Pará</p> 

             </aside>

             <div className='login-form'>
               <h2>Fazer login</h2>
              
             </div>
        </div>
    )
}