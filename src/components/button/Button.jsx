import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/button/button.css";
import { ThreeCircles } from "react-loader-spinner";
const Button = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.redirectTo);
  };

  return (
    <div>
      <button className="ui-btn" onClick={handleClick}>
        <span>
          {props.loading ? (
            <ThreeCircles color="gray" height={20} width={20} />
          ) : (
            props.text
          )}
        </span>
      </button>
    </div>
  );
};

export default Button;
