import React, { useState } from 'react';

import '../styles/pages/forgot-password.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../images/Logotipo.svg';
import api from '../services/api';

export default function ForgotPassword() {
  const [email, SetEmail] = useState<string>();

  async function HandleSendEmail() {
    try {
      await api.post('users/ForgotPassword', {
        email,
      });
      alert('email enviado com sucesso!!!');
    } catch (error) {
      alert('email nao enviado');
      console.log(email);
    }
  }
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
        <input
          type="text"
          value={email}
          onChange={e => SetEmail(e.target.value)}
        />

        <Link to="/" className="icon-back">
          <FiArrowLeft size={22} color="#15C3D6" />
        </Link>

        <button onClick={HandleSendEmail} className="send-button">
          Entrar
        </button>
      </div>
    </div>
  );
}
