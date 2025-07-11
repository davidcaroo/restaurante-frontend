// src/components/Modal/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div
            className="modal-overlay"
            onClick={e => {
                // Sólo cierra si clicas en el overlay (no en un hijo)
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;
