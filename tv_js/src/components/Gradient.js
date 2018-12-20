import React from "react";
import { DEFAULT_GRADIENT } from "../constants";

export const Gradient = props => {
  return (
    <div
      style={{
        zIndex: -9999999,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        background: props.gradient || DEFAULT_GRADIENT
      }}
    />
  );
};
