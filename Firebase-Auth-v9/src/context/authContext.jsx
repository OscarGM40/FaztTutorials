import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
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

  const [user, setUser] = useState(null);
  const [ loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const sub = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });
    return () => sub.unsubscribe();
  }, [])

  const signup = async (email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredentials);
  }

  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredentials);
  }

  const logout = async () => {
    await auth.signOut();
  }
  
  const loginWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  return (
    <AuthContext.Provider value={{ signup, login,user,logout,loading,loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};