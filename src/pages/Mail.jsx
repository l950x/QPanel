import '../assets/css/mail.css';
import Left from "../components/Left";
import MailForm from '../components/MailForm';

const Mail = () => {
  return (
    <>
      <Left/>
      <div className="mail-center">
        <h1>Mail Services</h1>
        <MailForm/>
      </div>
    </>
  );
};

export default Mail;
