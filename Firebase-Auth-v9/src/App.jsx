import { Routes, Route, } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import RegisterFormik from './components/RegisterFormik'
import { AuthProvider } from './context/authContext'


function App() {

  return (
    <AuthProvider >
      <div className="bg-slate-300 h-screen text-white flex">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterFormik />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
