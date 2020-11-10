import React, { useEffect, useState } from 'react';

import '../styles/pages/delete-page.css';

import { useParams, useHistory } from 'react-router-dom';
import Logo from '../images/DeleteLogo.svg';
import api from '../services/api';
import { useAuth } from '../hooks/auth';

interface OrphanageParams {
  id: string;
}

interface Orphanage {
  name: string;
}

export default function DeletePage() {
  const params = useParams<OrphanageParams>();
  const { goBack, push } = useHistory();
  const { DeleteOrphanage } = useAuth();
  const [orphanage, SetOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      SetOrphanage(response.data);
    });
  });

  function HandleDeleteOrphanage(id: string) {
    DeleteOrphanage(id);
    push('/dashboard');
  }

  if (!orphanage) {
    return <div />;
  }

  return (
    <div className="container">
      <div className="container-text">
        <h1 className="Delete-Alert">Excluir!</h1>
        <span className="Delete-message">
          {`voce tem certeza que quer Excluir? ${orphanage.name}`}
        </span>
        <div className="button-container">
          <button
            className="delete-button"
            type="submit"
            onClick={() => HandleDeleteOrphanage(params.id)}
          >
            Sim
          </button>
          <button className="delete-button" type="submit" onClick={goBack}>
            Não
          </button>
        </div>
      </div>
      <img className="image-logo" src={Logo} alt="" />
    </div>
  );
}
