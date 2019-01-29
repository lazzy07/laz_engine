import React, { Component } from "react";
import { connect } from "react-redux";
import Ground from "./Ground";
import Paginations from "../../Paginations";
import { getRealData } from "../../../../functions";
import { Button } from "../../Button";
import { Inputbox } from "../../Inputbox";
import { Dropdown } from "../../Dropdown";

class CricketMatchController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      runs: "?",
      extra: "No extras",
      wicket: "No wicket",
      bowler: null,
      batsmen: [],
      matchData: null,
      inning: "1",
      over: "0",
      ball: "0",
      battingTeam: null,
      bowlingTeam: null,
      catcher: "not selected"
    };
  }

  renderSides = () => {
    let selectedMatch = this.props.selected;
    if (
      selectedMatch &&
      this.props.matches.length !== 0 &&
      this.props.teams.length !== 0 &&
      this.props.players.length !== 0
    ) {
      let match = getRealData("_id", selectedMatch, this.props.matches);
      let team1 = getRealData("_id", match.teams[0], this.props.teams);
      let team2 = getRealData("_id", match.teams[1], this.props.teams);

      let t1playerData = team1.players.map(ele => {
        return getRealData("_id", ele, this.props.players);
      });
      let t2playerData = team2.players.map(ele => {
        return getRealData("_id", ele, this.props.players);
      });
      let teams = [
        { ...team1, players: t1playerData },
        { ...team2, players: t2playerData }
      ];

      let battingTeam = null;
      let bowlingTeam = null;

      if (this.state.inning === "1") {
        for (let i = 0; i < teams.length; i++) {
          if (match.config.firstInnningBat === teams[i]._id) {
            battingTeam = teams[i];
          } else {
            bowlingTeam = teams[i];
          }
        }
      } else if (this.state.inning === "2") {
        for (let i = 0; i < teams.length; i++) {
          if (match.config.firstInnningBat === teams[i]._id) {
            bowlingTeam = teams[i];
          } else {
            battingTeam = teams[i];
          }
        }
      }

      if (this.state.matchData) {
        if (this.state.matchData._id !== selectedMatch) {
          this.setState({
            matchData: { ...match, teams },
            battingTeam,
            bowlingTeam
          });
        }
      } else {
        this.setState({
          matchData: { ...match, teams },
          battingTeam,
          bowlingTeam
        });
      }
    }
  };

  changeRuns = runs => {
    this.setState({
      runs
    });
  };

  changeExtras = extra => {
    this.setState({
      extra
    });
  };

  changeWicket = wicket => {
    this.setState({
      wicket
    });
  };

  changeInnings = inning => {
    this.setState({
      inning
    });
  };

  changeCatcher = val => {
    this.setState({
      catcher: val
    });
  };

  renderCatch = () => {
    if (this.state.wicket === "Catch") {
      if (this.state.matchData) {
        let bowlingTeam = this.state.bowlingTeam;

        let names = [
          <option key={-1} disabled value="not selected">
            Not Selected
          </option>
        ];

        for (let i = 0; i < bowlingTeam.players.length; i++) {
          let x =
            bowlingTeam.players[i].fName + " " + bowlingTeam.players[i].lName;
          names.push(
            <option key={i} value={x}>
              {x}
            </option>
          );
        }
        return (
          <div>
            <h6>Catch taken by</h6>
            <Dropdown
              onChange={this.changeCatcher}
              elems={names}
              value={this.state.catcher || "not selected"}
            />
          </div>
        );
      } else {
        return null;
      }
    }
  };

  render() {
    this.renderSides();
    return (
      <div>
        <div className="row">
          <div
            className="col s12"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              padding: "20px"
            }}
          >
            <div>
              <h4 style={{ fontWeight: "bolder" }}>Select Inning</h4>
              <Paginations
                elems={["1", "2"]}
                active={this.state.inning}
                onClick={this.changeInnings}
              />
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <div className="col s6">
            <h5 style={{ fontWeight: "bolder" }}>Over</h5>
            <Paginations elems={[1, 2]} />
          </div>
          <div className="col s6">
            <h5 style={{ fontWeight: "bolder" }}>Ball</h5>
            <Paginations elems={[1, 2]} />
          </div>
        </div>
        <div className="row">
          <div
            className="col s12 m8 l6"
            style={{ border: "3px solid #009688" }}
          >
            <Ground />
          </div>
          <div
            className="col s12 m12 l6"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center"
            }}
          >
            <Paginations
              elems={["?", "0", "1", "2", "3", "4", "5", "6", "7", "8"]}
              active={this.state.runs}
              onClick={this.changeRuns}
            />
            <Paginations
              elems={["No extras", "Wd", "nb", "b"]}
              active={this.state.extra}
              onClick={this.changeExtras}
            />
            <Paginations
              elems={[
                "No wicket",
                "Wicket",
                "Catch",
                "Run Out",
                "Stump",
                "LBW",
                "Hit Wicket"
              ]}
              active={this.state.wicket}
              onClick={this.changeWicket}
            />
            {this.renderCatch()}
          </div>
        </div>
        <div className="row">
          <div
            className="col s12"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <div>
              <h6>
                <b>Careful!</b> this will reset the match
              </h6>
              <Button title={"Reset Match"} />
            </div>
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
    players: state.players
  };
};

export default connect(mapStateToProps)(CricketMatchController);
