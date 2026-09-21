import { useState, useEffect } from 'react';
import * as mainApi from '../../utils/MainApi';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import './savednews.css';

function SavedNews() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    mainApi.getSavedArticles()
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        console.error('Error al cargar artículos guardados:', err);
        setError('No se pudieron cargar los artículos guardados.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDeleteArticle = (articleId) => {
    mainApi.deleteArticle(articleId)
      .then(() => {
        setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
      })
      .catch((err) => {
        console.error('Error al eliminar el artículo:', err);
        alert('No se pudo eliminar el artículo. Inténtalo de nuevo.');
      });
  };

  const getFormattedKeywords = () => {
    if (articles.length === 0) return '';

    const keywordCounts = {};
    articles.forEach((article) => {
      const kw = article.keyword ? article.keyword.toLowerCase() : 'sin tema';
      keywordCounts[kw] = (keywordCounts[kw] || 0) + 1;
    });

    const sortedKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);

    if (sortedKeywords.length <= 3) {
      return sortedKeywords.join(', ');
    } else {
      const firstTwo = sortedKeywords.slice(0, 2).join(', ');
      const remaining = sortedKeywords.length - 2;
      return `${firstTwo} y ${remaining} más`;
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div className="saved-news__error">{error}</div>;
  }

  return (
    <section className="saved-news">
      <SavedNewsHeader 
        articlesLength={articles.length} 
        searchQuery={getFormattedKeywords()}
      />
      
      <NewsCardList 
        cards={articles} 
        loggedIn={true}
        isSavedPage={true}
        onDelete={handleDeleteArticle}
      />
    </section>
  );
}

export default SavedNews;
