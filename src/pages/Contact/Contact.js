import React from 'react';
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaPaperPlane
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <header className="contact-header">
                <h1>Contacto</h1>
                <p>¿Tienes alguna pregunta o sugerencia? Nos encantaría saber de ti.</p>
                <p>Contáctanos y te responderemos a la brevedad.</p>
            </header>

            <div className="contact-content">
                {/* Columna Izquierda: Info y Mapa */}
                <div className="contact-left">
                    <div className="info-card">
                        <h2>Información de Contacto</h2>
                        <div className="info-item">
                            <FaMapMarkerAlt className="icon" />
                            <div>
                                <h4>Dirección</h4>
                                <p>Calle Gran Vía, 45<br />28013 Madrid, España</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaPhone className="icon" />
                            <div>
                                <h4>Teléfono</h4>
                                <p>+34 912 345 678</p>
                                <small>Reservas y consultas</small>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaEnvelope className="icon" />
                            <div>
                                <h4>Email</h4>
                                <p>info@bellavista.com</p>
                                <small>Respuesta en 24 horas</small>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaClock className="icon" />
                            <div>
                                <h4>Horarios</h4>
                                <p>
                                    Lunes - Jueves: 12:00 – 23:30<br />
                                    Viernes - Sábado: 12:00 – 01:00<br />
                                    Domingo: 12:00 – 23:00
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="map-card">
                        <h2>Ubicación</h2>
                        <div className="map-placeholder">
                            <FaMapMarkerAlt className="map-icon" />
                            <span>Mapa interactivo<br />Gran Vía, 45 – Madrid</span>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Formulario */}
                <div className="form-card">
                    <h2>Envíanos un Mensaje</h2>
                    <form className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Nombre completo *</label>
                                <input type="text" id="name" placeholder="Tu nombre completo" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" placeholder="tu@email.com" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone">Teléfono</label>
                                <input type="tel" id="phone" placeholder="+34 612 345 678" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Asunto *</label>
                                <select id="subject" required>
                                    <option value="">Selecciona un asunto</option>
                                    <option>Reserva</option>
                                    <option>Eventos</option>
                                    <option>Otros</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group full">
                            <label htmlFor="message">Mensaje *</label>
                            <textarea id="message" rows="5" placeholder="Escribe tu mensaje aquí..." required />
                        </div>

                        <div className="form-group checkbox-group">
                            <input type="checkbox" id="privacy" />
                            <label htmlFor="privacy">
                                Acepto la <a href="/privacy">política de privacidad</a> y el tratamiento de mis datos personales
                            </label>
                        </div>

                        <button type="submit" className="submit-btn">
                            <FaPaperPlane className="btn-icon" />
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
