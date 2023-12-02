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
      <button>Edit profile</button>
    </rof>
  );
};
export default ProfileForm;
