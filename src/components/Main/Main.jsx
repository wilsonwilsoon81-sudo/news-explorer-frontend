import './main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main() {
  const handleSearch = (term) => {
    console.log("🚀 ¡Formulario enviado! Buscando noticias sobre:", term);
  };

  const mockCards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      date: "30 de agosto, 2026",
      title: "Avances en inteligencia artificial",
      text: "La IA está transformando la manera en que interactuamos con la tecnología a diario.",
      source: "Tech News"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80",
      date: "29 de agosto, 2026",
      title: "Nuevas tendencias en periodismo digital",
      text: "Los medios de comunicación se adaptan a los nuevos formatos de consumo de noticias.",
      source: "Media Daily"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
      date: "28 de agosto, 2026",
      title: "El futuro del trabajo remoto",
      text: "Cada vez más empresas adoptan modelos híbridos para sus empleados.",
      source: "Business Insider"
    }
  ];

  return (
    <section className="main">
      <h1 className="main__title">Lo que pasa en el mundo</h1>
      <p className="main__subtitle">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
      </p>
      
      <SearchForm onSearch={handleSearch} />

      <NewsCardList cards={mockCards} />
    </section>
  );
}

export default Main;
