/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import { url } from 'inspector';
import SideBar from '../components/Sidebar';

import MapIcon from '../utils/mapIcon';
import api from '../services/api';
import { useAuth } from '../hooks/auth';
import { useGeoLocation } from '../hooks/geolocation';

interface OrphanageParams {
  id: string;
}
interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function EditOrphanage() {
  const params = useParams<OrphanageParams>();
  const { location, getLocation } = useGeoLocation();

  const history = useHistory();
  const {
    validOrphanage,
    ValidOrphanage,
    DeleteOrphanage,
    UpdateOrphanage,
  } = useAuth();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('aaaaa');
  const [opening_hours, SetOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, SetImages] = useState<File[]>([]);
  const [orphanages, SetOrphanages] = useState<Orphanage>();
  const [previewImages, SetPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      setName(response.data.name);
      setAbout(response.data.about);
      setInstructions(response.data.instructions);
      setOpenOnWeekends(response.data.open_on_weekends);
      SetOpeningHours(response.data.opening_hours);
      SetOrphanages(response.data);
      setPosition({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      });
      console.log(response.data);
    });
  }, [params.id]);

  useEffect(() => {
    getLocation();
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);

    SetImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    SetPreviewImages(selectedImagesPreview);
    console.log(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    await UpdateOrphanage(params.id, data);

    // alert('cadastro realizado com sucesso!!!');
    history.push('/dashboard');
  }

  function handleValidateOrphanage(id: string) {
    ValidOrphanage(id);
    history.push('/dashboard');
  }

  function handleNotValidOrphanage(id: string) {
    DeleteOrphanage(id);
    history.push('/dashboard');
  }

  if (!orphanages) {
    return <p>Carregando</p>;
  }

  if (!location) {
    return <div />;
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[location.latitude, location.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 ? (
                <Marker
                  interactive={false}
                  icon={MapIcon}
                  position={[position.latitude, position.longitude]}
                />
              ) : null}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                value={about}
                onChange={event => setAbout(event.target.value)}
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return <img key={image} src={image} alt={name} />;
                })}
                {orphanages.images.map(image => {
                  return <img key={image.id} src={image.url} alt={image.url} />;
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => SetOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(true)}
                  className={open_on_weekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(false)}
                  className={!open_on_weekends ? 'active' : ''}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          {validOrphanage ? (
            <button
              className="confirm-button"
              type="submit"
              onClick={handleSubmit}
            >
              Confirmar
            </button>
          ) : (
            <div className="container-buttons">
              <button
                className="delete-button"
                type="submit"
                onClick={() => handleNotValidOrphanage(params.id)}
              >
                Excluir
              </button>
              <button
                className="accept-button"
                type="submit"
                onClick={() => handleValidateOrphanage(params.id)}
              >
                Confirmar
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
