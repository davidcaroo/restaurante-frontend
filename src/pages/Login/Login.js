import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isValidEmail, isValidPassword } from '../../utils/helpers';
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUserShield,
    FaUser
} from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!isValidEmail(form.email)) {
            toast.error('Por favor ingresa un correo válido.', { autoClose: 2000 });
            return;
        }
        if (!form.password) {
            toast.error('Ingresa tu contraseña.', { autoClose: 2000 });
            return;
        }
        setLoading(true);
        try {
            await login({ email: form.email, password: form.password });
            toast.success('¡Sesión iniciada correctamente!', { autoClose: 1500 });
            setTimeout(() => {
                navigate('/'); // Home o dashboard
            }, 1300);
        } catch (err) {
            if (err?.response?.status === 401) {
                toast.error('Email o contraseña incorrectos.', { autoClose: 2500 });
            } else {
                toast.error('Ocurrió un error. Intenta de nuevo.', { autoClose: 2500 });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <ToastContainer position="top-right" />
            <div className="login-header">
                <div className="login-logo">BV</div>
                <h1>Iniciar Sesión</h1>
                <p>
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="link-register">
                        Regístrate aquí
                    </Link>
                </p>
            </div>

            <div className="login-card">
                <div className="demo-box">
                    <h4>Credenciales de demostración:</h4>
                    <div className="demo-item">
                        <FaUserShield className="demo-icon" />
                        <span>Admin: admin@bellavista.com / demo123</span>
                    </div>
                    <div className="demo-item">
                        <FaUser className="demo-icon" />
                        <span>Cliente: cliente@example.com / demo123</span>
                    </div>
                </div>

                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-icon">
                            <FaEnvelope />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="   tu@email.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"> Contraseña</label>
                        <div className="input-icon">
                            <FaLock />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="     Tu contraseña"
                                value={form.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="toggle-pass"
                                onClick={togglePassword}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                            />
                            Recordarme
                        </label>
                        <Link to="/forgot-password" className="link-forgot">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="btn-login"
                        disabled={loading || !form.email || !form.password}
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
