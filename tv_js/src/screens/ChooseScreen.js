import React, { Component } from "react";
import { Gradient } from "../components/Gradient";
import { fontColor } from "../constants";
import { Button } from "../components/choose/Button";
import { IoIosDesktop, IoIosCog } from "react-icons/io";

export default class ChooseScreen extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            zIndex: -9999999998,
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
        <div style={{ display: "flex" }}>
          <div
            style={{
              textAlign: "center",
              width: "100%",
              color: fontColor,
              fontFamily: "Bebas Neue"
            }}
          >
            <h1 className="hide-on-small-only">
              <u style={{ textDecoration: "overline underline" }}>
                SPORTS EVENT MANAGER ENGINE
              </u>
            </h1>
          </div>
        </div>
        <div
          style={{
            color: fontColor,
            position: "absolute",
            bottom: 0,
            right: 0,
            paddingRight: "10px"
          }}
        >
          <h5>
            <b>@lazzy07</b> Production
          </h5>
          <p>2018 Copyright Cyborg Studios ©</p>
        </div>
        <div
          style={{
            color: fontColor,
            position: "absolute",
            bottom: 0,
            left: 0,
            fontFamily: "Bebas Neue",
            paddingLeft: "10px"
          }}
        >
          <h6>Engine v 2.0</h6>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            fontFamily: "Bebas Neue"
          }}
        >
          <div className="hide-on-small-only">
            <Button icon={() => <IoIosDesktop />} text="Monitor" />
          </div>
          <Button icon={() => <IoIosCog />} text="Controller" />
        </div>
      </div>
    );
  }
}
