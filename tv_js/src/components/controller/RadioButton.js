import React from "react";

export const Radiobutton = props => {
  return (
    <label>
      <input
        className="with-gap"
        type="radio"
        name={props.name}
        checked={props.value}
        disabled={props.disabled}
        onChange={e => props.onChange(e)}
      />
      <span>{props.title}</span>
    </label>
  );
};
