document.addEventListener("DOMContentLoaded", function () {
  const settingsLink = document.getElementById("settingsLink");
  const popup = document.getElementById("popup");
  const closeButton = document.getElementById("closeButton");

  settingsLink.addEventListener("click", function (e) {
    e.preventDefault();
    popup.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // function changeColor(newColor) {
  //   document.documentElement.style.setProperty("--main-color", newColor);
  //   localStorage.setItem("selectedColor", newColor);
  // }

  const redButton = document.getElementById("redButton");
  redButton.addEventListener("click", function () {
    changeColor("rgb(255, 0, 0)");
  });

  const blueButton = document.getElementById("blueButton");
  blueButton.addEventListener("click", function () {
    changeColor("rgb(0, 0, 255)");
  });

  const greenButton = document.getElementById("greenButton");
  greenButton.addEventListener("click", function () {
    changeColor("rgb(0, 255, 0)");
  });

  const purpleButton = document.getElementById("purpleButton");
  purpleButton.addEventListener("click", function () {
    changeColor("rgb(217, 0, 255)");
  });

  const pinkButton = document.getElementById("pinkButton");
  pinkButton.addEventListener("click", function () {
    changeColor("rgb(255, 105, 180)");
  });

  document.addEventListener("DOMContentLoaded", function () {
    const selectedColor = localStorage.getItem("selectedColor");
    if (selectedColor) {
      document.documentElement.style.setProperty("--main-color", selectedColor);
    }
  });

  const rainbowButton = document.getElementById("rainbowButton");

  rainbowButton.addEventListener("click", function () {
    startRainbowEffect();
  });

  function startRainbowEffect() {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
      "pink",
      "cyan",
      "lime",
    ];
    let currentIndex = 0;

    const intervalId = setInterval(function () {
      const currentColor = colors[currentIndex];
      changeColor(currentColor);
      currentIndex = (currentIndex + 1) % colors.length;
    }, 150);

    setTimeout(function () {
      clearInterval(intervalId);
    }, 10000);
  }

  function changeColor(newColor) {
    localStorage.setItem("selectedColor", newColor);
    document.documentElement.style.setProperty("--main-color", newColor);
  }
});
