import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import CurrentUserContext from './utils/CurrentUserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import * as mainApi from './utils/MainApi';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import SavedNews from './components/SavedNews/SavedNews';
import Preloader from './components/Preloader/Preloader';
import PopupWithForm from './components/PopupWithForm/PopupWithForm';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Popup from './components/Popup/Popup';

function App() {
  const location = useLocation();
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    mainApi.checkToken()
      .then((userData) => {
        setCurrentUser({ name: userData.name, email: userData.email });
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error('Token inválido o expirado:', err);
        localStorage.removeItem('jwt');
        setLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.state?.openLogin) {
      Promise.resolve().then(() => {
        setIsLoginOpen(true);
      });
      
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleLoginSubmit = (email, password) => {
    setErrorMessage('');
    mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return mainApi.checkToken();
        }
      })
      .then((userData) => {
        setCurrentUser({ name: userData.name, email: userData.email });
        setLoggedIn(true);
        setIsLoginOpen(false);
        setSuccessMessage('Inicio de sesión exitoso');
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        console.error('Error al iniciar sesión:', err);
        setErrorMessage(err.message || 'Correo o contraseña incorrectos');
      });
  };

  const handleRegisterSubmit = (name, email, password) => {
    setErrorMessage('');
    mainApi.register(name, email, password)
      .then(() => mainApi.login(email, password))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return mainApi.checkToken();
        }
      })
      .then((userData) => {
        setCurrentUser({ name: userData.name, email: userData.email });
        setLoggedIn(true);
        setIsRegisterOpen(false);
        setSuccessMessage('Usuario registrado e iniciado sesión exitosamente');
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        console.error('Error al registrarse:', err);
        setErrorMessage(err.message || 'Error al registrarse. ¿El correo ya existe?');
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <div className="page">
          <Header 
            loggedIn={loggedIn} 
            email={currentUser.email} 
            onSignOut={handleSignOut} 
            onLoginClick={() => {
              setIsLoginOpen(true);
              setIsRegisterOpen(false);
              setErrorMessage('');
            }}
          />
          
          <main className="content">
            <Routes>
              <Route path="/" element={<Main loggedIn={loggedIn} />} />
              
              <Route 
                path="/saved-news" 
                element={
                  <ProtectedRoute 
                    component={SavedNews} 
                    loggedIn={loggedIn} 
                  />
                } 
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />

          <PopupWithForm
            isOpen={isLoginOpen}
            onClose={() => {
              setIsLoginOpen(false);
              setErrorMessage('');
            }}
            title="Iniciar sesión"
            name="login"
          >
            <Login 
              onLogin={handleLoginSubmit} 
              onSwitchToRegister={() => {
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
                setErrorMessage('');
              }}
              errorMessage={errorMessage}
            />
          </PopupWithForm>

          <PopupWithForm
            isOpen={isRegisterOpen}
            onClose={() => {
              setIsRegisterOpen(false);
              setErrorMessage('');
            }}
            title="Inscribirse"
            name="register"
          >
            <Signup 
              onRegister={handleRegisterSubmit} 
              onSwitchToLogin={() => {
                setIsRegisterOpen(false);
                setIsLoginOpen(true);
                setErrorMessage('');
              }}
              errorMessage={errorMessage}
            />
          </PopupWithForm>

          <Popup
            isOpen={isSuccessPopupOpen}
            onClose={() => setIsSuccessPopupOpen(false)}
            title="¡Éxito!"
            text={successMessage}
            buttonText="Cerrar"
          />

        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
