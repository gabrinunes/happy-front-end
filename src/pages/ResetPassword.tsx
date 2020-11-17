import React, { useState } from 'react';

import '../styles/pages/forgot-password.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import logoImg from '../images/Logotipo.svg';
import api from '../services/api';

interface OrphanageParams {
  id: string;
}

export default function ForgotPassword() {
  const params = useParams<OrphanageParams>();
  const history = useHistory();
  const [showEye, SetShowEye] = useState(true);
  const [inputPassword, SetInputPassword] = useState<string>();
  const [showEyeConfirmation, SetShowEyeConfirmation] = useState(true);
  const [type, SetType] = useState('password');
  const [typeConfirmation, SetTypeConfirmation] = useState('password');

  function showPasswordField(event: any) {
    SetShowEye(false);
    SetType('text');
    console.log(event.type);
  }

  function NotshowPasswordField() {
    SetShowEye(true);
    SetType('password');
    console.log(showEye);
  }

  function showPasswordConfirmationField(event: any) {
    SetShowEyeConfirmation(false);
    SetTypeConfirmation('text');
    console.log(event.type);
  }

  function NotshowPasswordConfirmationField() {
    SetShowEyeConfirmation(true);
    SetTypeConfirmation('password');
    console.log(showEye);
  }

  async function HandleResetPassword() {
    try {
      api.post(`users/ResetPassword/${params.id}`, {
        newPassword: inputPassword,
      });
      alert('senha resetada com sucesso!!!!');
      history.push('/');
    } catch (error) {
      alert('erro ao resetar senha!!!');
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
        <h2>Redefinição de Senha</h2>

        <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>

        <label>Nova Senha</label>
        {showEye ? (
          <FiEyeOff
            size={16}
            color="#15C3D6"
            onClick={showPasswordField}
            className="eye"
          />
        ) : (
          <FiEye
            size={16}
            color="#15c3d6"
            onClick={NotshowPasswordField}
            className="eye"
          />
        )}
        <input
          type={type}
          value={inputPassword}
          onChange={e => SetInputPassword(e.target.value)}
        />

        <label>Repetir Senha</label>
        {showEyeConfirmation ? (
          <FiEyeOff
            size={16}
            color="#15C3D6"
            onClick={showPasswordConfirmationField}
            className="eye-repeat"
          />
        ) : (
          <FiEye
            size={16}
            color="#15c3d6"
            onClick={NotshowPasswordConfirmationField}
            className="eye-repeat"
          />
        )}
        <input type={typeConfirmation} />

        <Link to="/forgotPassword" className="icon-back">
          <FiArrowLeft size={22} color="#15C3D6" />
        </Link>

        <button className="send-button" onClick={HandleResetPassword}>
          Entrar
        </button>
      </div>
    </div>
  );
}
