// src/components/Hero/HeroInfo.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroInfo.css';
import mesaImg from '../../assets/images/mesa-menu.jpeg';

export default function HeroInfo({ scrollToMesas }) {
    const navigate = useNavigate();

    return (
        <div className="hero-info">
            <div className="hero-info__img-col">
                <img src={mesaImg} alt="Menú del restaurante" className="hero-info__img" />
            </div>
            <div className="hero-info__btns">
                <button
                    className="hero-info__btn hero-info__btn--menu"
                    onClick={() => navigate('/menu')}
                >
                    Menú
                </button>
                <button
                    className="hero-info__btn hero-info__btn--mesas"
                    onClick={scrollToMesas}
                >
                    Mesas Disponibles
                </button>
            </div>
        </div>
    );
}
