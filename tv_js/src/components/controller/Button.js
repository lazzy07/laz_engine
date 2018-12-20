import React from "react";

export const Button = props => {
  return (
    <div
      onClick={props.onClick}
      className="waves-effect waves-light btn defColorButton"
    >
      {props.title}
    </div>
  );
};
