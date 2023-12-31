import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeCircles } from "react-loader-spinner";
import Axios from "../pages/callAxios";

const MediaForm = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [media, setMedia] = useState("");
  const [service, setService] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mediaSelected, setMediaSelected] = useState(false);
  
  const setMediaBasedOnLink = (link) => {
    if (link.includes("youtube.com")) {
      setMedia("Youtube");
      setMediaSelected(true);
    } else if (link.includes("instagram.com/p")) {
      setService("Likes");
    } else if (link.includes("instagram.com")) {
      setMedia("Instagram");
      setMediaSelected(true);
    } else if (link.includes("tiktok.com")) {
      setMedia("Tiktok");
      setMediaSelected(true);
    } else {
      setMediaSelected(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loading) {
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
      if (isNaN(quantityValue) || quantityValue < 100) {
        toast.error("Please provide a valid quantity value (+100)");
        return;
      }
      setLoading(true);
      const data = {
        media: media,
        services: service,
        link: link,
        number: quantity,
      };

      Axios
        .post("/media", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
        })
        .finally(() => {
          setMedia("");
          setService("");
          setLink("");
          setQuantity("");
          setMediaSelected(false);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setMediaBasedOnLink(e.target.value);
          }}
          placeholder="Link (https://...)"
        />
        <hr className="mediaHr" />
        <select
          name="media"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          placeholder="Which media ?"
          disabled={mediaSelected}
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
            <option value="Views">Views</option>
          ) : null}
          <option value="Likes">Likes</option>
          <option value="Followers">Followers</option>
        </select>
        {/* <hr className="mediaHr" />
        <div className="service">
          <a>
            <Icon
              icon="mdi:user-add"
              height={40}
              style={{ verticalAlign: "middle" }}
            />
          </a>
          <a href="">
            <Icon
              icon="iconamoon:like"
              height={40}
              style={{ verticalAlign: "middle" }}
            />
          </a>
        </div>
        <hr className="mediaHr" /> */}
        <input
          type="number"
          name="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button className="ui-btn">
          {loading ? (
            <ThreeCircles color="gray" height={20} width={20} />
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default MediaForm;
