import React, { Component } from "react";
import CricketSettings from "../../components/controller/CricketSettings";

class SettingsScreen extends Component {
  renderSettings = type => {
    if (type === "cricket") {
      return <CricketSettings config={this.props.data.config} />;
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <h3>Settings : {this.props.data.name}</h3>
        </div>
        <div>{this.renderSettings(this.props.data.type)}</div>
      </div>
    );
  }
}

export default SettingsScreen;
