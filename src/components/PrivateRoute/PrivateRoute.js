import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, loading } = useAuth();

    // Muestra un mensaje de carga mientras se verifica el estado de autenticación
    if (loading) {
        return <div className="loading">Cargando autenticación...</div>;
    }

    // Si no está autenticado, redirige a la página de login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si se requiere un rol específico y el usuario no lo tiene, redirige al inicio
    if (requiredRole && (!user || user.role !== requiredRole)) {
        // Podrías redirigir a una página de "Acceso Denegado" en lugar de la principal
        return <Navigate to="/" replace />;
    }

    // Si está autenticado y cumple con el rol (si aplica), renderiza los componentes hijos
    return children;
};

export default PrivateRoute;
