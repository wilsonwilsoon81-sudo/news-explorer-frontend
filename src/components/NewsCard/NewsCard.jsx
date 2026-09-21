import { formatDate } from '../../utils/dateFormatter';
import './newscard.css';

function NewsCard({ image, date, title, text, source, url, loggedIn, _onSave, _onDelete, isSaved, isSavedPage, keyword }) {
  const formattedDate = date ? formatDate(date) : '';

  const handleBookmarkClick = () => {
    if (!loggedIn) return;

    if (isSaved) {
      if (isSavedPage && _onDelete) {
        _onDelete();
      }
    
    } else {
      if (_onSave) _onSave();
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        {isSaved && keyword && (
          <span className="news-card__keyword">{keyword}</span>
        )}
        
        <img className="news-card__image" src={image || 'https://via.placeholder.com/358x230?text=No+Image'} alt={title} />
        
        <button 
          className={`news-card__bookmark-button ${!loggedIn ? 'news-card__bookmark-button_inactive' : ''} ${isSaved ? 'news-card__bookmark-button_active' : ''}`} 
          aria-label={isSaved ? (isSavedPage ? "Eliminar artículo" : "Artículo guardado") : "Guardar artículo"}
          type="button"
          onClick={handleBookmarkClick}
        >
          {!loggedIn && (
            <span className="news-card__tooltip">Inicia sesión para guardar artículos</span>
          )}
          
          {isSaved ? (
            isSavedPage ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="news-card__icon-trash">
                <rect x="3" y="7" width="18" height="2" fill="#E5E5E5" />
                <rect x="9" y="3" width="6" height="2" fill="currentColor" />
                <rect x="3" y="5" width="18" height="2" fill="currentColor" />
                <rect x="5" y="8" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="9" y1="11" x2="9" y2="20" stroke="currentColor" strokeWidth="2" />
                <line x1="15" y1="11" x2="15" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="news-card__icon-bookmark">
                <path d="M17 3H7C5.89543 3 5 3.89543 5 5V21L12 16L19 21V5C19 3.89543 18.1046 3 17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )
          ) : (
            
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="news-card__icon-bookmark">
              <path d="M17 3H7C5.89543 3 5 3.89543 5 5V21L12 16L19 21V5C19 3.89543 18.1046 3 17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}

          {isSaved && isSavedPage && (
            <span className="news-card__tooltip-remove">Remove from saved</span>
          )}
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
