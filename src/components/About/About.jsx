import './about.css';
import authorImage from '../../images/author.jpg'; // Asegúrate de tener esta imagen

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-container">
          <img 
            className="about__image" 
            src={authorImage} 
            alt="Wilson Rolando Herrera Romero" 
          />
        </div>
        <div className="about__content">
          <h2 className="about__title">Acerca del autor</h2>
          <div className="about__text-block">
            <p className="about__text">
              ¡Hola! Soy <strong>Wilson Rolando Herrera Romero</strong>, un apasionado Desarrollador Fullstack. 
              Me especializo en crear aplicaciones web modernas, escalables y centradas en el usuario.
            </p>
            <p className="about__text">
              Domino tecnologías como <strong>React.js, Node.js, Express, MongoDB</strong> y despliegue en la nube. 
              Mi experiencia en el bootcamp de <strong>Practicum</strong> me ha permitido desarrollar proyectos fullstack 
              robustos, implementando autenticación JWT, validación de datos y buenas prácticas de seguridad.
            </p>
            <p className="about__text">
              Estoy listo para ayudar a clientes y empresas a transformar sus ideas en productos digitales funcionales, 
              optimizando el rendimiento y garantizando una experiencia de usuario excepcional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
