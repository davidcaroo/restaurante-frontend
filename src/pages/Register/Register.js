import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail } from '../../utils/helpers'; // Si tienes isValidPassword, puedes usarlo aquí
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
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

    const handleSubmit = async e => {
        e.preventDefault();

        // Validaciones
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast.error('Por favor, completa todos los campos obligatorios.', { autoClose: 2200 });
            return;
        }
        if (!isValidEmail(form.email)) {
            toast.error('Introduce un email válido.', { autoClose: 2000 });
            return;
        }
        if (form.password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres.', { autoClose: 2200 });
            return;
        }
        if (form.password !== form.confirmPassword) {
            toast.error('Las contraseñas no coinciden.', { autoClose: 2000 });
            return;
        }
        if (!form.agree) {
            toast.error('Debes aceptar los términos y condiciones.', { autoClose: 2100 });
            return;
        }

        setLoading(true);
        try {
            await register({
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                password_confirmation: form.confirmPassword
            });
            toast.success('¡Registro exitoso! Bienvenido/a 🎉', { autoClose: 1600 });
            setTimeout(() => navigate('/dashboard'), 1300);
        } catch (err) {
            // Si tu backend devuelve el error en err.message o en err.response.data.message
            const msg = err?.message || err?.response?.data?.message || 'Error al registrar. Inténtalo de nuevo.';
            toast.error(msg, { autoClose: 2300 });
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
                                name="name"
                                placeholder="Tu nombre completo"
                                value={form.name}
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
                                name="phone"
                                placeholder="+34 612 345 678"
                                value={form.phone}
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
