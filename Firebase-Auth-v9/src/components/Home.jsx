import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Home = () => {

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/register")
    } catch (error) {
      console.log(error)
    }
  }

  if (!user && !loading) return <Navigate to="/login" replace />

  return (
    <>
      {loading && <p>Loading...</p>}
      {user && <main className="grid place-content-center w-full  ">

        <div className="bg-white rounded shadow-md px-8 py-6 mb-4 flex flex-col items-center">
          <h2 className="text-xl mt-4 ml-4 text-black">Welcome, ${user.displayName || user.email}!</h2>
          {user.displayName && (
            <img src={user.photoURL} alt="avatar" className="h-12 w-12 rounded-3xl shadow-xl" />
          )}
          <button onClick={handleLogout} className="text-white bg-black w-1/2 px-3 py-2 rounded-md mt-3 cursor-pointer">Logout</button>
        </div>
      </main>
      }
    </>
  )

}

export default Home