/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiTrash, FiEdit, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import SideBar from '../components/Sidebar';
import MapIcon from '../utils/mapIcon';

import '../styles/pages/dashboard.css';
import api from '../services/api';
import { useAuth } from '../hooks/auth';

export default function Dashboard() {
  const history = useHistory();
  const { orphanage, validOrphanage, GetListOrphanages } = useAuth();
  const [valid, SetValidOrphanage] = useState(true);

  useEffect(() => {
    GetListOrphanages(valid);
  }, []);

  return (
    <div>
      <SideBar showIconsDashboard />
      <div className="dashboard-content">
        {validOrphanage ? (
          <h2 className="header-title">Orfanatos Cadastrados</h2>
        ) : (
          <h2 className="header-title">Cadastros Pendentes</h2>
        )}
        {orphanage.map(
          (orph: {
            name: string;
            latitude: number;
            longitude: number;
            id: string;
          }) => (
            <div className="orphanage-content">
              <div className="orphanage-card">
                <Map
                  center={[-1.4423929, -48.4838452]}
                  zoom={14}
                  style={{ width: '100%', height: '80%' }}
                >
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[orph.latitude, orph.longitude]}
                    icon={MapIcon}
                  />
                </Map>
                <div className="orphanage-info">
                  <h2 className="orphanage-info-name">{orph.name}</h2>
                  {validOrphanage ? (
                    <>
                      <div className="orphanage-icons">
                        <Link to={`orphanages/edit/${orph.id}`}>
                          <FiEdit size={14} color="#15C3D6" />
                        </Link>
                      </div>
                      <div className="orphanage-icons">
                        <Link to={`orphanage/delete/${orph.id}`}>
                          <FiTrash size={14} color="#15C3D6" />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="orphanage-icons">
                      <Link to={`orphanages/edit/${orph.id}`}>
                        <FiArrowRight size={14} color="#15C3D6" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
