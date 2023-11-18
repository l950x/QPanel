document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("spoofer-form");
    const messageBox = document.getElementById("message-box");
    const voiceBox = document.getElementById("voice-box");
    const callModeButton = document.getElementById("callMode");

    callModeButton.addEventListener("click", function() {
      if (form.getAttribute("action") === "../Controller/sendSms.php") {
        form.setAttribute("action", "../Controller/sendCall.php");
        messageBox.style.display = "none";
        voiceBox.style.display = "block";
        callModeButton.textContent = "SMS Mode";
      } else {
        form.setAttribute("action", "../Controller/sendSms.php");
        messageBox.style.display = "block";
        voiceBox.style.display = "none";
        callModeButton.textContent = "Call Mode";
      }
    });
  });