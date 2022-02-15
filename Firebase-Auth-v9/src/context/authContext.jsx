import { createContext, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export function AuthProvider({ children }) {

  const user = {
    login: true,
  }

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }


  return (
    <AuthContext.Provider value={{ signup }}>
      {children}
    </AuthContext.Provider>
  );
};