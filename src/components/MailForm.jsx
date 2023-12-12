import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
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
          if (statusCode === 404) {
            toast.error("404, API not found");
          } else {
            toast.error(`Error ${statusCode}, please contact admin`);
          }
        } else if (error.request) {
          toast.error("Internal server error");
        } else {
          toast.error("Request error please retry");
        }
      });
  };

  return (
    <div>
      <form className="mail-Form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="number"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="text"
          name="number"
          placeholder="Message"
        />
        <button className="mail-ui-btn">
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default MailForm;
