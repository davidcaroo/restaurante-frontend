import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/restaurante/api/auth/register.php'  ;

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        agree: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePass = () => setShowPassword(p => !p);
    const toggleConfirm = () => setShowConfirm(c => !c);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Valida email simple
    const isValidEmail = email =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
            toast.error('Por favor, completa todos los campos obligatorios.');
            return;
        }
        if (!isValidEmail(form.email)) {
            toast.error('Introduce un email válido.');
            return;
        }
        if (form.password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }
        if (!form.agree) {
            toast.error('Debes aceptar los términos y condiciones.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: form.nombre,
                    email: form.email,
                    telefono: form.telefono,
                    password: form.password
                })
            })
            const data = await response.json();
            if (response.ok) {
                toast.success('¡Registro exitoso! Bienvenido/a 🎉');
                setTimeout(() => navigate('/login'), 1400);
            } else {
                toast.error(data.message || 'Error al registrar.');
            }
        } catch (err) {
            toast.error('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <ToastContainer position="top-right" />
            <div className="register-header">
                <div className="register-logo">BV</div>
                <h1>Crear Cuenta</h1>
                <p>
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="link-login">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
            <div className="register-card">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre completo</label>
                        <div className="input-icon">
                            <FaUser />
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Tu nombre completo"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-icon">
                            <FaEnvelope />
                            <input
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <div className="input-icon">
                            <FaPhone />
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="+34 612 345 678"
                                value={form.telefono}
                                onChange={handleChange}
                                autoComplete="tel"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <div className="input-icon">
                            <FaLock />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Mínimo 6 caracteres"
                                value={form.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className="toggle-pass"
                                onClick={togglePass}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <div className="input-icon">
                            <FaLock />
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Repite tu contraseña"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className="toggle-pass"
                                onClick={toggleConfirm}
                                tabIndex={-1}
                            >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            name="agree"
                            id="agree"
                            checked={form.agree}
                            onChange={handleChange}
                        />
                        <label htmlFor="agree">
                            Acepto los{' '}
                            <a href="/terms" target="_blank" rel="noopener noreferrer">
                                términos y condiciones
                            </a>{' '}
                            y la{' '}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer">
                                política de privacidad
                            </a>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn-register"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
