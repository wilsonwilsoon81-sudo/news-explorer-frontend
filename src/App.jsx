import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import SavedNews from './components/SavedNews/SavedNews';
import Preloader from './components/Preloader/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true); 
  const [currentUserEmail, setCurrentUserEmail] = useState('usuario@ejemplo.com');

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

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      {/* Eliminamos los estilos en línea, el CSS de #root ya lo maneja */}
      <div className="page">
        <Header 
          loggedIn={loggedIn} 
          email={currentUserEmail} 
          onSignOut={handleSignOut} 
        />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/saved-news" element={<SavedNews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
