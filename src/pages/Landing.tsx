import React, { useEffect } from 'react';

import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../images/Logo.svg';
import '../styles/pages/landing.css';
import { useGeoLocation } from '../hooks/geolocation';

function Landing() {
  const { getLocation, location } = useGeoLocation();

  useEffect(() => {
    getLocation();
  }, []);

  if (!location) {
    return <div />;
  }

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>{location.cidade}</strong>
          <span>{location.estado}</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>

        <Link to="/login" className="enter-dashboard">
          <strong>Acesso Restrito</strong>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
