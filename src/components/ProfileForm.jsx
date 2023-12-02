import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/img/cabemoji.png";
import { Icon } from "@iconify/react";
const ProfileForm = () => {
  return (
    <rof>
      <div className="img">
        <img src={Logo} alt="logo" />
      </div>
      <div className="description">
        <p>description</p>
      </div>
      <div className="info">
        <div className="profilectn">
          <Icon icon="ph:user" />
          <p>admin</p>
        </div>
        <hr className="profileHr" />
        <div className="profilectn">
          <Icon icon="ic:outline-email" />
          <p>admin@gmail.com</p>
        </div>
      </div>
      <button className="cssbuttons-io-button">
        Edit profile
        <div className="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.con 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </rof>
  );
};
export default ProfileForm;
