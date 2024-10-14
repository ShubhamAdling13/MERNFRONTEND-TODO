// PrivateRoute.js
import { Navigate } from 'react-router-dom';

// PrivateRoute checks for token in localStorage
const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  // If the token is available, render the protected component, otherwise redirect to login
  return token ? <Element /> : <Navigate to="/" />;
};

export default PrivateRoute;
