// src/pages/Home/Home.js
import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import TestimoniosForm from '../../components/TestimoniosForm/TestimoniosForm';
import Hero from '../../components/Hero/Hero';
import HeroInfo from '../../components/Hero/HeroInfo';
import About from '../../components/Hero/About';
import bannerImg from '../../assets/Banner.png';
import { fetchMesas, fetchTestimonios } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Home({ onReserveClick }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mesas, setMesas] = useState([]);
  const [testimonios, setTestimonios] = useState([]);

  const navigate = useNavigate();
  const mesasRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mesasData, testimoniosData] = await Promise.all([
          fetchMesas(),
          fetchTestimonios()
        ]);
        setMesas(mesasData);
        setTestimonios(testimoniosData);
      } catch (err) {
        setError("Error al cargar los datos. Por favor, inténtalo más tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMenu = () => {
    navigate('/menu');
  };

  const handleMesasDisponibles = () => {
    if (mesasRef.current) {
      mesasRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homeContainer">
      <Banner
        backgroundImage={bannerImg}
        title="Tu Experiencia Culinaria Comienza Aquí"
        subtitle="Disfruta de nuestros exquisitos platos y un ambiente inigualable."
        onReserve={() => onReserveClick(null)}
      />
      <Hero />
      <About />
 
      <HeroInfo
        onMenuClick={handleMenu}
        onMesasClick={handleMesasDisponibles}
      />

      {/* Galería & Mesas Disponibles */}
      <section className="gallerySection" ref={mesasRef}>
        <h2>Galería & Mesas Disponibles</h2>
        <div className="tableGrid">
          {mesas.map(mesa => (
            <Card
              key={mesa.id}
              title={`Mesa ${mesa.id} (${mesa.tipo.charAt(0).toUpperCase() + mesa.tipo.slice(1)})`}
              description={`Capacidad: ${mesa.capacidad} personas`}
              imageUrl={mesa.imagen_url || '/public/mesa-default.png'}
              buttonText="Reservar Mesa"
              onButtonClick={() => onReserveClick(mesa.id)}
            />
          ))}
        </div>
      </section>

      <section className="testimonialsSection">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonialGrid">
          {testimonios.map(t => (
            <TestimonialCard
              key={t.id}
              nombre={t.nombre_cliente}
              comentario={t.comentario}
              estrellas={t.estrellas || 5}
            />
          ))}
        </div>
      </section>
      <TestimoniosForm />
    </div>
  );
}

export default Home;
