import { Routes, Route, } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { AuthProvider } from './context/authContext'


function App() {

  return (
    <AuthProvider >
      <div className="bg-slate-300 h-screen text-white flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
