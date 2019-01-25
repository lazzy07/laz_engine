import React, { Component } from "react";
import { Collection } from "../../../components/controller/Collection";
import MatchController from "../../../components/controller/tournament_controller/cricket/MatchController";
import ScoreCard from "../../../components/controller/tournament_controller/cricket/ScoreCard";
import TeamCard from "../../../components/controller/tournament_controller/common/TeamCard";
import Manhattan from "../../../components/controller/tournament_controller/cricket/Manhattan";
import Progress from "../../../components/controller/tournament_controller/cricket/Progress";
import Runchase from "../../../components/controller/tournament_controller/cricket/Runchase";
import Standings from "../../../components/controller/tournament_controller/cricket/Standings";
import KnockoutInfo from "../../../components/controller/tournament_controller/common/KnockoutInfo";
import NextMatch from "../../../components/controller/tournament_controller/common/NextMatch";
import Intro from "../../../components/controller/tournament_controller/common/Intro";
import LastMatches from "../../../components/controller/tournament_controller/cricket/LastMatches";
import GroupInfo from "../../../components/controller/tournament_controller/cricket/GroupInfo";

const cricketCollection = [
  "Match Controller",
  "Score Card",
  "Team Card",
  "Manhattan",
  "Progress",
  "Run Chase",
  "Standings",
  "Group Info",
  "Knockout Info",
  "Next Match",
  "Intro",
  "Last Matches"
];

export default class CricketController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };
  }

  /**
   * Displaying correct component
   * @param {Number} index active index
   */
  activeEle = index => {
    this.setState({
      active: index
    });
  };

  /**
   * Rendering corresponding screen
   * @param {Number} index index of the component to be rendered
   * @returns {JSX} component
   */

  renderComponent = index => {
    switch (index) {
      case 0:
        return <MatchController />;

      case 1:
        return <ScoreCard />;

      case 2:
        return <TeamCard />;

      case 3:
        return <Manhattan />;

      case 4:
        return <Progress />;

      case 5:
        return <Runchase />;

      case 6:
        return <Standings />;

      case 7:
        return <GroupInfo />;

      case 8:
        return <KnockoutInfo />;

      case 9:
        return <NextMatch />;

      case 10:
        return <Intro />;

      case 11:
        return <LastMatches />;

      default:
        return <MatchController />;
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m3 l2" style={{ paddingTop: "20px" }}>
            <Collection activeEle={this.activeEle} data={cricketCollection} />
          </div>
          <div className="col s12 m9 l10" style={{ paddingTop: "30px" }}>
            {this.renderComponent(this.state.active)}
          </div>
        </div>
      </div>
    );
  }
}
