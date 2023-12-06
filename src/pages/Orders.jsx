import { toast } from "react-toastify";
import "../assets/css/orders.css";
import Left from "../components/Left";
import Order from "../components/Order";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import Axios from "./callAxios";
const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.username;
      Axios
        .post(`orders/${userId}`)
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
  return (
    <>
      <Left />
      <div className="center">
        <h1>Orders</h1>
        <div className="orderForm">
          {loading && (
            <div className="loading-container">
              <ThreeCircles color="gray" height={50} width={50} />
            </div>
          )}
          {!loading && orderData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Media</th>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Remains</th>
                  <th>Status</th>
                  <th>Startcount</th>
                  <th>Date</th>
                  <th>Link</th>
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
                    date={order.date}
                    status={order.status}
                  />
                ))}
              </tbody>
            </table>
          )}
          {!loading && orderData.length === 0 && (
            <div className="noOrder">
              <h2>No order found</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
