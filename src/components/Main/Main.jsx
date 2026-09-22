import { useState } from 'react';
import './main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import newsApi from '../../utils/NewsApi';
import * as mainApi from '../../utils/MainApi';

const getInitialSearchState = () => {
  const savedResults = localStorage.getItem('searchResults');
  const savedQuery = localStorage.getItem('searchQuery');
  const savedDate = localStorage.getItem('searchDate');
  
  if (savedResults && savedQuery && savedDate) {
    const hoursDiff = (new Date() - new Date(savedDate)) / 3600000;
    if (hoursDiff < 24) {
      return {
        results: JSON.parse(savedResults),
        query: savedQuery,
        hasSearched: true
      };
    }
  }
  
  return { results: [], query: '', hasSearched: false };
};

function Main({ loggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const initialState = getInitialSearchState();
  const [searchResults, setSearchResults] = useState(initialState.results);
  const [searchQuery, setSearchQuery] = useState(initialState.query);
  const [hasSearched, setHasSearched] = useState(initialState.hasSearched);

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(keyword);
    setHasSearched(true);

    newsApi.getNews(keyword)
      .then((data) => {
        const articlesWithSavedFlag = data.articles.map(article => ({ ...article, isSaved: false }));
        
        localStorage.setItem('searchResults', JSON.stringify(articlesWithSavedFlag));
        localStorage.setItem('searchQuery', keyword);
        localStorage.setItem('searchDate', new Date().toISOString());
        
        setSearchResults(articlesWithSavedFlag);
      })
      .catch((_err) => {
        setError('Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSave = (article) => {
    const articleData = {
      keyword: searchQuery,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source?.name || 'Fuente desconocida',
      link: article.url,
      image: article.urlToImage
    };

    mainApi.saveArticle(articleData)
      .then(() => {
        setSearchResults(prevResults => 
          prevResults.map(item => 
            item.url === article.url ? { ...item, isSaved: true } : item
          )
        );
      })
      .catch((err) => {
        console.error('Error al guardar el artículo:', err);
        if (!loggedIn) {
          alert('Debes iniciar sesión para guardar artículos.');
        } else {
          alert('No se pudo guardar el artículo. Inténtalo de nuevo.');
        }
      });
  };

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
              onSave={handleSave}
            />
          )}
        </section>
      )}

      <About />
    </div>
  );
}

export default Main;
