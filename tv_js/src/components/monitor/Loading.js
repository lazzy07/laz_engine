import React, { Component } from "react";
import { fontColor } from "../../constants";
import { Gradient } from "../Gradient";
import { Spinner } from "../Spinner";
class Loading extends Component {
  render() {
    return (
      <div style={{ width: "100%", zIndex: 9999999999 }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            backgroundColor: "#040e2f",
            backgroundSize: "cover",
            overflow: "hidden"
          }}
        >
          <video height="100%" loop autoPlay muted>
            <source
              src="./dependencies/videos/background.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <Gradient />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "95vh",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            paddingBottom: "80px",
            fontFamily: "Bebas Neue",
            color: fontColor,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spinner />
            <h1 className="blink_me" style={{ padding: "15px" }}>
              {this.props.text || "Loading"}
            </h1>
          </div>
          <div>
            <p style={{ opacity: 0.5 }}>Created by Lasantha M Senanayake</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
