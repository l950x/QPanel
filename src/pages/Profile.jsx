import "../assets/css/profile.css";
import ProfileForm from "../components/ProfileForm";
import Left from "../components/Left";
const Media = () => {
  return (
    <>
      <Left />
      <div className="center">
        <div className="Form">
          <ProfileForm />
        </div>
      </div>
    </>
  );
};

export default Media;
