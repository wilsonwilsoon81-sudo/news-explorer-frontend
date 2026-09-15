import { useState } from 'react';
import { formatDate } from '../../utils/dateFormatter';
import './newscard.css';

function NewsCard({ image, date, title, text, source, url, loggedIn, _onSave, _onDelete, isSaved }) {
  const formattedDate = date ? formatDate(date) : '';
  const [isLocalSaved, setIsLocalSaved] = useState(isSaved || false);

  const handleBookmarkClick = () => {
    if (!loggedIn) return;

    if (isLocalSaved) {
      setIsLocalSaved(false);
    
    } else {
      
      setIsLocalSaved(true);
      console.log("Guardar artículo:", title);
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img className="news-card__image" src={image || 'https://via.placeholder.com/358x230?text=No+Image'} alt={title} />
        
        <button 
          className={`news-card__bookmark-button ${!loggedIn ? 'news-card__bookmark-button_inactive' : ''} ${isLocalSaved ? 'news-card__bookmark-button_active' : ''}`} 
          aria-label={isLocalSaved ? "Eliminar artículo" : "Guardar artículo"}
          type="button"
          onClick={handleBookmarkClick}
        >
          {!loggedIn && (
            <span className="news-card__tooltip">Inicia sesión para guardar artículos</span>
          )}
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isLocalSaved ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3H7C5.89543 3 5 3.89543 5 5V21L12 16L19 21V5C19 3.89543 18.1046 3 17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="news-card__content">
        <p className="news-card__date">{formattedDate}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="news-card__link">
        <h3 className="news-card__title">{title}</h3>
        </a>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
