import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import logoMesaYa from '../../assets/images/logo-mesaya.png';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            {/* Columna Izquierda: Logo y menú */}
            <div className="footer-left">
                <div className="footer-brand">
                    <img
                        src={logoMesaYa}
                        alt="MesaPaYa logo"
                        className="footer-logo"
                    />
                </div>
                <nav className="footer-menu">
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/nosotros">Nosotros</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                        <li><a href="/menu">Menú</a></li>
                        <li><a href="/reservas">Reservas</a></li>
                        <li className="footer-mini"><a href="/terminos">Términos y Condiciones</a></li>
                        <li className="footer-mini"><a href="/privacidad">Políticas de Privacidad</a></li>
                    </ul>
                </nav>
                <div className="footer-social-icons">
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaInstagram /></a>
                </div>
            </div>
            {/* Columna centro: Contacto */}
            <div className="footer-center">
                <div className="footer-contact">
                    <strong>Dirección</strong>
                    <p>Calle 123 #23-23, Mequejo, Colombia</p>
                    <strong>Horario</strong>
                    <p>Lunes - Viernes<br/>8 am a 5 pm<br/>Sab, Dom, Festivos<br/>7 am a 3 pm</p>
                    <strong>Teléfono</strong>
                    <p>31234424</p>
                </div>
            </div>
            {/* Columna derecha: Mapa */}
            <div className="footer-map">
                <iframe
                    title="mapa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0198355474767!2d144.96305781550402!3d-37.81627974202147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f2a29b63%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1653098071739!5m2!1sen!2sau"
                    width="320"
                    height="210"
                    style={{
                        border: '3px solid orange',
                        borderRadius: 3,
                        width: '100%',
                        minWidth: 180,
                        maxWidth: 320
                    }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
        <div className="footer-bottom">
            Power by MesaPaYa. Copyright 2025
        </div>
    </footer>
);

export default Footer;
