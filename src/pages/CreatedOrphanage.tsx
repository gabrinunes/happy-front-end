import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import '../styles/pages/orphanage-created.css';
import Logo from '../images/ConfirmIcon.svg';
import api from '../services/api';
import { useAuth } from '../hooks/auth';

export default function CreatedOrphanage() {
  const history = useHistory();

  function handleMapPage() {
    history.push('/app');
  }

  return (
    <div className="containerCreated">
      <div className="container-Created-text">
        <h2 className="Created-Alert">Ebaaa!</h2>
        <p className="Created-message">
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <button className="back-button" onClick={handleMapPage}>
          Voltar para o mapa
        </button>
      </div>
      <img src={Logo} alt="" />
    </div>
  );
}
