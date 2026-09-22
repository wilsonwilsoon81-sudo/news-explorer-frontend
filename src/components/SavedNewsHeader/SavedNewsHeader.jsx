import './savednewsheader.css';

function SavedNewsHeader({ articlesLength, searchQuery }) {
  return (
    <div className="saved-news-header">
      <h2 className="saved-news-header__title">Saved articles</h2>
      <p className="saved-news-header__text">
        You have {articlesLength} saved articles
      </p>
      {searchQuery && (
        <p className="saved-news-header__search-query">
          Searched for: <span className="saved-news-header__keyword">{searchQuery}</span>
        </p>
      )}
    </div>
  );
}

export default SavedNewsHeader;
