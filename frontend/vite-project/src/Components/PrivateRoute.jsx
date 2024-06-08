import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthContext } from '../hooks/UseAuthContext';

const PrivateRoute = () => {
  const { user } = UseAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
