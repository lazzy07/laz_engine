import React, { Component } from "react";
import SettingsScreen from "./Settings";
import AddDataScreen from "./AddData";
import ControlScreen from "./Control";

export default class MainControllerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "control"
    };
  }

  renderScr = () => {
    const { screen } = this.state;
    if (screen) {
      if (screen === "control") {
        return <ControlScreen />;
      } else if (screen === "add_data") {
        return <AddDataScreen />;
      } else if (screen === "settings") {
        return <SettingsScreen />;
      }
    }
  };

  onClick = e => {
    this.setState({
      screen: e
    });
  };
  /* eslint-disable no-alert, no-console */
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper blue">
            <a href="lol" className="brand-logo">
              LAZ Engine
            </a>
            <ul id="nav-mobile" className="right">
              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => this.onClick("control")}
                >
                  Control
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => this.onClick("add_data")}
                >
                  Add Data
                </a>
              </li>
              <li>
                <a role="button" onClick={() => this.onClick("settings")}>
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {this.renderScr()}
      </div>
    );
  }
}
