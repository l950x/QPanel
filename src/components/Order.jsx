import { Icon } from "@iconify/react";

const Order = (props) => {
    // const { order } = props.orderId;
    return (
      <tr>
      <td>{props.orderId}</td>
      <td>{props.mediaId}</td>
      <td>{props.service}</td>
      <td>{props.quantity}</td>
      <td>{props.status.remains}</td>
      <td>{props.status.status}</td>
      <td>{props.status.start_count ? props.status.start_count : "/" }</td>
      <td>{props.date}</td>
      <td><a href={props.link}><Icon icon="tdesign:link" height={20} style={{ verticalAlign: "middle" }} /></a></td>
      <td><a href="/"><Icon icon="mdi:show-outline" height={20} style={{ verticalAlign: "middle" }} /></a></td>
    </tr>
    );
  };
  
  export default Order;
  