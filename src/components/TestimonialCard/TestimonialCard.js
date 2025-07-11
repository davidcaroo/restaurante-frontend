import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ nombre, cargo, comentario, imagen_url }) => (
    <div className="testimonial-card">
        {imagen_url && (
            <div className="testimonial-card__avatar">
                <img src={imagen_url} alt={nombre} />
            </div>
        )}
        <div className="testimonial-card__body">
            <p className="testimonial-card__comment">“{comentario}”</p>
            <p className="testimonial-card__author">
                <strong>{nombre}</strong>
                {cargo && <span className="testimonial-card__role"> — {cargo}</span>}
            </p>
        </div>
    </div>
);

export default TestimonialCard;
