import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "../../Button";
import {
  sendToDisplay,
  DISPLAY_INTRO
} from "../../../../redux/actions/MonitorActions";
import { withRouter } from "react-router-dom";

class Intro extends Component {
  onSubmit = (name, logo, description) => {
    let paths = this.props.location.pathname.split("/");
    let _id = paths[paths.length - 1];

    this.props.sendToDisplay({
      _id,
      type: DISPLAY_INTRO,
      data: {
        tournamentName: name,
        logo: logo || "",
        description: description || ""
      }
    });
  };

  render() {
    const { name, config } = this.props.tournament;
    const { logo, description } = config;
    return (
      <div className="row">
        <h2 style={{ display: "flex", justifyContent: "center" }}>{name}</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <img
            style={{ alignSelf: "center" }}
            width="50%"
            height="auto"
            src={logo}
            alt=""
          />
          <h5 style={{ textAlign: "center" }}>{description}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px"
            }}
          >
            <Button
              onClick={() => this.onSubmit(name, logo, description)}
              title="Change Monitor"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tournament: state.tournament.tournamentData
  };
};

const mapDispatchToProps = {
  sendToDisplay
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Intro)
);
