import './main.css';
import SearchForm from '../SearchForm/SearchForm';

function Main() {
  
  const handleSearch = (term) => {
    console.log("Buscando noticias sobre:", term);
  };

  return (
    <section className="main">
      <h1 className="main__title">Lo que pasa en el mundo</h1>
      <p className="main__subtitle">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
      </p>
      <SearchForm onSearch={handleSearch} />
    </section>
  );
}

export default Main;
