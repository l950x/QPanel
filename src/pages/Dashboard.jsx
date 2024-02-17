import "../assets/css/dashboard.css";
import { Icon } from "@iconify/react";
import Logo from "../assets/img/cabemoji.png";
import Left from "../components/Left";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import Axios from "./callAxios";
import axios from "axios";
// import Sidebar from "../components/sidebar";
const Dashboard = () => {
  const sms = async (e) => {
    e.preventDefault();
    axios
      .post("https://127.0.0.1:8000/api/smsVerification")
      .then((response) => {
        const $data = response.data;
        console.log($data);
      });
  };
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.post(
        `/dashboard`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => {
          const userData = response.data;
          setDashboardData({
            latestUser: userData.latestUser,
            mail: userData.mailStatus,
            userId: userData.userId,
            smsSend: userData.smsSend,
            description: userData.description,
            registeredDate: userData.registeredDate,
            userList: userData.userList,
            orders: userData.orders,
            username: userData.username,
            discord: userData.discord,
          });
          setProfilePic(userData.profilePic);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      if (!toast.isActive("tokenError")) {
        toast.error("Not connected (token not found)", {
          toastId: "tokenError",
        });
      }
    }
  }, []);

  return (
    <>
      <Left />
      {/* <Sidebar/> */}
      {loading && (
        <div className="loading-container">
          <ThreeCircles color="gray" height={50} width={50} />
        </div>
      )}
      {!loading && (
        <div className="center">
          <div className="p1">
            <div className="logo">
              <img src={profilePic ? profilePic : Logo} alt="" />
            </div>
            <p className="iconColor">
              Welcome {dashboardData ? dashboardData.username : "User"}
            </p>
          </div>
          <div className="p2">
            <div className="id">
              <Icon
                className="icn iconColor"
                icon="tabler:id"
                width="25"
                height="25"
              ></Icon>
              <p>
                <span className="iconColor">ID:</span>
                <span className="textColor">
                  {" "}
                  {dashboardData ? dashboardData.userId : "Loading..."}
                </span>
              </p>
            </div>
            <div className="mail">
              <Icon
                className="icn iconColor"
                icon="material-symbols:mail-outline"
                width="25"
                height="25"
              ></Icon>
              <p>
                <span className="iconColor">Mail:</span>
                <span className="textColor">
                  {" "}
                  {dashboardData ? dashboardData.mail : " Loading..."}
                </span>
              </p>
            </div>
            <div className="discord">
              <Icon
                className="icn iconColor"
                icon="ri:discord-line"
                width="25"
                height="25"
              ></Icon>
              <p>
                <span className="iconColor">Discord:</span>
                <span className="textColor">
                  {" "}
                  {dashboardData ? dashboardData.discord : " Loading..."}
                </span>
              </p>
            </div>
            <div className="smsc">
              <Icon
                className="icn iconColor"
                icon="material-symbols:sms-outline"
                width="25"
                height="25"
              ></Icon>
              <p onClick={sms}>
                <span className="iconColor">SMS:</span>
                <span className="textColor">
                  {" "}
                  {dashboardData ? " Unverified" : " Loading..."}
                </span>
              </p>
            </div>
          </div>

          <div className="p3">
            <div className="version">
              <Icon
                className="shield iconColor"
                width="50"
                height="50"
                icon="ci:shield"
              ></Icon>
              <p className="iconColor">Version 1.0</p>
            </div>
          </div>
          <div className="p4">
            <p>
              <span className="iconColor">Registered since:</span>
              <span className="textColor">
                {" "}
                {dashboardData ? dashboardData.registeredDate : "Loading..."}
              </span>
            </p>
            <p>
              <span className="iconColor">Order send:</span>
              <span className="textColor">
                {" "}
                {dashboardData ? dashboardData.orders : "Loading..."}
              </span>
            </p>
            <p>
              <span className="iconColor">Users Registered:</span>
              <span className="textColor">
                {" "}
                {dashboardData ? dashboardData.userList : " Loading..."}
              </span>
            </p>
          </div>
          <div className="p5">
            <p>
              <span className="iconColor">Last Registered:</span>
              <span className="textColor">
                {" "}
                {dashboardData ? dashboardData.latestUser : "Loading..."}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
