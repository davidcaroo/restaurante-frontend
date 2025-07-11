// src/components/About/About.js
import React from 'react';
import './About.css';

function About() {
    return (
        <section className="about-section">
            <h1 className="about-title">Nosotros</h1>
            <h2 className="about-subtitle">
                Sabores que cuentan historias, mesas que crean memorias.
            </h2>
            <p className="about-text about-text-center">
                En MesaPaYa, no solo servimos comida, servimos momentos. Somos un espacio donde la buena mesa, la calidez y el detalle se encuentran para hacerte sentir como en casa, pero con sabor a algo extraordinario.<br />
                Desde nuestros ingredientes frescos hasta el ambiente acogedor, cada visita es una invitación a desconectarte y disfrutar. Ya sea una cena romántica, un almuerzo con amigos o una celebración familiar, aquí siempre tendrás un lugar reservado para ti.
            </p>
            <button className="about-button">Saber más</button>
            <div className="about-images-grid">
                <img src="https://i.pinimg.com/1200x/5b/64/b0/5b64b0615610a3cc2f45eba8fb5caaa8.jpg" alt="Mujer comiendo" />
                <img src="https://i.pinimg.com/1200x/0d/d0/82/0dd08235d38bc5cf29fc747e49af648a.jpg" alt="Grupo de amigos en mesa" />
                <img src="https://i.pinimg.com/1200x/1b/11/65/1b11651ff942cde09e3ea116960f94ce.jpg" alt="Cena romantica" />
                <img src="https://i.pinimg.com/1200x/c8/2b/46/c82b46a36a88c8ca7ea07ddf118cfa28.jpg" alt="Cena de pareja" />
            </div>
        </section>
    );
}

export default About;
