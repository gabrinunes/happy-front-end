/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';

import '../styles/pages/login.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../images/Logotipo.svg';
import { useAuth } from '../hooks/auth';

export default function Login() {
  const { signIn } = useAuth();

  async function handleLogin(email: any, password: any) {
    await signIn({
      email,
      password,
    });
  }

  return (
    <div id="page-login">
      <aside>
        <img src={logoImg} alt="" />

        <h2>Belém</h2>
        <p>Pará</p>
      </aside>
      <div className="login-form">
        <h2>Fazer login</h2>
        <p>E-mail</p>
        <input type="text" />
        <p>Senha</p>
        <input type="password" />

        <Link to="/" className="icon-back">
          <FiArrowLeft size={22} color="#15C3D6" />
        </Link>

        <div className="login-info">
          <input type="checkbox" id="icon-checkbox" />
          <label className="icon-description">Lembrar-me</label>
          <Link to="/forgotPassword" style={{ textDecoration: 'none' }}>
            <p>Esqueci minha senha</p>
          </Link>
        </div>

        <button
          onClick={() => handleLogin('gn_cunha@hotmail.com', '123456')}
          className="login-button"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
