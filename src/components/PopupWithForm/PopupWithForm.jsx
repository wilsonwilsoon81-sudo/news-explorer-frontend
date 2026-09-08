import { useEffect } from 'react';
import './popupwithform.css';

function PopupWithForm({ isOpen, onClose, title, name, children, onSubmit }) {
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`popup ${isOpen ? 'popup_is-opened' : ''}`} 
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button 
          type="button" 
          className="popup__close" 
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
        
        <div className="popup__content">
          <h3 className="popup__title">{title}</h3>
          
          <form 
            name={name} 
            className="popup__form" 
            onSubmit={onSubmit}
          >
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
