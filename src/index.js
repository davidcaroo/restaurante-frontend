import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // Importa AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);