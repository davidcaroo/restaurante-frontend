import React from 'react';
import './Banner.css';

const Banner = ({
    title = 'Bella Vista',
    subtitle = 'Una experiencia gastronómica única desde 1987. Sabores auténticos, ambiente elegante y servicio excepcional en el corazón de Madrid.',
    backgroundImage,
    onReserve = () => { }
}) => {
    return (
        <section
            className="banner"
            /* src de la imagen en assets */
            style={{
                backgroundImage: `url(${backgroundImage || '../../assets/Banner.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="banner__overlay" />
            <div className="banner__content">
                <h1 className="banner__title">{title}</h1>
                <p className="banner__subtitle">{subtitle}</p>
                <button className="banner__button" onClick={onReserve}>
                    Reservar Mesa
                </button>
            </div>
        </section>
    );
};

export default Banner;