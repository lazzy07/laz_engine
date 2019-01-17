import React, { Component } from "react";
import SettingsScreen from "./Settings";
import AddDataScreen from "./AddData";
import ControlScreen from "./Control";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTournamentData } from "../../redux/actions/TournamentActions";
import { getPlayerList } from "../../redux/actions/PlayerActions";
import { getTeamData } from "../../redux/actions/TeamActions";
import { getMatchesList } from "../../redux/actions/MatchActions";
import Socket from "../../socket/Socket";

class MainControllerScreen extends Component {
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
        return (
          <AddDataScreen
            matches={this.props.matches}
            teams={this.props.teams}
            players={this.props.players}
          />
        );
      } else if (screen === "settings") {
        return <SettingsScreen data={this.props.tournamentData} />;
      }
    }
  };

  onClick = e => {
    this.setState({
      screen: e
    });
  };

  componentDidMount() {
    let tournament = this.props.location.pathname.split("/")[2];

    this.props.getTournamentData();
    this.props.getMatchesList(tournament);
    this.props.getPlayerList(tournament);
    this.props.getTeamData(tournament);
    Socket.socket.emit("ADD_CONTROLLER");
  }

  /* eslint-disable no-alert, no-console */
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <span
              className="brand-logo left hide-on-small-only"
              style={{ paddingLeft: "5px", overflow: "hidden" }}
            >
              {this.props.tournamentData.name}
            </span>
            <ul id="nav-mobile" className="right">
              <li>
                {/* eslint-disable-next-line */}
                <a onClick={() => this.onClick("control")}>Control</a>
              </li>
              <li>
                {/* eslint-disable-next-line */}
                <a onClick={() => this.onClick("add_data")}>Add Data</a>
              </li>
              <li>
                {/* eslint-disable-next-line */}
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

const mapDispatchToProps = {
  getTournamentData,
  getPlayerList,
  getMatchesList,
  getTeamData
};

const mapStateToProps = state => {
  return {
    tournamentData: state.tournament.tournamentData,
    matches: state.matches,
    teams: state.teams,
    players: state.players
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainControllerScreen)
);
