import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

function Header({ loggedIn, onSignOut, email, onLoginClick }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          NewsExplorer
        </Link>
        <button 
          className={`header__burger ${isMenuOpen ? 'header__burger_active' : ''}`} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          type="button"
        >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>
        
        <nav className={`header__nav ${isMenuOpen ? 'header__nav_active' : ''}`}>
          {loggedIn ? (
            <>
              <Link 
                to="/" 
                className={`header__link ${location.pathname === '/' ? 'header__link_active' : ''}`}
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link 
                to="/saved-news" 
                className={`header__link ${location.pathname === '/saved-news' ? 'header__link_active' : ''}`}
                onClick={closeMenu}
              >
                Artículos guardados
              </Link>
              <span className="header__email">{email}</span>
              <button className="header__button header__button_type_logout" onClick={onSignOut}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className={`header__link ${location.pathname === '/' ? 'header__link_active' : ''}`}
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <button 
                className="header__button header__button_type_login"
                onClick={() => {
                  onLoginClick();
                  closeMenu();
                }}
              >
                Inicia sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
