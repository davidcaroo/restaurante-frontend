// src/utils/helpers.js

// Valida si el email tiene formato válido
export function isValidEmail(email) {
  // Expresión regular sencilla para validar correos electrónicos
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Valida si la contraseña cumple un mínimo de requisitos
export function isValidPassword(password) {
  // Por ejemplo, mínimo 6 caracteres
  return typeof password === 'string' && password.length >= 6;
}

// Valida si el nombre está presente
export function isValidName(name) {
  return typeof name === 'string' && name.trim().length > 0;
}

// Exporta más funciones según las necesites...
