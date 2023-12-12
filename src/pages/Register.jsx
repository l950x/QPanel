import { useState } from "react";
import Axios from "./callAxios";
import "../assets/css/register.css";
import Button from "../components/button/Button";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    agreeTerms: false,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let field in formData) {
      if (!formData[field]) {
        toast.error(`Please complete ${field}`);
        return;
      }
    }

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regexEmail.test(formData.email)) {
      toast.error("Please provide a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Please provide a valid password. (6 characters minimum)");
      return;
    }

    setRegisterLoading(true);
    Axios.post("/register", formData)
      .then((response) => {
        if (response.data.status === 1) {
          navigate("/QPanel/login");
          toast.success("Account created");
        } else if (response.data.status === 0) {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("error", error.response);
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  };

  return (
    <>
      <div className="login-box">
        <h2>Register</h2>
        <form className="form" onSubmit={handleSubmit} method="post">
          <div className="user-box">
            <input
              className="input-field"
              type="text"
              name="username"
              onChange={handleChange}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              className="input-field"
              type="text"
              name="email"
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              className="input-field"
              type="text"
              name="phone"
              onChange={handleChange}
            />
            <label>Phone</label>
          </div>
          <div className="user-box">
            <input
              className="input-field"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          <label>
            Agree to terms:
            <input type="checkbox" name="agreeTerms" onChange={handleChange} />
          </label>
          <div className="loginBtnCtn">
          <div className="registerBtnCtn">
            {registerLoading ? (
              <Button loading="1" />
            ) : (
              <Button text="Register" type="submit" />
            )}
          </div>
            <Button text="Login" redirectTo="/QPanel/login" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
