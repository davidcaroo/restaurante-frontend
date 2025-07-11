
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/restaurante/api'; // Ajusta la URL de tu API PHP

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleApiResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error HTTP! Status: ${response.status}`);
    }
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(credentials),
    });
    return handleApiResponse(response);
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(userData),
    });
    return handleApiResponse(response);
};

export const logoutUser = async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getAuthHeaders(), // Enviar token para que el backend lo invalide si usa lista negra
        },
    });
    return handleApiResponse(response);
};

export const fetchCurrentUser = async () => {
    const response = await fetch(`${API_BASE_URL}/user`, {
        headers: { 'Accept': 'application/json', ...getAuthHeaders() },
    });
    return handleApiResponse(response);
};

export const fetchMesas = async () => {
    const response = await fetch(`${API_BASE_URL}/mesas/read.php`, {
        headers: { 'Accept': 'application/json' },
    });
    return handleApiResponse(response);
};

export const fetchTestimonios = async () => {
    const response = await fetch(`${API_BASE_URL}/testimonios/read.php`, {
        headers: { 'Accept': 'application/json' },
    });
    return handleApiResponse(response);
};

export const createReserva = async (reservaData) => {
    const response = await fetch(`${API_BASE_URL}/reservas/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(reservaData),
    });
    return handleApiResponse(response);
};

export const validateCoupon = async (couponCode) => {
    const response = await fetch(`${API_BASE_URL}/cupones/validar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ codigo: couponCode }),
    });
    return handleApiResponse(response);
};

export const fetchUserReservations = async () => {
    const response = await fetch(`${API_BASE_URL}/reservas/user`, { // Nuevo endpoint
        headers: { 'Accept': 'application/json', ...getAuthHeaders() },
    });
    return handleApiResponse(response);
};

// Funciones de ejemplo para admin (requieren token de admin)
export const fetchAllReservas = async () => {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
        headers: { 'Accept': 'application/json', ...getAuthHeaders() },
    });
    return handleApiResponse(response);
};