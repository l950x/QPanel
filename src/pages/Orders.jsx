import { toast } from "react-toastify";
import "../assets/css/orders.css";
import Left from "../components/Left";
import Order from "../components/order";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.username;
      axios
        .post(`https://127.0.0.1:8000/api/orders/${userId}`)
        .then((response) => {
          const data = response.data.orders;

          setOrderData(data.map((order) => order));

          // setOrderData({
          //   orderId: data.orderId,
          //   mediaId: data.mediaId,
          //   service: data.service,
          //   quantity: data.quantity,
          //   link: data.link,
          // });
        })
        .catch((error) => {
          if (error.response) {
            const statusCode = error.response.status;
            if (statusCode === 404) {
              toast.error("404, API not found");
            } else {
              toast.error(`Error ${statusCode}: back-end not connected`);
            }
          } else if (error.request) {
            toast.error("Internal server error");
          } else {
            toast.error("Request error please retry");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error("Not connected (token not found)");
    }
  }, []);

  const [id, setId] = useState(1);
  const ids = [1, 2];
  console.log(orderData);
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
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Media</th>
                <th>Service</th>
                <th>Quantity</th>
                <th>Remains</th>
                <th>Link</th>
                <th>Status</th>
                <th>Start count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <Order
                  key={index}
                  orderId={order.orderId}
                  mediaId={order.mediaId}
                  service={order.service}
                  quantity={order.quantity}
                  link={order.link}
                  status={order.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
