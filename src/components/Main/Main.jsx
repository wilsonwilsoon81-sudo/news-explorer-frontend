import { useState, useEffect } from 'react';
import './main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import newsApi from '../../utils/NewsApi';

function Main({ loggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(keyword);
    setHasSearched(true);

    newsApi.getNews(keyword)
      .then((data) => {
        localStorage.setItem('searchResults', JSON.stringify(data.articles));
        localStorage.setItem('searchQuery', keyword);
        localStorage.setItem('searchDate', new Date().toISOString());
        
        setSearchResults(data.articles);
      })
      .catch((err) => {
        setError('Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const savedResults = localStorage.getItem('searchResults');
    const savedQuery = localStorage.getItem('searchQuery');
    const savedDate = localStorage.getItem('searchDate');
    
    if (savedResults && savedQuery && savedDate) {
      const hoursDiff = (new Date() - new Date(savedDate)) / 3600000;
      if (hoursDiff < 24) {
        setSearchResults(JSON.parse(savedResults));
        setSearchQuery(savedQuery);
        setHasSearched(true);
      }
    }
  }, []);

  return (
    <div className="main-page">
      <section className="main__hero">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <p className="main__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
        </p>
        
        <SearchForm onSearch={handleSearch} />
      </section>

      {hasSearched && (
        <section className="main__results">
          {isLoading ? (
            <div className="main__loader">
              <div className="preloader-circle"></div>
              <p className="main__loader-text">Buscando noticias...</p>
            </div>
          ) : error ? (
            <div className="main__error">
              <p>{error}</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="main__no-results">
<svg className="main__no-results-icon" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="48" cy="48" r="40" stroke="#B6BCBF" strokeWidth="4" fill="none"/>
  <circle cx="36" cy="40" r="4" fill="#B6BCBF"/>
  <circle cx="60" cy="40" r="4" fill="#B6BCBF"/>
  <path d="M36 64 Q48 52 60 64" stroke="#B6BCBF" strokeWidth="4" strokeLinecap="round" fill="none"/>
  <line x1="78" y1="78" x2="99" y2="99" stroke="#B6BCBF" strokeWidth="4" strokeLinecap="round"/>
</svg>
              <h3 className="main__no-results-title">No se encontró nada</h3>
              <p className="main__no-results-text">
                Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
              </p>
            </div>
          ) : (
            <NewsCardList 
              cards={searchResults} 
              searchQuery={searchQuery}
              loggedIn={loggedIn}
            />
          )}
        </section>
      )}

      <About />
    </div>
  );
}

export default Main;
