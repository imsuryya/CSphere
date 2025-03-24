// Updated PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from 'prop-types';

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // Check if user's email is verified
  if (!currentUser.emailVerified) {
    // Store the email in session storage
    sessionStorage.setItem('userEmail', currentUser.email);
    return <Navigate to="/verify-email" />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};