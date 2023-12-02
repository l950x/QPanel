import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/img/cabemoji.png";
const ProfileForm = () => {
  return (
    <div>
      <div className="img">
        <img src={Logo} alt="logo" />
      </div>
      <div className="description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
          dolorem quam necessitatibus veritatis, voluptates adipisci molestiae
          voluptatem sit earum, officiis rerum fugit cupiditate consectetur
          dolore tenetur ea id perspiciatis molestias!
        </p>
      </div>
      <div className="profilectn">
          <p>Username: admin</p>
          <p>admin@gmail.com</p>
          <input type="password" />
          <button>Edit profile picture</button>
      </div>
    </div>
  );
};
export default ProfileForm;
