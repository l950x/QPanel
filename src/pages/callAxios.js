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
      switch (statusCode) {
        case 404:
          toast.error("404, API not found");
          break;
        default:
          toast.error(`Error ${statusCode}: back-end not connected`);
      }
    } else if (error.request) {
      toast.error("Internal server error");
    } else {
      toast.error("Request error, please retry");
    }
    throw error;
  }
);

export default Axios;
