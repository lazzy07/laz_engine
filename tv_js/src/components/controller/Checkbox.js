import React from "react";

export const Checkbox = props => {
  return (
    <p>
      <label>
        <input
          name={props.name}
          disabled={props.disabled}
          type="checkbox"
          checked={props.checked === true ? "checked" : ""}
          onChange={() => null}
          onClick={props.onClick}
        />
        <span>{props.title}</span>
      </label>
    </p>
  );
};
