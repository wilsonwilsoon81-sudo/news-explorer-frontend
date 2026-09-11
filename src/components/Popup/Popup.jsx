import { useEffect } from 'react';
import './popup.css';

function Popup({ isOpen, onClose, title, text, buttonText, onButtonClick }) {
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} aria-label="Cerrar"></button>
        <div className="popup__content">
          <h3 className="popup__title">{title}</h3>
          {text && <p className="popup__text">{text}</p>}
          {buttonText && (
            <button 
              type="button" 
              className="popup__button" 
              onClick={onButtonClick || onClose}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
