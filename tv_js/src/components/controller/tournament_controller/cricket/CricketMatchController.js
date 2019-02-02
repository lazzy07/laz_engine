import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Ground from "./Ground";
import Paginations from "../../Paginations";
import { getRealData } from "../../../../functions";
import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";
import { Checkbox } from "../../Checkbox";
import { Radiobutton } from "../../RadioButton";

import {
  resetMatchConfig,
  setBowlingEnd,
  setShotPos,
  setRuns,
  setExtras,
  setWicket,
  setCatcher,
  setBowler,
  setBatsman,
  setBatsmen,
  setOut
} from "../../../../redux/actions/MatchActions";

class CricketMatchController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // runs: "?",
      // extra: "No extras",
      // wicket: "No wicket",
      // bowler: null,
      // batsman: null,
      // batsmen: [],
      // inning: "1",
      // over: "0",
      // ball: "0",
      // bowlingEnd: "Bottom",
      // catcher: "not selected",
      // shot: { x: 0, y: 0 },

      inning: "1",
      over: "0",
      ball: "0",
      matchData: null,
      battingTeam: null,
      bowlingTeam: null,
      overPagination: 4,
      updated: false
    };
    this.ground = null;
  }

  //Get sides that are playing
  getSides = () => {
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

  //Rendering batting side as check boxed list
  renderBattingSide = (team, currentBall) => {
    if (team) {
      return team.players.map((ele, index) => {
        return (
          <Checkbox
            key={index}
            id={ele._id}
            checked={
              currentBall.batsmen[0] === ele._id ||
              currentBall.batsmen[1] === ele._id
            }
            onClick={() =>
              this.changeBatsmen(ele._id, this.props.selected, currentBall)
            }
            title={ele.fName + " " + ele.lName}
          />
        );
      });
    } else {
      return <div />;
    }
  };

  //Rendering bowling side as a radio buttoned list
  renderBowlingSide = (team, currentBall) => {
    if (team) {
      let initData = (
        <div key={-1}>
          <Radiobutton
            onChange={e =>
              this.setBowler(null, this.props.selected, currentBall)
            }
            title={"Not Selected"}
            value={currentBall.bowler === null}
          />
        </div>
      );
      let a = team.players.map((ele, index) => {
        return (
          <div key={index}>
            <Radiobutton
              onChange={e =>
                this.setBowler(ele._id, this.props.selected, currentBall)
              }
              title={ele.fName + " " + ele.lName}
              value={currentBall.bowler === ele._id}
            />
          </div>
        );
      });

      return [initData, ...a];
    } else {
      return <div />;
    }
  };

  //Changing current batsmen pair
  changeBatsmen = (id, matchId, currentBall) => {
    let batsmen = currentBall.batsmen;
    let { batsman } = currentBall;
    if (batsmen.length < 2) {
      if (batsmen[0] === id) {
        if (batsman === id) {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsman: null,
            batsmen: []
          });
          // this.setState({
          //   batsman: null,
          //   batsmen: []
          // });
        } else {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsmen: []
          });
          // this.setState({
          //   batsmen: []
          // });
        }
      } else {
        if (batsman === id) {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsmen: [...batsmen, id],
            batsman: null
          });
          // this.setState({
          //   batsmen: [...batsmen, id],
          //   batsman: null
          // });
        } else {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsmen: [...batsmen, id]
          });
          // this.setState({
          //   batsmen: [...batsmen, id]
          // });
        }
      }
    }
    if (batsmen.length === 2) {
      if (id === batsmen[0]) {
        if (id === batsman) {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsman: null,
            batsmen: [batsmen[1]]
          });
          // this.setState({
          //   batsman: null,
          //   batsmen: [batsmen[1]]
          // });
        } else {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsmen: [batsmen[1]]
          });
          // this.setState({
          //   batsmen: [batsmen[1]]
          // });
        }
      } else if (id === batsmen[1]) {
        if (id === batsman) {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsman: null,
            batsmen: [batsmen[0]]
          });
          // this.setState({
          //   batsman: null,
          //   batsmen: [batsmen[0]]
          // });
        } else {
          this.props.setBatsmen(this.props.tournament._id, {
            matchId,
            ...currentBall,
            batsmen: [batsmen[0]]
          });
          // this.setState({
          //   batsmen: [batsmen[0]]
          // });
        }
      }
    }
  };

  //Render batsman chooser
  renderBatsmanChooser = currentBall => {
    let { batsmen } = currentBall;
    let { players } = this.props;

    if (batsmen) {
      let init = (
        <div key={-1}>
          <Radiobutton
            onChange={e =>
              this.setBatsman(null, this.props.selected, currentBall)
            }
            title={"Not Selected"}
            value={currentBall.batsman === null}
          />
        </div>
      );

      let batsmenData = [];
      for (let i = 0; i < batsmen.length; i++) {
        batsmenData.push(getRealData("_id", batsmen[i], players));
      }
      let a = batsmenData.map(ele => {
        return (
          <div key={ele._id}>
            <Radiobutton
              onChange={e =>
                this.setBatsman(ele._id, this.props.selected, currentBall)
              }
              title={ele.fName + " " + ele.lName}
              value={currentBall.batsman === ele._id}
            />
          </div>
        );
      });
      return [init, ...a];
    } else {
      return <h6>No batsmen have been selected</h6>;
    }
  };

  //Seeting current batsman
  setBatsman = (id, matchId, currentBall) => {
    this.props.setBatsman(this.props.tournament._id, {
      matchId,
      ...currentBall,
      batsman: id
    });
  };

  //setting current bowler
  setBowler = (id, matchId, currentBall) => {
    this.props.setBowler(this.props.tournament._id, {
      matchId,
      ...currentBall,
      bowler: id
    });
  };

  //Changing runs
  changeRuns = (runs, matchId, currentBall) => {
    this.props.setRuns(this.props.tournament._id, {
      matchId,
      ...currentBall,
      runs
    });
  };

  //Changing bowling ends
  changeBowlingEnd = (ele, matchId, currentBall) => {
    this.props.setBowlingEnd(this.props.tournament._id, {
      matchId,
      ...currentBall,
      bowlingEnd: ele
    });
  };

  changeExtras = (extra, matchId, currentBall) => {
    this.props.setExtras(this.props.tournament._id, {
      matchId,
      ...currentBall,
      extra
    });
  };

  changeWicket = (wicket, matchId, currentBall) => {
    this.props.setWicket(this.props.tournament._id, {
      matchId,
      ...currentBall,
      wicket
    });
  };

  changeInnings = inning => {
    localStorage.setItem("inning", inning);
    let bowlingTeam = this.state.battingTeam;
    this.setState({
      inning,
      battingTeam: this.state.bowlingTeam,
      bowlingTeam
    });
  };

  changeCatcher = (val, matchId, currentBall) => {
    this.props.setCatcher(this.props.tournament._id, {
      matchId,
      ...currentBall,
      catcher: val
    });
  };

  changeOut = (out, matchId, currentBall) => {
    this.props.setOut(this.props.tournament._id, {
      matchId,
      ...currentBall,
      out
    });
  };

  changeBall = index => {
    localStorage.setItem("ball", index);
    this.setState({
      ball: (parseInt(index) - 1).toString()
    });
  };

  changeOver = index => {
    localStorage.setItem("over", index);
    this.setState({
      over: (parseInt(index) - 1).toString()
    });
  };

  setShotPosition = (e, currentBall) => {
    let grndPos = this.ground.getBBox();
    if (grndPos) {
      let cPos = this.ground.svgPt();
      cPos.x = e.clientX;
      cPos.y = e.clientY;
      let cursor = cPos.matrixTransform(this.ground.getScrCoord());
      this.props.setShotPos(this.props.tournament._id, {
        matchId: this.props.selected,
        currentBall
      });
      this.setState({
        shot: { x: cursor.x, y: cursor.y }
      });
    }
  };

  renderCatch = currentBall => {
    if (currentBall.wicket === "Catch" || currentBall.wicket === "Run Out") {
      if (this.state.bowlingTeam) {
        let bowlingTeam = this.state.bowlingTeam;
        let battingTeam = this.state.battingTeam;

        let names = [
          <option key={-1} value="not selected">
            Not Selected
          </option>
        ];

        for (let i = 0; i < bowlingTeam.players.length; i++) {
          let x =
            bowlingTeam.players[i].fName + " " + bowlingTeam.players[i].lName;
          names.push(
            <option key={i} value={bowlingTeam.players[i]._id}>
              {x}
            </option>
          );
        }
        if (currentBall.wicket === "Run Out") {
          let names2 = [
            <option key={-1} value="not selected">
              Not Selected
            </option>
          ];

          for (let i = 0; i < battingTeam.players.length; i++) {
            let x =
              battingTeam.players[i].fName + " " + battingTeam.players[i].lName;
            names2.push(
              <option key={i} value={bowlingTeam.players[i]._id}>
                {x}
              </option>
            );
          }
          return (
            <div>
              <div>
                <h6 style={{ fontWeight: "bold" }}>Batsment got out</h6>
                <Dropdown
                  onChange={out =>
                    this.changeOut(out, this.props.selected, currentBall)
                  }
                  elems={names2}
                  value={currentBall.out || "not selected"}
                />
              </div>
              <h6 style={{ fontWeight: "bold" }}>
                {currentBall.wicket} taken by
              </h6>
              <Dropdown
                onChange={val =>
                  this.changeCatcher(val, this.props.selected, currentBall)
                }
                elems={names}
                value={currentBall.catcher || "not selected"}
              />
            </div>
          );
        } else {
          return (
            <div>
              <h6 style={{ fontWeight: "bold" }}>
                {currentBall.wicket} taken by
              </h6>
              <Dropdown
                onChange={val =>
                  this.changeCatcher(val, this.props.selected, currentBall)
                }
                elems={names}
                value={currentBall.catcher || "not selected"}
              />
            </div>
          );
        }
      } else {
        return null;
      }
    }
  };

  renderOverPagination = currentOver => {
    if (this.state.matchData) {
      let overs = parseInt(this.state.matchData.config.overs);
      let leftPagination = false;
      let rightPagination = false;
      if (this.state.overPagination < overs) {
        rightPagination = true;
      }
      if (this.state.overPagination > 4) {
        leftPagination = true;
      }
      let overElems = [];
      let max =
        overs - 1 > parseInt(this.state.overPagination)
          ? this.state.overPagination
          : overs - 1;
      for (let i = max - 4 > 0 ? max - 4 : 0; i <= max; i++) {
        overElems.push((i + 1).toString());
      }
      return (
        <Paginations
          left
          right
          onClick={this.changeOver}
          active={(parseInt(this.state.over) + 1).toString()}
          onLeftPaginationClick={this.onClickLeftOverPagination}
          onRightPaginationClick={this.onClickRightOverPagination}
          leftDisabled={!leftPagination}
          rightDisabled={!rightPagination}
          elems={overElems}
        />
      );
    }
  };

  onClickLeftOverPagination = () => {
    if (this.state.overPagination > 4) {
      this.setState({
        overPagination: this.state.overPagination - 5
      });
    }
  };

  onClickRightOverPagination = () => {
    if (this.state.matchData) {
      if (
        this.state.overPagination < parseInt(this.state.matchData.config.overs)
      ) {
        this.setState({
          overPagination: this.state.overPagination + 5
        });
      }
    }
  };

  renderBallPagination = ballsPerOver => {
    let balls = [];

    for (let i = 0; i < ballsPerOver; i++) {
      balls.push((i + 1).toString());
    }
    return balls;
  };

  resetMatch = matchId => {
    let paths = this.props.location.pathname.split("/");
    let tournamentId = paths[paths.length - 1];

    this.props.resetMatchConfig(tournamentId, matchId);
  };

  getData = () => {
    let { selected } = this.props;
    let { matchData } = this.state;
    if (matchData) {
      if (matchData._id !== selected) {
        let res = this.getLocalStorageData();
        this.addToState(
          res.localInning,
          res.localOver,
          res.localBall,
          matchData
        );
      } else {
        if (!this.state.updated) {
          let res = this.getLocalStorageData();
          this.addToState(
            res.localInning,
            res.localOver,
            res.localBall,
            matchData
          );
          this.setState({
            updated: true
          });
        }
      }
    }
  };

  addToState = (inningStr, overStr, ballStr, matchData) => {
    let inning = "inning" + inningStr;
    let over = parseInt(overStr);
    let ball = parseInt(ballStr);
    if (matchData) {
      this.setState({
        ...this.state,
        ...matchData.matchData[inning][over][ball]
      });
    }
  };

  getLocalStorageData = () => {
    let localSelected = localStorage.getItem("selected");
    if (this.props.selected === localSelected) {
      let localBall = "0";
      let localOver = "0";
      let localInning = "1";
      this.setState({
        ball: localBall,
        over: localOver,
        inning: localInning
      });
      return { localBall, localOver, localInning };
    } else {
      return null;
    }
  };

  componentWillMount = () => {
    let res = this.getLocalStorageData();
    if (this.state.matchData) {
      this.addToState(
        res.localInning,
        res.localOver,
        res.localBall,
        this.state.matchData
      );
    }
  };

  render() {
    this.getData();
    this.getSides();
    if (this.state.matchData && this.props.matches.length !== 0) {
      let currentMatch = getRealData(
        "_id",
        this.props.selected,
        this.props.matches
      );
      let currentBall =
        currentMatch.matchData["inning" + this.state.inning][
          parseInt(this.state.over)
        ].balls[parseInt(this.state.ball)];

      let thisOver =
        currentMatch.matchData["inning" + this.state.inning][
          parseInt(this.state.over)
        ];

      // let lastOver =
      //   this.state.over === "0"
      //     ? null
      //     : currentMatch.matchData["inning" + this.state.inning][
      //         parseInt(this.state.over) - 1
      //       ];

      // let lastBall =
      //   this.state.ball === "0"
      //     ? this.state.over === "0"
      //       ? null
      //       : currentMatch.matchData["inning" + this.state.inning][
      //           parseInt(this.state.over - 1)
      //         ].balls[parseInt(currentMatch.config.ballsPerOver) - 1]
      //     : currentMatch.matchData["inning" + this.state.inning][
      //         parseInt(this.state.over)
      //       ].balls[parseInt(this.state.ball) - 1];

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
              {this.renderOverPagination()}
            </div>
            <div className="col s6">
              <h5 style={{ fontWeight: "bolder" }}>Ball</h5>
              <Paginations
                elems={this.renderBallPagination(
                  this.state.matchData ? thisOver.balls.length : null
                )}
                active={(parseInt(this.state.ball) + 1).toString()}
                onClick={this.changeBall}
              />
            </div>
          </div>
          <div className="row">
            <div
              className="col s12 m8 l6"
              style={{ border: "3px solid #009688" }}
            >
              <Ground
                ref={grnd => (this.ground = grnd)}
                onClick={e => this.setShotPosition(e, currentBall)}
                top={thisOver.bowlingEnd === "Top"}
                bottom={thisOver.bowlingEnd === "Bottom"}
                active={thisOver.bowlingEnd.toLowerCase()}
                x={currentBall.shot.x}
                y={currentBall.shot.y}
              />
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
              <h6 style={{ fontWeight: "bolder" }}>Select Bowling End</h6>
              <Paginations
                elems={["Bottom", "Top"]}
                active={thisOver.bowlingEnd}
                onClick={ele =>
                  this.changeBowlingEnd(ele, this.props.selected, currentBall)
                }
              />
              <h6 style={{ fontWeight: "bolder" }}>Runs</h6>
              <Paginations
                elems={["?", "0", "1", "2", "3", "4", "5", "6", "7", "8"]}
                active={currentBall.runs}
                onClick={runs =>
                  this.changeRuns(runs, this.props.selected, currentBall)
                }
              />
              <h6 style={{ fontWeight: "bolder" }}>Extras</h6>
              <Paginations
                elems={["No extras", "Wd", "nb", "b"]}
                active={currentBall.extra}
                onClick={extra =>
                  this.changeExtras(extra, this.props.selected, currentBall)
                }
              />
              <h6 style={{ fontWeight: "bolder" }}>Wicket type</h6>
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
                active={currentBall.wicket}
                onClick={wicket =>
                  this.changeWicket(wicket, this.props.selected, currentBall)
                }
              />
              {this.renderCatch(currentBall)}
            </div>
            <div className="col s12 m12 l6">
              {this.renderBatsmanChooser(currentBall)}
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <h5 style={{ fontWeight: "bolder" }}>Bowling Team</h5>
              {this.renderBowlingSide(this.state.bowlingTeam, currentBall)}
            </div>
            <div className="col s12 m6">
              <h5 style={{ fontWeight: "bolder" }}>Batting Team</h5>
              {this.renderBattingSide(this.state.battingTeam, currentBall)}
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
                <Button
                  onClick={() => this.resetMatch(this.props.selected)}
                  title={"Reset Match"}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    matches: state.matches,
    teams: state.teams,
    players: state.players,
    tournament: state.tournament.tournamentData
  };
};

const mapDispatchToProps = {
  resetMatchConfig,
  setBowlingEnd,
  setShotPos,
  setRuns,
  setExtras,
  setWicket,
  setCatcher,
  setBowler,
  setBatsman,
  setBatsmen,
  setOut
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CricketMatchController)
);
