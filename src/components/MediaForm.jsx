import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MediaForm = () => {
  const [media, setMedia] = useState("");
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");

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
      <ToastContainer/>
        <form onSubmit={handleSubmit}>
        <select
          name="media"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          placeholder="Which media ?"
        >
          <option value="">Which media ?</option>
          <option value="Instagram">Instagram</option>
          <option value="Tiktok">Tiktok</option>
          <option value="Youtube">Youtube</option>
        </select>

        <select
          name="services"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Which services ?"
        >
          <option value="">Which services ?</option>
          {media === 'Youtube' ? (
            <option value="Dislike">Dislike</option>
          ) : null}
          <option value="Likes">Likes</option>
          <option value="Followers">Followers</option>
        </select>

        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link (https://...)"
        />

        <input
          type="text"
          name="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />

        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default MediaForm
