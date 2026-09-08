import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './savednews.css';

function SavedNews() {
  const savedArticles = [
    {
      id: 101,
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      date: "05 de septiembre, 2026",
      title: "Noticia guardada sobre tecnología",
      text: "Este es un artículo que el usuario decidió guardar para leer después.",
      source: "Tech Daily"
    },
    {
      id: 102,
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80",
      date: "04 de septiembre, 2026",
      title: "Otra noticia interesante guardada",
      text: "El usuario buscó 'tecnología' y guardó este artículo de la lista de resultados.",
      source: "Global News"
    }
  ];

  const searchQuery = "tecnología";

  return (
    <section className="saved-news">
      <SavedNewsHeader 
        articlesLength={savedArticles.length} 
        searchQuery={searchQuery} 
      />
      <NewsCardList cards={savedArticles} />
    </section>
  );
}

export default SavedNews;
