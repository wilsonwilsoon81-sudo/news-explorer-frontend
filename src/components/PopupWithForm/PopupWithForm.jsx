import { useEffect } from 'react';
import './popupwithform.css';

function PopupWithForm({ isOpen, onClose, title, children }) {
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // Opcional: bloquear scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto'; // Restaurar scroll al cerrar
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null; // No renderizar nada si no está abierto

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button 
          type="button" 
          className="popup__close" 
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
        
 <div className="popup__content">
          <h3 className="popup__title">{title}</h3>
          {/* Aquí se inyectará el <form> que viene de Login.jsx o Register.jsx */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
