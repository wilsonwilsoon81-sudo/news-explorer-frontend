import './main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCard from '../NewsCard/NewsCard';

function Main() {
  const handleSearch = (term) => {
    console.log("🚀 ¡Formulario enviado! Buscando noticias sobre:", term);
  };

  const mockCard = {
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    date: "30 de agosto, 2026",
    title: "Este es un título de prueba muy largo para verificar que se trunca correctamente con puntos suspensivos",
    text: "Este es el texto de la noticia. También probaremos si se trunca después de tres líneas para mantener el diseño de la tarjeta limpio y uniforme.",
    source: "The New York Times"
  };

  return (
    <section className="main">
      <h1 className="main__title">Lo que pasa en el mundo</h1>
      <p className="main__subtitle">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
      </p>
      
      <SearchForm onSearch={handleSearch} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', padding: '0 20px' }}>
        <div style={{ width: '350px' }}>
          <NewsCard 
            image={mockCard.image}
            date={mockCard.date}
            title={mockCard.title}
            text={mockCard.text}
            source={mockCard.source}
          />
        </div>
      </div>
    </section>
  );
}

export default Main;
