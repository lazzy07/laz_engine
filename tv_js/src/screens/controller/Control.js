import React, { Component } from "react";
import { connect } from "react-redux";
import CricketController from "./control_screens/CricketController";
import FootballController from "./control_screens/FootballController";
import RugbyController from "./control_screens/RugbyController";

class ControlScreen extends Component {
  /**
   * Rendering corresponding screen for the tournament according to the tournament type
   * @param {String} type type of the tournament cricket||football||rugby
   */
  renderControllerScreen = type => {
    if (type === "cricket") {
      return (
        <div>
          <CricketController />
        </div>
      );
    } else if (type === "football") {
      return (
        <div>
          <FootballController />
        </div>
      );
    } else if (type === "rugby") {
      return (
        <div>
          <RugbyController />
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1> Loading </h1>
        </div>
      );
    }
  };

  render() {
    const { tournamentType } = this.props;
    return (
      <div>
        <div>{this.renderControllerScreen(tournamentType)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { tournamentType: state.tournament.tournamentData.type };
};

export default connect(mapStateToProps)(ControlScreen);
