import React from 'react';
import mapMarkerImg from '../images/map-marker.svg';

import { FiArrowLeft } from 'react-icons/fi';

import '../styles/components/sidebar.css';
import { useHistory } from 'react-router-dom';

interface SidebarProps {
  showIconsDashboard?: boolean;
}

export default function SideBar({ showIconsDashboard }: SidebarProps) {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />
      {showIconsDashboard ? (
        <div className="app-sidebar-midle">
          <FiArrowLeft size={24} color="#FFF" />
          <FiArrowLeft size={24} color="#FFF" />
        </div>
      ) : (
        <div />
      )}
      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
