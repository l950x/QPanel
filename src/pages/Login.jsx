import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "./callAxios";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
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
              required
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
              required
            />
            <label>Password</label>
          </div>
          <button className="button1" type="submit">
            Login
          </button>
        </form>
        <a href="/QPanel/register">Register</a>
      </div>
    </>
  );
};

export default Login;

// try {
//   const response = await axios.post(
//     "https://127.0.0.1:8000/api/login",
//     formData
//   );
//   localStorage.setItem("token", response.data.token);
//   navigate("/");
// } catch (error) {
//   if (error.response) {
//     const statusCode = error.response.status;
//     if (statusCode === 401) {
//       toast.error("Incorrect");
//     } else if (statusCode === 404) {
//       toast.error("404, API not found");
//     } else {
//       toast.error(`Error ${statusCode}, contact admin`);
//     }
//   } else if (error.request) {
//     toast.error("Server error");
//   } else {
//     toast.error("Request error");
//   }
// }
