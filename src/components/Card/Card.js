import React from 'react';
import './Card.css';

function Card({ title, description, imageUrl, buttonText, onButtonClick }) {
    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                {onButtonClick && (
                    <button className="card-button" onClick={onButtonClick}>
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Card;
