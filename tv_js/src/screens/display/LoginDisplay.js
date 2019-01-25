import React, { Component } from "react";
import { Gradient } from "../../components/Gradient";
import { fontColor } from "../../constants";
import { MONITOR_DISPLAY } from "../../routes";
import { withRouter } from "react-router-dom";
import { Radiobutton } from "../../components/controller/RadioButton";

class LoginDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monitorName: "",
      type: "cricket"
    };
  }

  onChange = e => {
    this.setState({
      monitorName: e.target.value
    });
  };

  onChangeRadioButton = type => {
    this.setState({
      type
    });
  };

  checked = type => {
    if (type === this.state.type) {
      return true;
    }
    return false;
  };

  onClick = () => {
    if (this.state.monitorName !== "") {
      localStorage.setItem("monitorName", this.state.monitorName);
      localStorage.setItem("monitorType", this.state.type);
      this.props.history.push(MONITOR_DISPLAY);
    }
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            zIndex: -9999999999,
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
                LAZ ENGINE v2.0 Monitor Login
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
            justifyContent: "center",
            marginTop: "50px",
            padding: "80px",
            fontFamily: "Bebas Neue",
            color: fontColor
          }}
        >
          <form className="col s6">
            <div className="row">
              <div className="offset-m3 input-field col m6">
                <input
                  id="icon_prefix"
                  type="text"
                  onChange={e => this.onChange(e)}
                  value={this.state.monitorName}
                  className="validate white-text"
                />
                <label htmlFor="icon_prefix">
                  <span style={{ color: fontColor, fontSize: "20px" }}>
                    Moinitor Name
                  </span>
                </label>
                <div style={{ padding: "10px" }}>
                  <Radiobutton
                    name="cricket"
                    title="cricket"
                    onChange={() => this.onChangeRadioButton("cricket")}
                    value={this.checked("cricket")}
                  />
                  <Radiobutton
                    name="football"
                    title="football"
                    onChange={() => this.onChangeRadioButton("football")}
                    value={this.checked("football")}
                  />
                  <Radiobutton
                    name="rugby"
                    title="rugby"
                    onChange={() => this.onChangeRadioButton("rugby")}
                    value={this.checked("rugby")}
                  />
                </div>
                <div
                  onClick={this.onClick}
                  className="waves-effect waves-light btn defColorButton"
                  disabled={this.state.monitorName === "" ? true : false}
                >
                  Confirm
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginDisplay);
