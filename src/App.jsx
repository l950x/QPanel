import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Media from "./pages/Media";
import Particle from "./components/Particle";
import AnimatedCursor from "react-animated-cursor";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mail from "./pages/Mail";
import Orders from "./pages/Orders";
function App() {
  const [disableBg, setDisableBg] = useState(0);

  useEffect(() => {
    let bg = localStorage.getItem("disable-bg");
    if (bg) {
      setDisableBg(1);
    } else {
      setDisableBg(0);
    }
  }, [disableBg]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     if (window.location.pathname !== "/login") {
  //       window.location.href = "/login";
  //       toast.error("Vous devez être connecté!");
  //     }
  //   }
  // }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
        rel="stylesheet"
      />
      <body>
        {!disableBg ? (
          <div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        ) : null}
        <Particle />
        {/* <AnimatedCursor
          innerSize={10}
          outerSize={8}
          color="238, 0, 255"
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
            "button",
            "textarea",
            ".link",
          ]}
        /> */}
        <Router>
          <Routes>
          <Route path="/QPanel/" element={<Dashboard />} />
            <Route path="/QPanel/media" element={<Media />} />
            <Route path="/QPanel/mail" element={<Mail />} />
            <Route path="/QPanel/profile" element={<Profile />} />
            <Route path="/QPanel/login" element={<Login />} />
            <Route path="/QPanel/orders" element={<Orders />} />
          </Routes>
        </Router>
        <ToastContainer />
      </body>
    </>
  );
}

export default App;
