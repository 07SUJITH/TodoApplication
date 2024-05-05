// Home.tsx

import { Link } from 'react-router-dom';
import { FcTodoList } from "react-icons/fc";
import styles from './home.module.css'; // Import CSS module

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftContainer}>
        <FcTodoList size={300}/>
      </div>
      <div className={styles.rightContainer}>
        <h1>Welcome to Todo App</h1>
        <p className={styles.paragraph}>A simple and elegant task management tool.</p>
        <div className={styles.buttonsContainer}>
          <Link to="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={styles.signupButton}>Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
