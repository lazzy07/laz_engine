import React, { Component } from "react";
import { connect } from "react-redux";
import { getRealData } from "../../../../functions";

class TournamentController extends Component {
  /**
   * Send data to be rendered on monitors about next match or current match
   * @param {Object} match match data that need to display on the monitor
   * @param {String} caption now||up next
   * @returns {Object} dispatch object with type and payload
   */
  sendNextMatchData = (match, caption) => {
    const { teams } = this.props;
    if (match.teams) {
      let team1 = getRealData("_id", match.teams[0], teams);
      let team2 = getRealData("_id", match.teams[1], teams);

      let res = {
        caption,
        ...match,
        teams: [team1, team2]
      };

      return res;
    }
    return null;
  };

  render() {
    const { matches } = this.props;
    if (matches.length !== 0) {
      this.sendNextMatchData(matches[0]);
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    matches: state.matches,
    teams: state.teams
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentController);
