import './newscard.css';

function NewsCard({ image, date, title, text, source }) {
  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img 
          className="news-card__image" 
          src={image} 
          alt={title} 
        />
        <button 
          className="news-card__bookmark-button" 
          aria-label="Guardar artículo"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3H7C5.89543 3 5 3.89543 5 5V21L12 16L19 21V5C19 3.89543 18.1046 3 17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
