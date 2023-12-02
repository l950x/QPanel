import "../assets/css/left.css";
import { Icon } from "@iconify/react";
import Logo from "../assets/img/cabemoji.png";
import ColorControl from "./ColorControl";
const Left = () => {
  
	function logout() {
	localStorage.removeItem('token');
  window.location.href = "/QPanel/login";
  }
  return (
    <div className="left">
      <div className="leftIn">
        <a href="app_home">
          <img src={Logo} alt="logo" />
        </a>
        <p className="iconColor">QPanel v1.0.0</p>
      </div>
      <div className="LA">
        <div className="dashboard">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="material-symbols:dashboard-outline"
          ></Icon>
          <a className="iconColor" href="/QPanel/">
            Dashboard
          </a>
        </div>
        <div className="profile">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="iconamoon:profile"
          ></Icon>
          <a className="iconColor" href="/QPanel/profile">
            Profile
          </a>
        </div>
        <div className="placeholder disabledBtn">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="ph:placeholder"
          ></Icon>
          <button className="iconColor" href="">
            Placeholder
          </button>
        </div>
      </div>
      <hr className="leftHr" />
      <div className="LA">
      <div className="MediaLeft">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="material-symbols:media-link-outline"
          ></Icon>
          <a className="iconColor" href="/QPanel/media">
            Media Services
          </a>
        </div>
        <div className="mailLeft">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="material-symbols:mail-outline"
          ></Icon>
          <a className="iconColor" href="/QPanel/mail">
            Mails Services
          </a>
        </div>
        <div className="smsLeft disabledBtn">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="material-symbols:sms-outline"
          ></Icon>
          <button className="iconColor" href="/QPanel/sms">
            SMS Services
          </button>
        </div>
        <div className="calls disabledBtn">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="material-symbols:call-outline"
          ></Icon>
          <button className="iconColor" href="/QPanel/call">
            Voice Services
          </button>
        </div>
      </div>
      <hr className="leftHr" />
      <div className="LA">
        <div className="placeholder">
          <Icon
            className="iconColor"
            style={{ verticalAlign: "middle" }}
            icon="material-symbols:logout"
          ></Icon>
          <a className="iconColor" onClick={logout}>
            Logout
          </a>
        </div>
        <div className="settings">
          {/* <Icon className="iconColor" icon="material-symbols:settings-outline"></Icon> */}
          {/* <a className="iconColor" id="settingsLink" href="#" >Settings</a> */}
          <ColorControl />
        </div>
        <script src="https://code.iconify.design/Icon/1.0.7/Icon.min.js"></script>
      </div>
    </div>
  );
};

export default Left;
