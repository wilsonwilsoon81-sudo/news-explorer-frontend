import { useState } from 'react';
import './searchform.css';

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      setError('Por favor, introduzca una palabra clave');
      return;
    }
    
    setError('');
    onSearch(keyword);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input 
        className="search-form__input" 
        type="text" 
        placeholder="Introduce un tema" 
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          if (error) setError('');
        }}
      />
      <button className="search-form__button" type="submit">
        Buscar
      </button>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
