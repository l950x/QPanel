import '../assets/css/media.css'
import MediaForm from "../components/MediaForm";
import Left from "../components/Left";

const Media = () => {

  return (
    <>
    <Left/>
    <div className="center">
    <h1>Media Services</h1>
    <MediaForm/>
    </div>
    </>
  );
};

export default Media;
