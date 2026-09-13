import { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './newscardlist.css';

function NewsCardList({ cards, searchQuery, loggedIn }) {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 3);
  };

  // Si no hay tarjetas, no renderizar nada
  if (!cards || cards.length === 0) {
    return null;
  }

  const visibleCardsList = cards.slice(0, visibleCards);
  const shouldShowButton = visibleCards < cards.length;

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">
        {searchQuery && `Resultados para: "${searchQuery}"`}
      </h2>
      <ul className="news-card-list__grid">
        {visibleCardsList.map((card, index) => (
          <li key={card.url || index} className="news-card-list__item">
            <NewsCard
              image={card.urlToImage}
              date={card.publishedAt}
              title={card.title}
              text={card.description}
              source={card.source.name}
              url={card.url}
              loggedIn={loggedIn}
            />
          </li>
        ))}
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
