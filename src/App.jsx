import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  // Estados para controlar qué modal está abierto
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    setLoggedIn(false);
    setCurrentUserEmail('');
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const handleLoginSubmit = (email, password) => {
    console.log("Login enviado:", email);
    setSuccessMessage("Inicio de sesión exitoso");
    setIsSuccessPopupOpen(true);
    setIsLoginOpen(false);
    setLoggedIn(true);
    setCurrentUserEmail(email);
  };

  const handleRegisterSubmit = (name, email, password) => {
    console.log("Registro enviado:", name, email);
    setSuccessMessage("Usuario registrado. Inicie sesión.");
    setIsSuccessPopupOpen(true);
    setIsRegisterOpen(false);
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Header 
          loggedIn={loggedIn} 
          email={currentUserEmail} 
          onSignOut={handleSignOut} 
          onLoginClick={openLoginModal}
        />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/saved-news" element={<SavedNews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />

        {/* 1. Modal de Login */}
        <PopupWithForm
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          title="Iniciar sesión"
          name="login"
        >
          <Login 
            onLogin={handleLoginSubmit} 
            onSwitchToRegister={openRegisterModal} 
          />
        </PopupWithForm>

        {/* 2. Modal de Registro */}
        <PopupWithForm
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          title="Inscribirse"
          name="register"
        >
          <Signup 
            onRegister={handleRegisterSubmit} 
            onSwitchToLogin={openLoginModal} 
          />
        </PopupWithForm>

        {/* 3. Modal de Éxito (HERMANO, no hijo) */}
        <Popup
          isOpen={isSuccessPopupOpen}
          onClose={() => setIsSuccessPopupOpen(false)}
          title="¡Éxito!"
          text={successMessage}
          buttonText="Cerrar"
        />

        {/* 4. Modal de Error del Servidor (HERMANO, no hijo) */}
        <Popup
          isOpen={isErrorPopupOpen}
          onClose={() => setIsErrorPopupOpen(false)}
          title="Ha ocurrido un error"
          text="Por favor, inténtelo de nuevo más tarde."
          buttonText="Cerrar"
        />

      </div>
    </BrowserRouter>
  );
}

export default App;
