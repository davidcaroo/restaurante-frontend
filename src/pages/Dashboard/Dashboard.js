import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserReservations, fetchAllReservas } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Importa los estilos CSS

function Dashboard() {
    const { user, isAuthenticated, isAdmin, isClient, loading, logout } = useAuth();
    const [reservas, setReservas] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Si la autenticación aún está cargando, no hacer nada
        if (loading) {
            return;
        }

        // Si no está autenticado después de cargar, redirigir al login
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const loadReservations = async () => {
            // Si el usuario no está cargado o no tiene un rol definido, esperar
            if (!user || (!isAdmin && !isClient)) {
                setDashboardLoading(true); // Mantener el estado de carga
                return;
            }

            try {
                let fetchedReservas = [];
                if (isAdmin) {
                    fetchedReservas = await fetchAllReservas(); // Obtener todas las reservas si es admin
                } else if (isClient) {
                    fetchedReservas = await fetchUserReservations(); // Obtener solo las suyas si es cliente
                }
                setReservas(fetchedReservas);
            } catch (err) {
                setError("Error al cargar las reservas. " + (err.message || "Por favor, inténtalo de nuevo."));
                console.error("Error fetching reservations:", err);
            } finally {
                setDashboardLoading(false);
            }
        };

        // Solo cargar reservas si ya está autenticado y el usuario está disponible
        if (isAuthenticated && user) {
            loadReservations();
        }
    }, [loading, isAuthenticated, isAdmin, isClient, user, navigate]);

    // Mostrar un loader mientras se carga la autenticación o los datos del dashboard
    if (loading || dashboardLoading) {
        return <div className="loading">Cargando panel...</div>;
    }

    // Si hay un error y no se pudo cargar el dashboard
    if (error) {
        return <div className="error">{error}</div>;
    }

    // Si no está autenticado, ya se redirigió, no renderizar nada aquí
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="dashboardContainer">
            <h2>Bienvenido, {user?.name}!</h2>
            <p>Tu rol: <strong>{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</strong></p>

            {isAdmin && (
                <section className="adminSection">
                    <h3>Gestión de Reservas (Administrador)</h3>
                    {reservas.length > 0 ? (
                        <table className="reservasTable">
                            <thead>
                                <tr>
                                    <th>ID Reserva</th>
                                    <th>Cliente</th>
                                    <th>Email</th>
                                    <th>Mesa</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Participantes</th>
                                    <th>Costo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservas.map(reserva => (
                                    <tr key={reserva.id}>
                                        <td data-label="ID Reserva">{reserva.id}</td>
                                        <td data-label="Cliente">{reserva.nombre_cliente}</td>
                                        <td data-label="Email">{reserva.email_cliente}</td>
                                        <td data-label="Mesa">{reserva.mesa?.nombre || `Mesa ID: ${reserva.mesa_id}`}</td>
                                        <td data-label="Fecha">{reserva.fecha_reserva}</td>
                                        <td data-label="Hora">{reserva.hora_inicio.substring(0, 5)} - {reserva.hora_fin.substring(0, 5)}</td>
                                        <td data-label="Participantes">{reserva.num_participantes}</td>
                                        <td data-label="Costo">${parseFloat(reserva.costo_total).toFixed(2)}</td>
                                        <td data-label="Estado">{reserva.estado}</td>
                                        <td data-label="Acciones">
                                            {/* Botones de acción para admin (editar, cancelar) */}
                                            <button className="actionButton">Editar</button>
                                            <button className="actionButton cancelButton">Cancelar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay reservas para mostrar.</p>
                    )}
                </section>
            )}

            {isClient && (
                <section className="clientSection">
                    <h3>Mis Reservas</h3>
                    {reservas.length > 0 ? (
                        <ul className="reservasList">
                            {reservas.map(reserva => (
                                <li key={reserva.id} className="reservaItem">
                                    <p><strong>Mesa:</strong> {reserva.mesa?.nombre || `Mesa ID: ${reserva.mesa_id}`}</p>
                                    <p><strong>Fecha:</strong> {reserva.fecha_reserva}</p>
                                    <p><strong>Hora:</strong> {reserva.hora_inicio.substring(0, 5)} - {reserva.hora_fin.substring(0, 5)}</p>
                                    <p><strong>Participantes:</strong> {reserva.num_participantes}</p>
                                    <p><strong>Costo Total:</strong> ${parseFloat(reserva.costo_total).toFixed(2)}</p>
                                    <p><strong>Estado:</strong> {reserva.estado}</p>
                                    {reserva.estado === 'confirmada' && (
                                        <button className="actionButton cancelButton">Cancelar Reserva</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tienes reservas activas. ¡Haz una ahora!</p>
                    )}
                </section>
            )}

            <button className="logoutButton" onClick={logout}>Cerrar Sesión</button>
        </div>
    );
}

export default Dashboard;
