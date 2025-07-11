import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserReservations, fetchAllReservas } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const { user, isAuthenticated, isAdmin, isClient, loading, logout } = useAuth();
    const [reservas, setReservas] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const loadReservations = async () => {
            if (!user || (!isAdmin && !isClient)) {
                setDashboardLoading(true);
                return;
            }
            try {
                let fetchedReservas = [];
                if (isAdmin) {
                    fetchedReservas = await fetchAllReservas();
                } else if (isClient) {
                    fetchedReservas = await fetchUserReservations();
                }
                setReservas(Array.isArray(fetchedReservas) ? fetchedReservas : []);
            } catch (err) {
                setError("Error al cargar las reservas. " + (err.message || "Por favor, inténtalo de nuevo."));
                console.error("Error fetching reservations:", err);
            } finally {
                setDashboardLoading(false);
            }
        };

        if (isAuthenticated && user) {
            loadReservations();
        }
    }, [loading, isAuthenticated, isAdmin, isClient, user, navigate]);

    if (loading || dashboardLoading) {
        return <div className="loading">Cargando panel...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="dashboardContainer">
            {/* CARD: Información de usuario */}
            <section className="userCard">
                <h2>Bienvenido, {user?.nombre || user?.name || "Usuario"}!</h2>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Rol:</strong> {user?.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
                <button className="logoutButton" onClick={logout}>Cerrar Sesión</button>
            </section>

            {/* CARD: Reservas */}
            <section className="reservasCard">
                <h3>{isAdmin ? "Todas las Reservas" : "Mis Reservas"}</h3>
                {reservas.length > 0 ? (
                    isAdmin ? (
                        <table className="reservasTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente ID</th>
                                    <th>Mesa ID</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Personas</th>
                                    <th>Estado</th>
                                    <th>Detalles</th>
                                    <th>Creada</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservas.map(reserva => (
                                    <tr key={reserva.id}>
                                        <td>{reserva.id}</td>
                                        <td>{reserva.cliente_id}</td>
                                        <td>{reserva.mesa_id}</td>
                                        <td>{reserva.fecha}</td>
                                        <td>
                                            {reserva.hora_inicio?.substring(0, 5)} - {reserva.hora_fin?.substring(0, 5)}
                                        </td>
                                        <td>{reserva.numero_personas}</td>
                                        <td>{reserva.estado}</td>
                                        <td>{reserva.detalles_reserva}</td>
                                        <td>{reserva.creado_en}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <ul className="reservasList">
                            {reservas.map(reserva => (
                                <li key={reserva.id} className="reservaItem">
                                    <p><strong>Mesa ID:</strong> {reserva.mesa_id}</p>
                                    <p><strong>Fecha:</strong> {reserva.fecha}</p>
                                    <p><strong>Hora:</strong> {reserva.hora_inicio?.substring(0, 5)} - {reserva.hora_fin?.substring(0, 5)}</p>
                                    <p><strong>Personas:</strong> {reserva.numero_personas}</p>
                                    <p><strong>Estado:</strong> {reserva.estado}</p>
                                    <p><strong>Detalles:</strong> {reserva.detalles_reserva}</p>
                                </li>
                            ))}
                        </ul>
                    )
                ) : (
                    <p>{isAdmin ? "No hay reservas para mostrar." : "No tienes reservas activas. ¡Haz una ahora!"}</p>
                )}
            </section>

            {/* CARD: Comentarios */}
            <section className="comentariosCard">
                <h3>Mis Comentarios</h3>
                <p style={{ color: '#888' }}>(Próximamente podrás ver tus comentarios y valoraciones aquí.)</p>
            </section>
        </div>
    );
}

export default Dashboard;
