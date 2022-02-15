import{ useAuth } from "../context/authContext";

const Home = () => {

  const context = useAuth();
  console.log(context);
  
  return (
    <div>Home</div>
  )
}

export default Home