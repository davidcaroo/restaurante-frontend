import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TestimoniosForm.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/restaurante/api';
// URL pública a tu imagen por defecto
const DEFAULT_IMAGE_URL = '/images/default-testimonial.jpg'; // <--- AJUSTA esto según donde la pongas

export default function TestimoniosForm() {
    const [nombre, setNombre] = useState('');
    const [comentario, setComentario] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!nombre || !comentario) {
            toast.error('Por favor completa todos los campos.', { autoClose: 2000 });
            setLoading(false);
            return;
        }

        // Ahora SIEMPRE va la imagen por defecto
        const payload = {
            nombre_cliente: nombre,
            comentario,
            imagen_url: DEFAULT_IMAGE_URL
        };

        try {
            const res = await fetch(`${API_BASE_URL}/testimonios/create.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error al guardar.");

            setNombre('');
            setComentario('');
            toast.success('¡Gracias por tu aporte! Testimonio enviado.', { autoClose: 2000 });
        } catch (err) {
            toast.error('Hubo un error, inténtalo de nuevo.', { autoClose: 2500 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tf__container">
            <form className="testimonios-form" onSubmit={handleSubmit}>
                <h3>Déjanos tu testimonio</h3>
                <label>
                    Nombre *
                    <input
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Comentario *
                    <textarea
                        value={comentario}
                        onChange={e => setComentario(e.target.value)}
                        rows="4"
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {'Enviar Testimonio'}
                </button>
            </form>
            <ToastContainer position="top-right" />
        </div>
    );
}
