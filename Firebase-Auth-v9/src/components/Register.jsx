import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate} from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate()
  
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState("");
  
  const { signup } = useAuth()
  
  const handleChange = (e) => {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      await signup(user.email, user.password);
      navigate('/')
      setTimeout(() => alert("Welcome"), 1000);
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="container mx-auto p-5">
      { error && <p className="text-black">{error}</p> }
      <form 
        onSubmit={handleSubmit} 
        className="text-black"
        >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onInvalid={() => setCustomValidity("Email invalid")}
          onChange={handleChange}
          placeholder="Enter your email"
          />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="*********" />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register