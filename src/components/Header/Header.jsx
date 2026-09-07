import { Link, useLocation } from 'react-router-dom';
import './header.css';

function Header({ loggedIn, onSignOut, email }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        
        <nav className="header__nav">
          {loggedIn ? (
            <>
              <Link 
                to="/" 
                className={`header__link ${location.pathname === '/' ? 'header__link_active' : ''}`}
              >
                Inicio
              </Link>
              <Link 
                to="/saved-news" 
                className={`header__link ${location.pathname === '/saved-news' ? 'header__link_active' : ''}`}
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
              >
                Inicio
              </Link>
              <button className="header__button header__button_type_login">
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
