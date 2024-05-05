import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword, isValidUsername } from "../../utils/regexMatcher.js";
import "./Signup.css";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setItem, getItem } = useLocalStorage('users');
  const [loading, setLoading] = useState<boolean>(false);
  const [signupDetails, setSignupDetails] = useState<{
    email: string;
    username: string;
    password: string;
  }>({
    email: "",
    username: "",
    password: "",
  });

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !signupDetails.email ||
      !signupDetails.username ||
      !signupDetails.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!isValidEmail(signupDetails.email)) {
      toast.error("Invalid Email ID");
      return;
    }
    if (!isValidUsername(signupDetails.username)) {
      toast.error("username should be at least 5 characters");
      return;
    }
    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Invalid Password, Password should be 6 to 16 characters long with at least a number and special character"
      );
      return;
    }

    try {
      setLoading(true);
      
      const users = getItem() || [];
      users.push({ 
         username: signupDetails.username, 
         email: signupDetails.email,
         password: signupDetails.password });
      setItem(users);
      // creating a pause here to create a feel of loading .
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a delay of 2 seconds
      
      navigate("/login");
      toast.success("Account created successfully. Please verify your email.", {
        duration: 5000,
      });

    } catch (err) {
      // Handle errors
      console.log("error in handling signup details");
    } finally {
      setLoading(false);
      setSignupDetails({
        email: "",
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="animated-background">

    <div className="container">
    <form
      onSubmit={onFormSubmit}
      noValidate
    >
      <h1>SignUp</h1>
      <div className="input_box">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleUserInputs}
          type="email"
          placeholder="Enter your email"
          id="email"
          name="email"
          value={signupDetails.email}
          ref={emailRef}
        />
      </div>
      <div className="input_box">
        <label htmlFor="username">Username</label>
        <input
          onChange={handleUserInputs}
          type="text"
          placeholder="Enter username"
          id="username"
          name="username"
          value={signupDetails.username}
        />
      </div>
      <div className="input_box">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleUserInputs}
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
          value={signupDetails.password}
        />
      </div>
      <button>
        {loading?
          <div className="spinner"></div>
          : "Create account"
        }
      </button>
      <p>
        already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </form>
  </div>
    </div>
    
  );
};

export default Signup;
