import React, { Component } from "react";
import { sendToDisplay } from "../../../../redux/actions/MonitorActions";
import { Dropdown } from "../../Dropdown";
import { connect } from "react-redux";
import { getRealData } from "../../../../functions";

class ScoreCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMatch: "not selected",
      selectedTeam: "not selected"
    };
  }

  renderMatchesDropdown = matches => {
    let a = (
      <option key={-1} value={"not selected"}>
        Not Selected
      </option>
    );

    let b = matches.map((ele, index) => {
      return (
        <option key={index} value={ele._id}>
          {getRealData("_id", ele.teams[0], this.props.teams).teamName +
            " vs " +
            getRealData("_id", ele.teams[0], this.props.teams).teamName +
            " (" +
            ele.match +
            ")"}
        </option>
      );
    });

    return [a, ...b];
  };

  renderTeamsDropdown = matchId => {
    if (matchId) {
      let match = getRealData("_id", matchId, this.props.matches);
      let team1 = getRealData("_id", match.teams[0], this.props.teams);
      let team2 = getRealData("_id", match.teams[1], this.props.teams);

      return [
        <option key={-1} value="not selected">
          Not Selcted
        </option>,
        <option key={0} value={team1._id}>
          {team1.teamName}
        </option>,
        <option key={1} value={team2._id}>
          {team2.teamName}
        </option>
      ];
    }
  };

  changeSelectedMatch = id => {
    this.setState({
      selectedMatch: id
    });
  };

  changeTeam = id => {
    this.setState({
      selectedTeam: id
    });
  };

  render() {
    return (
      <div>
        <h1>Scorecard Screen</h1>
        <div className="row">
          <div className="col s12 m8">
            <Dropdown
              elems={this.renderMatchesDropdown(this.props.matches)}
              value={this.state.selectedMatch}
              onChange={this.changeSelectedMatch}
            />
            {this.state.selectedMatch !== "not selected" ? (
              <Dropdown
                elems={this.renderTeamsDropdown(this.state.selectedMatch)}
                value={this.state.selectedTeam}
                onChange={this.changeTeam}
              />
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col s8" />
        </div>
      </div>
    );
  }
}

const mapStateToPops = state => {
  return {
    matches: state.matches,
    teams: state.teams,
    players: state.players
  };
};

const mapDispatchToProps = {
  sendToDisplay
};

export default connect(
  mapStateToPops,
  mapDispatchToProps
)(ScoreCard);
