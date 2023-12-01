import { Icon } from '@iconify/react';
const ColorControl = () => {
  const showPopup = () => {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
  };

  const closePopup = () => {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  };

  return (
    <div>
      {/* Bouton Settings ici */}
      <div className="settings">
        <Icon className="iconColor" icon="material-symbols:settings-outline"></Icon>
        <a className="iconColor" onClick={showPopup}>
          Settings
        </a>
      </div>
      {/* Popup ici */}
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
          <button id="closeButton" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorControl;
