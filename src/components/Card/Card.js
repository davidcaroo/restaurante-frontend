import React, { useState } from 'react';

function Card({ title, description, imageUrl, buttonText, onButtonClick }) {
    // Usa useState para el src de la imagen
    const [imgSrc, setImgSrc] = useState(imageUrl && imageUrl !== '' ? imageUrl : '/mesa-default.png');

    // Si hay error cargando la imagen (por url vacía, null, rota, etc), pon la default
    const handleImgError = () => {
        if (imgSrc !== '/mesa-default.png') {
            setImgSrc('/mesa-default.png');
        }
    };

    return (
        <div className="card">
            <img
                src={imgSrc}
                alt={title}
                onError={handleImgError}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
            <div className="card-body">
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={onButtonClick}>{buttonText}</button>
            </div>
        </div>
    );
}

export default Card;
