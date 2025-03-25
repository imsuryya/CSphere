// Updated AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, sendEmailVerification, signOut } from "firebase/auth";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to send verification email
  const sendVerificationEmail = async (redirectUrl) => {
    if (!currentUser) return;

    return sendEmailVerification(currentUser, {
      url: redirectUrl || window.location.origin + '/dashboard',
      handleCodeInApp: true,
    });
  };

  // Function to logout the user
  const logout = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    sendVerificationEmail,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};