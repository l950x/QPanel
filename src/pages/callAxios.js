import axios from "axios";
import { toast } from "react-toastify";
const Axios = axios.create({
  baseURL: "https://127.0.0.1:8000/api",
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      let toastId;
      switch (statusCode) {
        case 404:
          if (!toast.isActive("404")) {
            toast.error("404, API not found", { toastId: "404" });
          }
          break;
        default:
          toastId = `error${statusCode}`;
          if (!toast.isActive(toastId)) {
            toast.error(`Error ${statusCode}: ${error.response.data.detail}`, {
              toastId,
            });
          }
      }
    } else if (error.request) {
      if (!toast.isActive("internalServerError")) {
        toast.error("Internal server error", {
          toastId: "internalServerError",
        });
      }
    } else {
      if (!toast.isActive("requestError")) {
        toast.error("Request error, please retry", { toastId: "requestError" });
      }
    }
    localStorage.removeItem("token");
    throw error;
  }
);

export default Axios;
