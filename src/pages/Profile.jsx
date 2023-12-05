import "../assets/css/profile.css";
import Left from "../components/Left";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Icon } from "@iconify/react";
import Logo from "../assets/img/cabemoji.png";
import { toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.username;
      axios
        .post(`https://127.0.0.1:8000/api/dashboard/${userId}`)
        .then((response) => {
          const userData = response.data;
          setProfileData({
            mail: userData.mail,
            description: userData.description,
            username: userData.username,
            profilePic: userData.profilePic,
          });
          setProfilePic(userData.profilePic);
        })
        .catch((error) => {
          console.error("error :", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error("Not connected (token not found)");
    }
  }, []);
  console.log(edit);
  return (
    <>
      <Left />
      {loading && (
        <div className="loading-container">
          <ThreeCircles color="gray" height={50} width={50} />
        </div>
      )}
      {!loading && (
        <div className="center">
          <div className="profileForm">
            {!edit && (
              <>
                <div className="img">
                  <img src={profilePic ? profilePic : Logo} alt="" />
                </div>
                <div className="description">
                  <p>{profileData ? profileData.description : "Loading..."}</p>
                </div>
                <div className="info">
                  <div className="profilectn">
                    <Icon icon="ph:user" />
                    <p>{profileData ? profileData.username : "Loading..."}</p>
                  </div>
                  <hr className="profileHr" />
                  <div className="profilectn">
                    <Icon icon="ic:outline-email" />
                    <p>{profileData ? profileData.mail : "Loading..."}</p>
                  </div>
                  <hr className="profileHr" />
                  <div className="profilectn">
                    <Icon icon="ic:baseline-phone" />
                    <p>{profileData ? "07 14 55 78 14" : "Loading..."}</p>
                  </div>
                  <hr className="profileHr" />
                  <div className="profilectn">
                    <Icon icon="mdi:password-outline" />
                    <p>{profileData ? "**********" : "Loading..."}</p>
                  </div>
                </div>
                <button
                  className="cssbuttons-io-button"
                  onClick={() => setEdit(true)}
                >
                  Edit profile
                  <div className="icon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </>
            )}
            {edit && (
              <>
                <div className="img">
                  <img src={profilePic ? profilePic : Logo} alt="" />
                </div>
                <div className="description">
                  <input
                    type="text"
                    placeholder={
                      profileData ? profileData.description : "Loading..."
                    }
                  ></input>
                </div>
                <div className="info">
                  <div className="profilectn">
                    <Icon icon="ph:user" />
                    <input
                      type="text"
                      placeholder={
                        profileData ? profileData.username : "Loading..."
                      }
                    ></input>
                  </div>
                  <hr className="profileHr" />
                  <div className="profilectn">
                    <Icon icon="ic:outline-email" />
                    <input
                      type="text"
                      placeholder={
                        profileData ? profileData.mail : "Loading..."
                      }
                    ></input>
                  </div>
                  <hr className="profileHr" />
                  <div className="profilectn">
                    <Icon icon="ic:baseline-phone" />
                    <input
                      type="text"
                      placeholder={
                        profileData ? "07 14 55 78 14" : "Loading..."
                      }
                    ></input>
                  </div>
                  <hr className="profileHr" />
                  <div className="profilectn">
                    <Icon icon="mdi:password-outline" />
                    <input
                      type="text"
                      placeholder={profileData ? "**********" : "Loading..."}
                    ></input>
                  </div>
                </div>
                <div className="ctnBtn">
                  <a onClick={() => setEdit(false)}>Back</a>
                  <button className="cssbuttons-io-button">
                    Confirm
                    <div className="icon">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
