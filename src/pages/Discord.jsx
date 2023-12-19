import { useEffect, useState } from "react";
import Axios from "./callAxios";
import Left from "../components/Left";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import "../assets/css/profile.css";
import { redirect, useNavigate } from "react-router-dom";

const Discord = () => {
  const [loading, setLoading] = useState(true);
  let Navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const token = localStorage.getItem("token");
    if (code && token) {
      Axios.post(
        "/discordAuth",
        { code: code },
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => {
          const data = response.data;
          if (data.status === 1) {
            localStorage.setItem("token", data.token);
            toast.success("Discord account linked");
            Navigate("/QPanel/profile");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Left />
      {loading && (
        <div className="loading-container">
          <ThreeCircles color="gray" height={50} width={50} />
        </div>
      )}
    </>
  );
};

export default Discord;
