import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Media from "./pages/Media";
import Particle from "./components/Particle";
// import AnimatedCursor from "react-animated-cursor";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mail from "./pages/Mail";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import { jwtDecode } from "jwt-decode";
import Axios from "./pages/callAxios";
function App() {
  const [disableBg, setDisableBg] = useState(0);

  useEffect(() => {
    let bg = localStorage.getItem("disable-bg");
    setDisableBg(bg ? 1 : 0);
  }, [disableBg]);


  // Disabled for github deployement -->
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && token.split('.').length === 3) {
  //     const decodedToken = jwtDecode(token);
  //     const expirationDate = decodedToken.exp;
  //     const currentTimestamp = Math.floor(Date.now() / 1000);

  //     if (expirationDate > currentTimestamp) {
  //       const userId = decodedToken.id;
  //       Axios.post(`/isLogged/${userId}`, {}, {
  //         headers: {
  //           Authorization: token
  //         }
  //       }).then((response) => {
  //         if (response.data.status === 0) {
  //           localStorage.removeItem("token");
  //           if (window.location.pathname !== "/QPanel/login") {
  //             window.location.href = "/QPanel/login";
  //             toast.error("Please login.");
  //           }
  //         }
  //       });
  //     } else {
  //       localStorage.removeItem("token");
  //       if (window.location.pathname !== "/QPanel/login") {
  //         toast.error("Your session has expired. Please login again.");
  //         window.location.href = "/QPanel/login";
  //       }
  //     }
  //   } else {
  //     if (window.location.pathname !== "/QPanel/login") {
  //       window.location.href = "/QPanel/login";
  //       toast.error("You are not logged in. Please login.");
  //     }
  //   }
  // }, []);
  // <-- 

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
            <Route path="/QPanel/register" element={<Register />} />
            
          </Routes>
        </Router>
        <ToastContainer />
      </body>
    </>
  );
}

export default App;
