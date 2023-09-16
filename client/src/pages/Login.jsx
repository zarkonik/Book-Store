import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import Register from "./Register";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logEmail, setlogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loginForm, setLoginForm] = useState(true);
  const [userRole, setUserRole] = useState("");

  const { user, setUser } = useGlobalContext();

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8800/authentification/register", {
          email: email, //ovo je body requesta
          password: password,
          userRole: userRole,
        })
        .then((response) => {
          console.log(response);
          //setMessage(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const { data } = await axios.get(
      "http://localhost:8800/authentification/register"
    );
    console.log(data);
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/authentification/login",
        {
          email: email, //pazi ovde bio si gresio
          password: password,
        }
      );
      console.log(response.data); //data je niz
      setUser(response.data[0]);
      window.location.assign("http://localhost:3000/books");
    } catch (error) {
      setMessage("Wrong username or password.");
      console.log(error);
    }
    //window.location.assign("http://localhost:3000/books");
  };

  return (
    //<form onSubmit={register}>
    <>
      {loginForm ? (
        <div className="wrapper">
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              //onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              //onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="remember-forget">
            <div className="checkbox-div">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <a href="#">Forgot password?</a>
          </div>
          <button onClick={handleLogin} className="btn">
            Login
          </button>

          <div className="register-link">
            <p>Don't have an account?</p>
            <button onClick={() => setLoginForm(!loginForm)}>Register</button>
          </div>

          {/*<button onClick={(e) => register(e)}>Register</button>*/}

          {/* <h1>Login</h1>
        {message && <p>{message}</p>}
        <label>Email: </label>
        <input
          type="text"
          name="loginEmail"
          onChange={(e) => setlogEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="text"
          name="loginPassword"
          onChange={(e) => setLogPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button> */}
        </div>
      ) : (
        <div className="registerForma">
          <h1>Register</h1>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your mail.."
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password.."
          />
          <input
            type="text"
            name="userRole"
            placeholder="admin/user"
            onChange={(e) => setUserRole(e.target.value)}
          />
          <button onClick={(e) => register(e)}>Sign up</button>
          <button onClick={() => setLoginForm(!loginForm)}>
            Back to Login
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
