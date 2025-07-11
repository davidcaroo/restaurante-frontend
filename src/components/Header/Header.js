import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/images/logo-mesaya.png';
import './Header.css';

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobile = () => setMobileOpen(!mobileOpen);
    const closeMobile = () => setMobileOpen(false);

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo" onClick={closeMobile}>
                    <img src={logo} alt="MesaYa Logo" />
                </Link>
                {/* Menú móvil (hamburguesa) */}
                <button className="mobile-toggle" onClick={toggleMobile}>
                    <span className="bars" />
                </button>
                {/* Navegación */}
                <nav className={`nav-menu ${mobileOpen ? 'open' : ''}`}>
                    <NavLink end to="/" className="nav-link" onClick={closeMobile}>
                        Inicio
                    </NavLink>
                    <NavLink to="/contact" className="nav-link" onClick={closeMobile}>
                        Contacto
                    </NavLink>
                    {!isAuthenticated && (
                        <>
                            <NavLink to="/login" className="nav-link" onClick={closeMobile}>
                                Iniciar Sesión
                            </NavLink>
                            <Link to="/register" className="btn-register" onClick={closeMobile}>
                                Registrarse
                            </Link>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard" className="nav-link" onClick={closeMobile}>
                                Mi Cuenta
                            </Link>
                            <button
                                className="nav-link logout"
                                onClick={() => { logout(); closeMobile(); }}
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
