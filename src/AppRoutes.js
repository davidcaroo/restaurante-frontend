import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';
import Modal from './components/Modal/Modal';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { createReserva } from './services/api';


function AppRoutes() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    // Formulario reserva
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [personas, setPersonas] = useState(1);
    const [detalles, setDetalles] = useState('');

    const openReservationModal = (tableId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setSelectedTable(tableId);
        setIsModalOpen(true);
    };

    const closeReservationModal = () => {
        setIsModalOpen(false);
        setSelectedTable(null);
        setFecha('');
        setHoraInicio('');
        setHoraFin('');
        setPersonas(1);
        setDetalles('');
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        try {
            await createReserva({
                mesa_id: selectedTable,
                fecha,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                numero_personas: personas,
                detalles_reserva: detalles
            });
            closeReservationModal();
            alert('¡Reserva enviada con éxito!');
        } catch (err) {
            alert('Error al crear la reserva. Inténtalo de nuevo.');
        }
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Home onReserveClick={openReservationModal} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="admin">
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {isModalOpen && isAuthenticated && (
                <Modal onClose={closeReservationModal}>
                    <h2>Reservar Mesa {selectedTable}</h2>
                    <form className="reservation-form" onSubmit={handleReservationSubmit}>
                        <label>
                            Fecha
                            <input
                                type="date"
                                value={fecha}
                                onChange={e => setFecha(e.target.value)}
                                required
                            />
                        </label>
                        <div className="time-group">
                            <label>
                                Hora inicio
                                <input
                                    type="time"
                                    value={horaInicio}
                                    onChange={e => setHoraInicio(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Hora fin
                                <input
                                    type="time"
                                    value={horaFin}
                                    onChange={e => setHoraFin(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <label>
                            Nº de personas
                            <input
                                type="number"
                                min="1"
                                value={personas}
                                onChange={e => setPersonas(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Detalles (opcional)
                            <textarea
                                value={detalles}
                                onChange={e => setDetalles(e.target.value)}
                                rows="2"
                            />
                        </label>
                        <div className="button-group">
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={closeReservationModal}
                            >
                                Cerrar
                            </button>
                            <button type="submit" className="btn-primary">
                                Reservar
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}

export default AppRoutes;
