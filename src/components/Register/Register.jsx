import './register.css';

function Register({ onRegister, onSwitchToLogin }) {
  return (
    <div className="auth-form">
      <input 
        className="auth-form__input" 
        type="text" 
        placeholder="Nombre" 
        required 
      />
      <input 
        className="auth-form__input" 
        type="email" 
        placeholder="Correo electrónico" 
        required 
      />
      <input 
        className="auth-form__input" 
        type="password" 
        placeholder="Contraseña" 
        required 
      />
      <button className="auth-form__button" type="submit">
        Regístrate
      </button>
      
      <div className="auth-form__switch">
        <p className="auth-form__text">
          ¿Ya eres miembro?{' '}
          <button 
            type="button" 
            className="auth-form__link" 
            onClick={onSwitchToLogin}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
