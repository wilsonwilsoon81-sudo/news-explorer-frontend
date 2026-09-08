import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import SavedNews from './components/SavedNews/SavedNews';
import Preloader from './components/Preloader/Preloader';
import PopupWithForm from './components/PopupWithForm/PopupWithForm';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true); 
  const [currentUserEmail, setCurrentUserEmail] = useState('usuario@ejemplo.com');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

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

  const handleTestSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario del modal enviado");
    setIsTestModalOpen(false);
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
           onLoginClick={() => setIsTestModalOpen(true)} 
        />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/saved-news" element={<SavedNews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
         <PopupWithForm
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          title="Prueba de Modal"
          name="test-form"
          onSubmit={handleTestSubmit}
        >
          <input className="popup__input" type="email" placeholder="Correo" required />
          <input className="popup__input" type="password" placeholder="Contraseña" required />
          <button type="submit" className="popup__button">Enviar</button>
        </PopupWithForm>
      </div>
    </BrowserRouter>
  );
}

export default App;
