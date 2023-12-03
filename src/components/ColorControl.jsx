import { Icon } from "@iconify/react";
import { useState } from "react";
const ColorControl = () => {
  const [BgText, setBgText] = useState(null);
  const showPopup = () => {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
  };
const bg = localStorage.getItem("disable-bg");
if (!bg && !BgText){
  setBgText("Active animated bg");
}

  const disableBackground = () => {
    if (bg) {
      setBgText("Disable animated bg");
      localStorage.removeItem("disable-bg");
      window.location.reload();
    } else {
      setBgText(null);
      localStorage.setItem("disable-bg", 1);
      window.location.reload();
    }
  };

  const closePopup = () => {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  };

  return (
    <div>
      <div className="settings">
        <Icon
          className="iconColor"
          icon="material-symbols:settings-outline"
          style={{ verticalAlign: "middle" }}
        ></Icon>
        <a className="iconColor" onClick={showPopup}>
          Settings
        </a>
      </div>
      <div id="popup" className="popup">
        <div className="popup-content">
          <h2>Settings</h2>
          <p>Theme:</p>
          <button id="purpleButton">Default</button>
          <button id="redButton">Red</button>
          <button id="greenButton">Green</button>
          <button id="blueButton">Blue</button>
          <button id="pinkButton">Pink</button>
          <button id="rainbowButton">RGB</button>
          <button id="DABackground" onClick={disableBackground}>
          {BgText ? BgText : "Activate animated bg"}
          </button>
          <button id="closeButton" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorControl;
