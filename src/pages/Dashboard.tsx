/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiTrash, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SideBar from '../components/Sidebar';

import '../styles/pages/dashboard.css';

export default function Dashboard() {
  return (
    <div>
      <SideBar showIconsDashboard />
      <div className="dashboard-content">
        <h2 className="header-title">Orfanatos Cadastrados</h2>
        <div className="orphanage-content">
          <div className="orphanage-card">
            <Map
              center={[-1.4423929, -48.4838452]}
              zoom={14}
              style={{ width: '100%', height: '80%' }}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </Map>
            <div className="orphanage-info">
              <h2 className="orphanage-info-name">Orfanato esperança</h2>
              <div className="orphanage-icons">
                <Link to="orphanages/edit/1">
                  <FiEdit size={14} color="#15C3D6" />
                </Link>
              </div>
              <div className="orphanage-icons">
                <FiTrash size={14} color="#15C3D6" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
