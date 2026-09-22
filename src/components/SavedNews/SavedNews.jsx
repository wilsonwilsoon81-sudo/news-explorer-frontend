import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './savednews.css';

function SavedNews() {
  const mockSavedArticles = [
    {
      id: 101,
      urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2026-09-07T12:00:00Z",
      title: "Noticia guardada sobre tecnología",
      description: "Este es un artículo que el usuario decidió guardar para leer después.",
      source: { name: "Tech Daily" }
    },
    {
      id: 102,
      urlToImage: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2026-09-04T12:00:00Z",
      title: "Otra noticia interesante guardada",
      description: "El usuario buscó 'tecnología' y guardó este artículo de la lista de resultados.",
      source: { name: "Global News" }
    }
  ];

  const searchQuery = "tecnología";

  return (
    <section className="saved-news">
      <SavedNewsHeader 
        articlesLength={mockSavedArticles.length} 
        searchQuery={searchQuery} 
      />
      <NewsCardList cards={mockSavedArticles} />
    </section>
  );
}

export default SavedNews;
