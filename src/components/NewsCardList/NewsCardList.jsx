import NewsCard from '../NewsCard/NewsCard';
import './newscardlist.css';

function NewsCardList({ cards }) {
  if (!cards || cards.length === 0) {
    return (
      <p className="news-card-list__empty-message">
        No se encontraron noticias. Intenta con otra palabra clave.
      </p>
    );
  }

  return (
    <section className="news-card-list">
      <ul className="news-card-list__grid">
        {cards.map((card) => (
          <li key={card.id || card._id} className="news-card-list__item">
            <NewsCard
              image={card.image}
              date={card.date}
              title={card.title}
              text={card.text}
              source={card.source}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NewsCardList;
