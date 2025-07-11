const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost/restaurante/api'; 

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleApiResponse = async (response) => {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = { message: 'Error desconocido en el servidor.' };
        }
        throw new Error(errorData.message || `Error HTTP! Status: ${response.status}`);
    }
    return response.json();
};

// ---- AUTENTICACIÓN ----
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(credentials),
    });
    return handleApiResponse(response);
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(userData),
    });
    return handleApiResponse(response);
};

export const logoutUser = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getAuthHeaders(), 
        },
    });
    return handleApiResponse(response);
};

export const fetchCurrentUser = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/user.php`, {
        headers: { 'Accept': 'application/json', ...getAuthHeaders() },
    });
    return handleApiResponse(response);
};

// ---- MESAS ----
export const fetchMesas = async () => {
    const response = await fetch(`${API_BASE_URL}/mesas/read.php`, {
        headers: { 'Accept': 'application/json' },
    });
    return handleApiResponse(response);
};

// ---- TESTIMONIOS ----
export const fetchTestimonios = async () => {
    const response = await fetch(`${API_BASE_URL}/testimonios/read.php`, {
        headers: { 'Accept': 'application/json' },
    });
    return handleApiResponse(response);
};

// ---- RESERVAS ----
export const createReserva = async (reservaData) => {
    const response = await fetch(`${API_BASE_URL}/reservas/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(reservaData),
    });
    return handleApiResponse(response);
};

export const fetchUserReservations = async () => {
    const response = await fetch(`${API_BASE_URL}/reservas/user.php`, {
        headers: { 'Accept': 'application/json', ...getAuthHeaders() },
    });
    return handleApiResponse(response);
};

// ---- CUPONES ----
export const validateCoupon = async (couponCode) => {
    const response = await fetch(`${API_BASE_URL}/cupones/validar.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ codigo: couponCode }),
    });
    return handleApiResponse(response);
};

// ---- ADMIN (Opcional, según tu backend) ----
export const fetchAllReservas = async () => {
    const response = await fetch(`${API_BASE_URL}/reservas/read.php`, {
        headers: { 'Accept': 'application/json', ...getAuthHeaders() },
    });
    return handleApiResponse(response);
};

