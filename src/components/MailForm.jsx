import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MailForm = () => {
  const [mail, setMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("https://127.0.0.1:8000/api/login")
      .then((response) => {
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401) {
            toast.error("Incorrect identifiant");
          } else if (statusCode === 404) {
            toast.error("404, API not found");
          } else {
            toast.error(`Error ${statusCode}, contact admin`);
          }
        } else if (error.request) {
          toast.error("Server error: ");
        } else {
          toast.error("Request error");
        }
      });
  };

  return (
    <div>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="number"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Email Address"
        />
        <button className="ui-btn">
          <span>Atomize</span>
        </button>
      </form>
    </div>
  );
};

export default MailForm;
