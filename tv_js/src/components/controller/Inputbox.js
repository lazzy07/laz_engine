import React from "react";
import { fontColor } from "../../constants";

export const Inputbox = props => {
  return (
    <div>
      <form>
        <div>
          <div className={"input-field"}>
            <input
              id={props.id}
              type={props.type ? props.type : "text"}
              onChange={e => props.onChange(e)}
              placeholder={props.active ? "  " : null}
              value={props.value}
              name={props.name}
              className={"validate" + (props.white ? " white-text" : "")}
            />
            <label className={props.active ? "active" : ""} htmlFor={props.id}>
              <span
                style={{ color: props.color || fontColor, fontSize: "20px" }}
              >
                {props.title}
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
