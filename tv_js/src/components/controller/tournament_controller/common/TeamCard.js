import React, { Component } from "react";
import {
  sendToDisplay,
  DISPLAY_TEAM_CARD
} from "../../../../redux/actions/MonitorActions";
import { Dropdown } from "../../Dropdown";
import { connect } from "react-redux";
import { getRealData } from "../../../../functions";
import { renderPlayers } from "../../../../functions/FetchData";
import { Button } from "../../Button";

class TeamCard extends Component {
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

  sendToScreen = id => {
    let players = renderPlayers(id, this.props.teams, this.props.players);
    this.props.sendToDisplay({
      _id: this.props.tournament._id,
      type: DISPLAY_TEAM_CARD,
      data: { players }
    });
  };

  render() {
    return (
      <div>
        <h1>Teamcard Screen</h1>
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
          <div
            className="col s12"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {this.state.selectedTeam !== "not selected" ? (
              <Button
                title="Send To Display"
                onClick={() => this.sendToScreen(this.state.selectedTeam)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToPops = state => {
  return {
    tournament: state.tournament.tournamentData,
    matches: state.matches,
    teams: state.teams,
    players: state.players,
    logo: state.tournament.tournamentData.config.logo
  };
};

const mapDispatchToProps = {
  sendToDisplay
};

export default connect(
  mapStateToPops,
  mapDispatchToProps
)(TeamCard);
