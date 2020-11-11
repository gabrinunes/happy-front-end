import React from 'react';
import { FiArrowLeft, FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';
import { useAuth } from '../hooks/auth';
import { useHistory } from 'react-router-dom';

interface SidebarProps {
  showIconsDashboard?: boolean;
}

export default function SideBar({ showIconsDashboard }: SidebarProps) {
  const { signOut, GetListOrphanages, lengthOrphanageInvalid } = useAuth();
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />
      {showIconsDashboard ? (
        <div className="app-sidebar-midle">
          <button
            type="button"
            className="button-dashboard"
            onClick={() => GetListOrphanages(true)}
          >
            <FiMapPin size={18} color="#FFF" />
          </button>
          <button
            type="button"
            className="button-dashboard"
            onClick={() => GetListOrphanages(false)}
          >
            {lengthOrphanageInvalid.length > 0 ? (
              <FiArrowLeft size={18} color="#FFF" />
            ) : (
              <FiAlertCircle size={18} color="#FFF" />
            )}
          </button>
        </div>
      ) : (
        <div />
      )}
      <footer>
        {showIconsDashboard ? (
          <button type="button" onClick={signOut}>
            <FiPower size={24} color="#FFF" />
          </button>
        ) : (
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        )}
      </footer>
    </aside>
  );
}
