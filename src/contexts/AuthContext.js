import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, logoutUser, fetchCurrentUser } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const fetchedUser = await fetchCurrentUser(); // Ya lee el token del localStorage en api.js
                    setUser(fetchedUser);
                } catch (error) {
                    console.error("Error al cargar el usuario al iniciar:", error);
                    localStorage.removeItem('token'); // Token inválido o expirado
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await loginUser(credentials); // ← AQUÍ
            localStorage.setItem('token', data.access_token);
            setUser(data.cliente);
            return data;
        } catch (error) {
            console.error("Error en el login:", error);
            throw error;
        }
    };


    const register = async (userData) => {
        try {
            const data = await registerUser(userData);
            localStorage.setItem('token', data.access_token);
            setUser(data.cliente);
            return data;
        } catch (error) {
            console.error("Error en el registro:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Error al cerrar sesión en el servidor:", error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const authValue = {
        user,
        isAuthenticated: !!user,
        isAdmin: user && user.role === 'admin',
        isClient: user && user.role === 'client',
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);