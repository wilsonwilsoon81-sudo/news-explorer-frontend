import { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './newscardlist.css';

function NewsCardList({ cards, searchQuery, loggedIn, isSavedPage = false, onDelete, onSave }) {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 3);
  };

  if (!cards || cards.length === 0) {
    return null;
  }

  const visibleCardsList = cards.slice(0, visibleCards);
  const shouldShowButton = visibleCards < cards.length;

  return (
    <section className="news-card-list">
      {searchQuery && (
        <h2 className="news-card-list__title">
          {isSavedPage ? `Por temas: ${searchQuery}` : `Resultados para: "${searchQuery}"`}
        </h2>
      )}
      
      <ul className="news-card-list__grid">
        {visibleCardsList.map((card, index) => {
          const isArticleSaved = isSavedPage || !!card._id;
          const cardKey = isArticleSaved ? card._id : (card.url || index);

          return (
            <li key={cardKey} className="news-card-list__item">
              <NewsCard
                image={isArticleSaved ? card.image : card.urlToImage}
                date={isArticleSaved ? card.date : card.publishedAt}
                title={card.title}
                text={isArticleSaved ? card.text : card.description}
                source={isArticleSaved ? card.source : (card.source?.name || 'Fuente desconocida')}
                url={isArticleSaved ? card.link : card.url}
                keyword={card.keyword}
                isSaved={isArticleSaved || card.isSaved}
                isSavedPage={isSavedPage}
                loggedIn={loggedIn}
                
                _onSave={onSave ? () => onSave(card) : undefined}
                _onDelete={isArticleSaved && onDelete ? () => onDelete(card._id) : undefined}
              />
            </li>
          );
        })}
      </ul>
      
      {shouldShowButton && (
        <div className="news-card-list__show-more">
          <button 
            className="news-card-list__button"
            onClick={handleShowMore}
          >
            Mostrar más
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
