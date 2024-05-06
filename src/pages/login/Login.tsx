import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styles from "../signup/Signup.module.css";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage('users');
  const [loading, setLoading] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  interface User {
    username: string;
    password: string;
   }
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginDetails.username || !loginDetails.password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const checkCredentials = async () => {
        const users = getItem();
        if (users) {
           const { username, password } = loginDetails;
           const matchedUser = users.find((user: User) => user.username === username && user.password === password);
           if (matchedUser) {
            localStorage.setItem('currentUser', username);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a delay of 2 seconds
             // Redirect to the todo page
             navigate("/todo");
             toast.success("logged in successfully", {
               duration: 5000,
             });
           } else {
             toast.error("Invalid username or password");
           }
        } else {
           toast.error("No users found");
        }
       };
        await checkCredentials();
    } catch (err) {
      // Handle errors
      console.log("error in handling signin details");
    } finally {
      setLoading(false);
     
    }
  };

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <form onSubmit={onFormSubmit} noValidate>
          <h1 className={styles.h1}>SignIn</h1>
          <div className={styles.inputBox}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input
              onChange={handleUserInputs}
              className={styles.inputText}
              type="text"
              placeholder="Enter username"
              id="username"
              name="username"
              value={loginDetails.username}
            />
          </div>
          <div className={styles.inputBox}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              onChange={handleUserInputs}
              className={styles.inputPassword}
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={loginDetails.password}
            />
          </div>
          <button className={styles.button}>
            {loading ?
              <div className={styles.spinner}></div>
              : "Login"
            }
          </button>
          <p className={styles.p}>
            Don&rsquo;t have an account ?{" "}
            <Link className={styles.a} to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
