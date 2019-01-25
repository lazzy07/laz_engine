import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  sendToDisplay,
  DISPLAY_NEXT_MATCH
} from "../../../../redux/actions/MonitorActions";
import { Dropdown } from "../../Dropdown";
import { Button } from "../../Button";
import { getRealData } from "../../../../functions";

class NextMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchName: null,
      group: null,
      team1: null,
      team2: null,
      selected: "not selected"
    };
  }

  onChange = id => {
    const { matches } = this.props;
    let team1, team2, group, matchName;
    for (let i = 0; i < matches.length; i++) {
      if (matches[i]._id === id) {
        team1 = getRealData("_id", matches[i].teams[0], this.props.teams)
          .teamName;
        team2 = getRealData("_id", matches[i].teams[1], this.props.teams)
          .teamName;

        group = matches[i].group;
        matchName = matches[i].match;
      }
    }
    this.setState({
      selected: id,
      team1,
      team2,
      group,
      matchName
    });
  };

  onSubmit = () => {
    if (this.state.selected !== "not selected") {
      let paths = this.props.location.pathname.split("/");
      let _id = paths[paths.length - 1];
      const { team1, team2, group, matchName } = this.state;

      let data = {
        team1,
        team2,
        group: group || "",
        matchName,
        logo: this.props.logo || ""
      };
      this.props.sendToDisplay({ _id, type: DISPLAY_NEXT_MATCH, data });
    }
  };

  renderDropDown = matches => {
    let opt = (
      <option disabled key={-1} value="not selected">
        Not Selected
      </option>
    );
    let app = [];

    if (this.props.teams) {
      app = matches.map((ele, index) => {
        return (
          <option key={index} value={ele._id}>{`${
            getRealData("_id", ele.teams[0], this.props.teams).teamName
          } vs ${
            getRealData("_id", ele.teams[1], this.props.teams).teamName
          }`}</option>
        );
      });
    }
    return [opt, ...app];
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 offset-m1 m10 offset-l3 l6">
            <Dropdown
              onChange={this.onChange}
              value={this.state.selected}
              elems={this.renderDropDown(this.props.matches)}
            />
          </div>
        </div>
        <div className="row">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h5>{this.state.matchName || " "}</h5>
              <h6>{this.state.group || " "}</h6>
            </div>
          </div>
          <div className="col s6 offset-m1 m5">
            <h5>Team 01</h5>
            <h3>{this.state.team1 || "Not Selected"}</h3>
          </div>
          <div className="col s6 offset-m1 m5">
            <h5>Team 02</h5>
            <h3>{this.state.team2 || "Not Selected"}</h3>
          </div>
        </div>
        <div className="row">
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              padding: "10px"
            }}
          >
            <Button onClick={this.onSubmit} title="Set Monitor" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    matches: state.matches,
    teams: state.teams,
    logo: state.tournament.tournamentData.config.logo
  };
};

const mapDispatchToProps = {
  sendToDisplay
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NextMatch)
);
