import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";

const Order = ({ orderId, mediaId, service, quantity, status, date, link }) => {
    const { remains, status: statusValue, start_count } = status;
    return (
      <tr>
        <td>{orderId}</td>
        <td>{mediaId}</td>
        <td>{service}</td>
        <td>{quantity}</td>
        <td>{remains}</td>
        <td>{statusValue}</td>
        <td>{start_count ? start_count : "/" }</td>
        <td>{date}</td>
        <td><a href={link}><Icon icon="tdesign:link" height={20} style={{ verticalAlign: "middle" }} /></a></td>
        <td><a href="/"><Icon icon="mdi:show-outline" height={20} style={{ verticalAlign: "middle" }} /></a></td>
      </tr>
    );
};

Order.propTypes = {
  orderId: PropTypes.number.isRequired,
  mediaId: PropTypes.number.isRequired,
  service: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  status: PropTypes.shape({
    remains: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    start_count: PropTypes.number,
  }).isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Order;