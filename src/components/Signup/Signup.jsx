import { useState } from 'react';
import './signup.css';

function Signup({ onRegister, onSwitchToLogin, errorMessage }) { // <-- Agregamos errorMessage
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Este es un campo obligatorio.';
    } else if (!isEmailValid) {
      newErrors.email = 'Formato de correo electrónico incorrecto';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Este es un campo obligatorio.';
    }
    
    if (isEmailValid && !name.trim()) {
      newErrors.name = 'Este es un campo obligatorio.';
    } else if (isEmailValid && name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
    }

    if (email === 'test@test.com') {
      newErrors.email = 'Este correo electrónico no está disponible';
    }

    return newErrors;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onRegister(name, email, password);
    }
  };

  const isButtonActive = isEmailValid && password.trim() && (isEmailValid ? name.trim().length >= 2 : true);

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="auth-form__field">
        <label className="auth-form__label">Correo electrónico</label>
        <input 
          className={`auth-form__input ${errors.email ? 'auth-form__input_error' : ''}`}
          type="email" 
          placeholder="Introduce tu correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
        />
        {errors.email && <p className="auth-form__error">{errors.email}</p>}
      </div>
      
      <div className="auth-form__field">
        <label className="auth-form__label">Contraseña</label>
        <input 
          className={`auth-form__input ${errors.password ? 'auth-form__input_error' : ''}`}
          type="password" 
          placeholder="Introduce tu contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
        />
        {errors.password && <p className="auth-form__error">{errors.password}</p>}
      </div>

      {isEmailValid && (
        <div className="auth-form__field">
          <label className="auth-form__label">Nombre de usuario</label>
          <input 
            className={`auth-form__input ${errors.name ? 'auth-form__input_error' : ''}`}
            type="text" 
            placeholder="Introduce tu nombre de usuario"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
          />
          {errors.name && <p className="auth-form__error">{errors.name}</p>}
        </div>
      )}
      
      {errorMessage && <p className="auth-form__error" style={{ textAlign: 'center', marginBottom: '10px' }}>{errorMessage}</p>}
      
      <button 
        className={`auth-form__button ${!isButtonActive ? 'auth-form__button_disabled' : ''}`} 
        type="submit"
      >
        Inscribirse
      </button>
      
      <div className="auth-form__switch">
        <p className="auth-form__text">
          o{' '}
          <button type="button" className="auth-form__link" onClick={onSwitchToLogin}>
            Iniciar sesión
          </button>
        </p>
      </div>
    </form>
  );
}

export default Signup;
