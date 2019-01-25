import React, { Component } from "react";
import { Dropdown } from "../../Dropdown";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getRealData } from "../../../../functions";
import MatchConfig from "./MatchConfig";
import CricketMatchController from "./CricketMatchController";

class MatchController extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    localStorage.setItem("selected", id);
    localStorage.setItem("team1", team1);
    localStorage.setItem("team2", team2);
    localStorage.setItem("group", group);
    localStorage.setItem("matchName", matchName);

    this.setState({
      selected: id,
      team1,
      team2,
      group,
      matchName
    });
  };

  renderDropDown = matches => {
    let opt = (
      <option key={-1} value="not selected">
        Not Selected
      </option>
    );
    let app = [];
    if (this.props.teams.length !== 0) {
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

  onSubmit = state => {
    if (state.type && state.firstInnningBat !== "not selected") {
      if (this.state.selected !== "not selected") {
      }
    }
  };

  renderMatchController = selectedMatch => {
    if (selectedMatch !== "not selected") {
      if (!selectedMatch.config) {
        return (
          <MatchConfig
            teams={this.props.teams}
            matches={this.props.matches}
            selected={this.state.selected}
            onSubmit={this.onSubmit}
          />
        );
      } else {
        return <CricketMatchController />;
      }
    } else {
      return <div />;
    }
  };

  componentWillMount = () => {
    this.setState({
      selected: localStorage.getItem("selected") || "not selected",
      team1: localStorage.getItem("team1") || null,
      team2: localStorage.getItem("team2") || null,
      group: localStorage.getItem("group") || null,
      matchName: localStorage.getItem("matchName") || ""
    });
  };

  render() {
    return (
      <div>
        <h2>Match Controller</h2>
        <p>Please select the current match</p>
        <div className="row">
          <div className="col s12 m6">
            <Dropdown
              onChange={this.onChange}
              elems={this.renderDropDown(this.props.matches)}
              value={this.state.selected}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {this.renderMatchController(this.state.selected)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    matches: state.matches
  };
};

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps)(MatchController));
