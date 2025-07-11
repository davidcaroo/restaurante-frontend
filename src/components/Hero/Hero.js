// src/components/Hero/Hero.js
import React from 'react';
import './Hero.css';

const Hero = () => (
    <section className="hero-features">
        <div className="hero-card">
            <div className="hero-icon fork-spoon" />
            <h4>Reservas online en segundos</h4>
            <p>Olvídate de llamadas o confusiones. Tu eliges el día y hora en pocos clics.</p>
        </div>
        <div className="hero-card">
            <div className="hero-icon whatsapp" />
            <h4>Confirmaciones automáticas<br />por WhatsApp y correo</h4>
            <p>Cada reserva queda confirmada al instante. Cero dudas, cero estrés.</p>
        </div>
        <div className="hero-card hero-card--orange">
            <div className="hero-icon click" />
            <h4>Elige tu mesa favorita</h4>
            <p>Puedes seleccionar tu ubicación ideal: junto a la ventana, cerca de la barra o en la terraza. ¡Como te gusta!</p>
        </div>
        <div className="hero-card">
            <div className="hero-icon bell" />
            <h4>Tu mesa no se olvida de ti</h4>
            <p>Recibe un mensaje antes de tu reserva y llega sin afán. Tu mesa estará lista cuando tú lo estés</p>
        </div>
    </section>
);

export default Hero;
