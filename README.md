# News Explorer (Frontend)

-🔗 **Enlace a la aplicación desplegada:** [https://zesty-kangaroo-a0d7db.netlify.app/](https://zesty-kangaroo-a0d7db.netlify.app/)
-🔧 **Repositorio del Backend:** [News Explorer Backend](https://github.com/wilsonwilsoon81-sudo/news-explorer-backend.git)
-<img width="320" height="226" alt="demo" src="https://github.com/user-attachments/assets/4262799f-2a4d-42a4-a32b-1920ede41b88" />

## 📖 Descripción
News Explorer es una aplicación web Full Stack que permite a los usuarios buscar noticias de todo el mundo, autenticarse de forma segura y guardar sus artículos favoritos en un perfil privado. Este repositorio contiene el código del frontend, desarrollado como proyecto final del programa de Desarrollo Web de TripleTen.

## 🛠️ Stack Tecnológico
- **Core:** React.js 19, JavaScript (ES6+)
- **Enrutamiento:** React Router DOM v7
- **Build Tool:** Vite
- **Estilos:** CSS3 (Flexbox, Grid, Mobile-First, Metodología BEM)
- **Consumo de Datos:** Fetch API (Async/Await)

## 🏗️ Decisiones de Arquitectura y Diseño
- **Gestión de Estado:** Se optó por **React Context API** en lugar de Redux. Para la escala de esta aplicación, Context es suficiente para manejar el estado del usuario (`currentUser`) y los artículos guardados, manteniendo el bundle size ligero y el código simple.
- **Seguridad y Rutas:** Implementación de un componente `ProtectedRoute` (HOC) que verifica la presencia y validez del JWT antes de renderizar vistas privadas (`/saved-news`), redirigiendo al usuario al login si no está autenticado.
- **Consumo de API:** Uso de `Fetch API` con `async/await` y una función centralizada `checkResponse` para manejar errores HTTP y de red de forma consistente antes de que los datos lleguen a los componentes.
- **Validación:** Validación de formularios en el lado del cliente (longitud, formato de email) antes de realizar la petición al servidor, mejorando la UX y reduciendo carga innecesaria en el backend.


## ✨ Funcionalidades Clave
- 🔍 Búsqueda de noticias en tiempo real (integración con API externa).
- 👤 Sistema completo de Autenticación (Registro, Login, Cierre de sesión).
- 💾 Persistencia de artículos guardados asociados al ID del usuario.
- 📱 Diseño 100% responsivo (Mobile-First) y accesible.
- ⚡ Manejo elegante de estados de carga (Preloader) y mensajes de error.

## 💻 Instalación y ejecución local
1. Clona este repositorio:
   ```bash
   git clone https://github.com/wilsonwilsoon81-sudo/news-explorer-frontend.git
   ```
2. Navega a la carpeta del proyecto:
   ```bash
   cd news-explorer-frontend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre tu navegador en http://localhost:5173/
-(Nota: Para que la app funcione completamente, asegúrate de tener el backend corriendo localmente o apuntando a la URL de producción en el archivo de configuración).

## 🚀 Despliegue
El frontend está desplegado en Netlify con integración continua. Cada push a la rama main dispara un nuevo build y despliegue automático.

## 👨‍💻 Autor
**Wilson Rolando Herrera Romero**  
-📧 [wilson.wilsoon81@gmail.com](mailto:wilson.wilsoon81@gmail.com)  
-💼 [LinkedIn](https://www.linkedin.com/in/wilson-herrera-bb009a253)  
-🌐 [Portafolio](https://wilsonwilsoon81-sudo.github.io/Portafolio/)
