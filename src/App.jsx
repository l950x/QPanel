import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Left from "./components/left";
import Media from "./pages/Media";
import Particle from "./components/Particle";
import AnimatedCursor from "react-animated-cursor";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get(`https://127.0.0.1:8000/api`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
  });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
        rel="stylesheet"
      />
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <body>
        <Particle />
        <Left />
        <AnimatedCursor
          innerSize={10}
          outerSize={8}
          color="238, 0, 255"
          // color="50, 50, 50"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/media" element={<Media />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </body>
    </>
  );
}

export default App;
