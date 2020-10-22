import React from 'react';

import '../styles/pages/forgot-password.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../images/Logotipo.svg';

export default function ForgotPassword() {
  return (
    <div id="page-reset">
      <aside>
        <img src={logoImg} alt="" />

        <h2>Belém</h2>
        <p>Pará</p>
      </aside>
      <div className="reset-form">
        <h2>Esqueci a Senha</h2>

        <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

        <label>E-mail</label>
        <input type="text" />

        <Link to="/" className="icon-back">
          <FiArrowLeft size={22} color="#15C3D6" />
        </Link>

        <Link to="/resetPassword" className="send-button">
          Entrar
        </Link>
      </div>
    </div>
  );
}
