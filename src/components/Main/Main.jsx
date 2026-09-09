import './main.css';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';

function Main() {
  const handleSearch = (term) => {
    console.log("🚀 Buscando noticias sobre:", term);
    // Aquí más adelante conectaremos con la API
  };

  return (
    <div className="main-page">
      {/* Parte Superior: Fondo oscuro con el Hero y el Buscador */}
      <section className="main__hero">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <p className="main__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
        </p>
        
        <SearchForm onSearch={handleSearch} />
      </section>

      {/* Parte Inferior: Bloque Acerca del Autor */}
      <About />
    </div>
  );
}

export default Main;
