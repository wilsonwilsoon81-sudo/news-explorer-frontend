import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, loggedIn, ...props }) {
  if (!loggedIn) {
    return <Navigate to="/" state={{ openLogin: true }} replace />;
  }
  return <Component {...props} />;
}

export default ProtectedRoute;
