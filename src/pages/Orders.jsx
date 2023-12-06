import { toast } from "react-toastify";
import "../assets/css/orders.css";
import Left from "../components/Left";
import Order from "../components/Order";
import { useState } from "react";
import { useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import Axios from "./callAxios";
const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios
        .post(`/getOrders`, {}, {
          headers: {
            Authorization: token,
          },
        })
        
        .then((response) => {
          const data = response.data.orders;
          setOrderData(data.map((order) => order));
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
