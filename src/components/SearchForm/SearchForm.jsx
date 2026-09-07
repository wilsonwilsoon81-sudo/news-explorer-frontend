import { useState } from 'react';
import './searchform.css';

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsFormValid(value.trim().length >= 2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Introduce una palabra clave para buscar noticias"
        value={searchTerm}
        onChange={handleChange}
        required
      />
      <button 
        className={`search-form__button ${!isFormValid ? 'search-form__button_disabled' : ''}`} 
        type="submit"
        disabled={!isFormValid}
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
