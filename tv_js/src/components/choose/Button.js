import React from "react";
import { fontColor } from "../../constants";

export const Button = props => {
  return (
    <div
      className="pulse z-depth-1 chooseButton"
      style={{
        padding: "30px",
        backgroundColor: "rgba(1,0,64, 0.2)",
        margin: "20px",
        color: fontColor,
        textAlign: "center",
        border: "3px solid " + fontColor,
        borderRadius: "10px",
        minWidth: "200px"
      }}
    >
      <h1>{props.icon()}</h1>
      <h4>{props.text}</h4>
    </div>
  );
};
