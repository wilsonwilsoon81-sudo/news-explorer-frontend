import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import SavedNews from './components/SavedNews/SavedNews';
import Preloader from './components/Preloader/Preloader';
import PopupWithForm from './components/PopupWithForm/PopupWithForm';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); // Cambiado a false para probar el flujo
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  // Estados para controlar qué modal está abierto
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

  // Funciones para abrir los modales
  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  // Funciones temporales para simular el envío de los formularios
  const handleLoginSubmit = (email, password) => {
    console.log("Login:, email");
    setIsLoginOpen(false);
    // Aquí más adelante conectaremos con la API
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Registro enviado");
    setIsRegisterOpen(false);
    // Aquí más adelante conectaremos con la API
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

        {/* Modal de Login */}
        <PopupWithForm
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          title="Iniciar sesión"
          name="login"
          onSubmit={handleLoginSubmit}
        >
          <Login 
            onLogin={handleLoginSubmit} 
            onSwitchToRegister={openRegisterModal} 
          />
        </PopupWithForm>

        {/* Modal de Registro */}
        <PopupWithForm
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          title="Registrarse"
          name="register"
          onSubmit={handleRegisterSubmit}
        >
          <Register 
            onRegister={handleRegisterSubmit} 
            onSwitchToLogin={openLoginModal} 
          />
        </PopupWithForm>

      </div>
    </BrowserRouter>
  );
}

export default App;
