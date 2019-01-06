import React, { Component } from "react";
import { connect } from "react-redux";
import { setTeamData } from "../../redux/actions/TeamActions";
import { Collection } from "../../components/controller/Collection";
import AddNewTeam from "../../components/controller/AddNewTeam";
import { withRouter } from "react-router-dom";
import { getTeamMembers } from "../../functions";
import AddNewMatch from "../../components/controller/AddNewMatch";
import AddNewPlayer from "../../components/controller/AddNewPlayer";
import { setMatch } from "../../redux/actions/MatchActions";
import { setPlayerData } from "../../redux/actions/PlayerActions";

class AddDataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      match: null,
      player: null,
      type: "add_match"
    };
    this.addTeam = null;
    this.addMatch = null;
    this.addPlayer = null;
  }

  /**
   * Changing editor type
   * @param {String} type type of the component should be visible
   */
  changeEditorType = type => {
    this.setState({
      type
    });
  };

  renderMatchesArray = data => {
    return data.map(ele => {
      return (
        <span
          onClick={() => {
            this.changeEditorType("add_match");
            this.addMatch.settingState(ele, this.props.teams);
          }}
          key={ele._id}
        >
          {ele.match}
        </span>
      );
    });
  };

  renderTeamsArray = data => {
    return data.map(ele => {
      return (
        <span
          onClick={() => {
            this.setState({ team: ele });
            this.changeEditorType("add_team");
            this.addTeam.setTeamData(getTeamMembers(ele, this.props.players));
          }}
          key={ele._id}
        >
          {ele.teamName}
        </span>
      );
    });
  };

  renderPlayersArray = data => {
    return data.map(ele => {
      if (ele.nickName === "") {
        return (
          <span
            onClick={() => {
              this.changeEditorType("add_player");
              this.setState({ player: ele });
              this.addPlayer.setPlayerData(ele);
            }}
            key={ele._id}
          >
            {ele.fName + " " + ele.lName}
          </span>
        );
      } else {
        return (
          <span
            onClick={() => {
              this.setState({ player: ele });
              this.changeEditorType("add_player");
              this.addPlayer.setPlayerData(ele);
            }}
            key={ele._id}
          >
            {ele.fName + " " + ele.lName + " (" + ele.nickName + ")"}
          </span>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <h3>Add Data Screen</h3>
        </div>
        <div className="row">
          <div className="col s12 m3">
            <Collection
              data={[
                <span
                  onClick={() => {
                    this.setState({ match: null });
                    this.changeEditorType("add_match");
                    this.addMatch.settingState(null, this.props.teams);
                  }}
                  style={{ paddingLeft: "20px" }}
                >
                  Add New Match
                </span>,
                ...this.renderMatchesArray(this.props.matches),
                <span
                  onClick={() => {
                    this.setState({ team: null });
                    this.addTeam.setToAddNewData();
                    this.changeEditorType("add_team");
                  }}
                  style={{
                    paddingLeft: "20px",
                    width: "100%"
                  }}
                >
                  Add New Team
                </span>,
                ...this.renderTeamsArray(this.props.teams),
                <span style={{ paddingLeft: "20px" }}>Players</span>,
                ...this.renderPlayersArray(this.props.players)
              ]}
            />
          </div>
          <div className="col s12 m9">
            <AddNewTeam
              hidden={this.state.type === "add_team" ? false : true}
              tournament={this.props.location.pathname.split("/")[2]}
              ref={addTeam => (this.addTeam = addTeam)}
              team={this.state.team}
              players={this.props.players}
              _id={this.state.team ? this.state.team._id : null}
              playersPerTeam={this.props.playersPerTeam}
              teamSize={this.props.teamSize}
              setTeamData={this.props.setTeamData}
            />
            <AddNewMatch
              ref={addMatch => (this.addMatch = addMatch)}
              tournament={this.props.location.pathname.split("/")[2]}
              hidden={this.state.type === "add_match" ? false : true}
              teams={this.props.teams}
              match={this.state.match}
              _id={this.state.match ? this.state.team._id : null}
              setMatch={this.props.setMatch}
            />
            <AddNewPlayer
              ref={addPlayer => (this.addPlayer = addPlayer)}
              hidden={this.state.type === "add_player" ? false : true}
              tournament={this.props.location.pathname.split("/")[2]}
              setPlayer={this.props.setPlayerData}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.tournament.tournamentData.config) {
    return {
      matches: state.matches,
      players: state.players,
      teams: state.teams,
      playersPlaying: parseInt(
        state.tournament.tournamentData.config.playersPerTeam
      ),
      teamSize: parseInt(state.tournament.tournamentData.config.teamSize)
    };
  } else {
    return {
      matches: state.matches,
      players: state.players,
      teams: state.teams,
      playersPlaying: 1,
      teamSize: 1
    };
  }
};

const mapDispatchToProps = {
  setTeamData,
  setMatch,
  setPlayerData
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddDataScreen)
);
