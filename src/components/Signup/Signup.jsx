import { useState } from 'react';
import './signup.css';

function Signup({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validación de formato de email
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
    
    // El nombre solo es obligatorio si el email ya es válido (porque el campo aparece entonces)
    if (isEmailValid && !name.trim()) {
      newErrors.name = 'Este es un campo obligatorio.';
    }

    // MOCK: Simulamos un error de servidor (email ya registrado) para que veas cómo se ve en el Figma
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

  // El botón se activa solo si todos los campos visibles son válidos
  const isButtonActive = isEmailValid && password.trim() && (isEmailValid ? name.trim() : true);

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Campo Email */}
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
      
      {/* Campo Contraseña */}
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

      {/* Campo Nombre: SOLO aparece si el email es válido */}
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
      
      {/* Botón de envío */}
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
