import { useState } from 'react';
import './login.css';

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Este es un campo obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Formato de correo electrónico incorrecto';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Este es un campo obligatorio.';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    // ESTO ES PARA QUE TÚ VEAS EN LA CONSOLA QUE SÍ FUNCIONA:
    console.log("Validación ejecutada. Errores encontrados:", newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin(email, password);
    }
  };

  // Solo para estilos visuales, NO deshabilitamos el botón HTML
  const isButtonActive = email.trim() && password.trim() && /\S+@\S+\.\S+/.test(email);

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
        {/* El mensaje de error solo se muestra si existe en el estado */}
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
      
      {/* Quitamos el atributo 'disabled' para que siempre se pueda hacer clic y validar */}
      <button 
        className={`auth-form__button ${!isButtonActive ? 'auth-form__button_disabled' : ''}`} 
        type="submit"
      >
        Iniciar sesión
      </button>
      
      <div className="auth-form__switch">
        <p className="auth-form__text">
          o{' '}
          <button type="button" className="auth-form__link" onClick={onSwitchToRegister}>
            inscribirse
          </button>
        </p>
      </div>
    </form>
  );
}

export default Login;
