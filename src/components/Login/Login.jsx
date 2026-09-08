import './login.css';

function Login({ onLogin, onSwitchToRegister }) {
  return (
    <div className="auth-form">
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
        Inicia sesión
      </button>
      
      <div className="auth-form__switch">
        <p className="auth-form__text">
          ¿Aún no eres miembro?{' '}
          <button 
            type="button" 
            className="auth-form__link" 
            onClick={onSwitchToRegister}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
