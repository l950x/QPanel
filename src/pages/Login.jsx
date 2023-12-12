import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "./callAxios";
import Button from "../components/button/Button";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!regexEmail.test(email)) {
      toast.error("Please provide a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Please provide a valid password.");
      return;
    }

    setLoginLoading(true);
    const formData = {
      email: email,
      password: password,
    };

    Axios.post("/login", formData).then((response) => {
      if (response.data.status === 1) {
        localStorage.setItem("token", response.data.token);
        navigate("/QPanel/");
      } else if (response.data.status === 0) {
        toast.error("Incorrect identifiant");
      }
      setLoginLoading(false);
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="login-box">
        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit} method="post">
          <div className="user-box">
            <input
              className="input-field"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <label>Password</label>
          </div>
          <div className="loginBtnCtn">
            {loginLoading ? (
              <Button loading="1" />
            ) : (
              <Button text="Login" type="submit" />
            )}
            <Button text="Register" redirectTo="/QPanel/register" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
