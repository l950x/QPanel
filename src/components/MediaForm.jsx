import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MediaForm = () => {
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("default");
  if (token) {
    setUserId(jwtDecode(token).username);
  }

  const [media, setMedia] = useState("");
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!media || !service || !link || !quantity) {
      toast.error("Please fill in all the fields");
      return;
    }

    const url = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!url.test(link)) {
      toast.error("Please provide a valid URL link");
      return;
    }

    const quantityValue = parseInt(quantity, 10);
    if (isNaN(quantityValue) || quantityValue <= 0) {
      toast.error("Please provide a valid quantity value");
      return;
    }

    const data = {
      media: media,
      services: service,
      link: link,
      number: quantity,
      userId: userId,
    };

    axios
      .post("https://127.0.0.1:8000/api/media", data)
      .then((response) => {
        toast.success(response.data.message);
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
      <form className="Form" onSubmit={handleSubmit}>
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
          {media === "Youtube" ? (
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
        <button className="ui-btn">
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default MediaForm;
