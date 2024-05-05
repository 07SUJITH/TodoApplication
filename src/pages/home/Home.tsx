// Home.tsx
import './home.css';
import { Link } from 'react-router-dom';
import { FcTodoList } from "react-icons/fc";
const Home = () => {
  return (
    <div className="home-container">
        <div className="left-container">
            <FcTodoList size={300}/>
        </div>
        <div className="right-container ">
        <h1>Welcome to Todo App </h1>
      <p>A simple and elegant task management tool.</p>
      <div className="buttons-container">
        <Link to="/login">
        <button className="login-button">Login</button>
        </Link>
        <Link to="/signup">
        <button className="signup-button">Signup</button>
        </Link>
      </div>
        </div>
    
  
    </div>
  );
};

export default Home;
