import "../assets/css/left.css";
import { Icon } from "@iconify/react";
import Logo from "../assets/img/cabemoji.png";
import ColorControl from "./ColorControl";
const Left = () => {
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/QPanel/login";
  }

  function closeSidebar(e) {
    e.preventDefault();
    const sidebar = document.querySelector(".left");
    const openSidebar = document.querySelector(".openSidebar");
    sidebar.style.display = "none";
    openSidebar.style.display = "inline";
  }

  function openSidebar(e) {
    e.preventDefault();
    const sidebar = document.querySelector(".left");
    const openSidebar = document.querySelector(".openSidebar");
    sidebar.style.display = "block";
    openSidebar.style.display = "none";
  }
  return (
    <>
      <div className="openSidebar">
        <a href="" onClick={openSidebar}>
          <Icon
            className="iconColor openSidebarIcon"
            icon="iconamoon:menu-burger-horizontal-bold"
            width="35"
            height="35"
          />
        </a>
      </div>
      <div className="left">
        <div className="close">
          <a href="" onClick={closeSidebar}>
            <Icon
              icon="material-symbols:close"
              width="25"
              height="25 "
              className="iconColor"
            />
          </a>
        </div>
          <div className="sideCtn">
        <div className="leftIn">
          <a href="/QPanel/">
            <img src={Logo} alt="logo" />
          </a>
          <p className="iconColor">QPanel v1.0.0</p>
        </div>
          <div className="LA">
            <div className="dashboard">
              <a href="/QPanel/">
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="material-symbols:dashboard-outline"
                ></Icon>
              </a>
              <a className="iconColor side-text" href="/QPanel/">
                Dashboard
              </a>
            </div>
            <div className="profile">
              <a href="/QPanel/profile">
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="iconamoon:profile"
                ></Icon>
              </a>
              <a className="iconColor side-text" href="/QPanel/profile">
                Profile
              </a>
            </div>
            <div className="placeholder">
              <a href="/QPanel/orders">
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="lets-icons:order"
                ></Icon>
              </a>
              <a className="iconColor side-text" href="/QPanel/orders">
                Order
              </a>
            </div>
          </div>
          <hr className="leftHr" />
          <div className="LA">
            <div className="MediaLeft">
              <a href="/QPanel/media">
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="material-symbols:media-link-outline"
                ></Icon>
              </a>
              <a className="iconColor side-text" href="/QPanel/media">
                Media Services
              </a>
            </div>
            <div className="mailLeft">
              <a href="/QPanel/mail">
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="material-symbols:mail-outline"
                ></Icon>
              </a>
              <a className="iconColor side-text" href="/QPanel/mail">
                Mail Services
              </a>
            </div>
            <div className="smsLeft disabledBtn">
              <a href="/QPanel/sms">
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="material-symbols:sms-outline"
                ></Icon>
              </a>
              <button className="iconColor side-text" href="/QPanel/sms">
                SMS Services
              </button>
            </div>
            <div className="calls disabledBtn">
              <a href="/QPanel/call">
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="material-symbols:call-outline"
                ></Icon>
              </a>
              <button className="iconColor side-text" href="/QPanel/call">
                Voice Services
              </button>
            </div>
          </div>
          <hr className="leftHr" />
          <div className="LA">
            <div className="logout">
              <a href="" onClick={logout}>
                <Icon
                  className="iconColor side-icon"
                  style={{ verticalAlign: "middle" }}
                  icon="material-symbols:logout"
                ></Icon>
              </a>
              <a className="iconColor side-text" onClick={logout}>
                Logout
              </a>
            </div>
            <div className="settings">
              {/* <Icon className="iconColor" icon="material-symbols:settings-outline"></Icon> */}
              {/* <a className="iconColor" id="settingsLink" href="#" >Settings</a> */}
              <ColorControl />
            </div>
          </div>
          <script src="https://code.iconify.design/Icon/1.0.7/Icon.min.js"></script>
        </div>
      </div>
    </>
  );
};

export default Left;
