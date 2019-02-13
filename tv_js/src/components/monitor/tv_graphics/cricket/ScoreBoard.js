import React, { Component } from "react";
import { connect } from "react-redux";
import { getRealData } from "../../../../functions";

class ScoreBoard extends Component {
  renderOver = currentOver => {
    return currentOver.balls.map((ele, index) => {
      return (
        <span
          key={index}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: this.props.colors.color02,
            color: this.props.colors.color01,
            fontWeight: "bolder",
            fontSize: "50px",
            borderRadius: "5px 20px 5px"
          }}
        >
          {ele.runs}
        </span>
      );
    });
  };

  render() {
    const {
      score,
      overs,
      wickets,
      battingTeam,
      bowlingTeam,
      bowler,
      thisOver,
      batsmen,
      batsman,
      batsmenData
    } = this.props.data;
    const { color01, color02, fontColor } = this.props.colors;
    return (
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "100%",
          height: "100vh"
        }}
      >
        <div
          style={{
            width: "40%",
            height: "90vh",
            backgroundColor: color02,
            opacity: 0.5,
            position: "absolute",
            top: "5vh",
            left: "-10%"
          }}
        />
        <div
          style={{
            width: "30%",
            height: "90vh",
            opacity: 0.5,
            backgroundColor: color02,
            position: "absolute",
            top: "5vh",
            right: "-10%"
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "70%",
            opacity: 0.95,
            height: "80vh",
            backgroundColor: color01,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50vh",
            left: "50%"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            height: "80vh",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50vh",
            left: "50%"
          }}
        >
          <div
            style={{
              color: fontColor,
              marginLeft: "100px",
              marginRight: "100px",
              textAlign: "center",
              backgroundColor: color02,
              fontWeight: "bolder",
              marginTop: "-50px"
            }}
          >
            <h3>
              {battingTeam.teamName.toUpperCase()} vs{" "}
              {bowlingTeam.teamName.toUpperCase()}
            </h3>
          </div>
          <div
            style={{
              color: fontColor,
              textAlign: "center",
              backgroundColor: color02,
              marginLeft: "200px",
              marginRight: "200px",
              marginTop: "10px"
            }}
          >
            <h4 style={{ padding: "0px", fontWeight: "bolder" }}>
              {battingTeam.teamName.toUpperCase()}
            </h4>
            <h1 style={{ fontSize: "7em" }}>
              <span style={{ fontWeight: "bold" }}>{score}</span>
              <span style={{ fontSize: "70px" }}>/</span>
              <span style={{ fontSize: "60px" }}>{wickets}</span>
              <span style={{ fontSize: "30px" }}>({overs})</span>
            </h1>
          </div>
          <div style={{ margin: "20px", textAlign: "center" }}>
            <h5 style={{ color: color02 }}>This Over</h5>
            {this.renderOver(thisOver)}
          </div>
        </div>
        {/* <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "20%",
            color: color02
          }}
        >
          <h6>Bowler</h6>
          <h4>
            {bowler
              ? getRealData("_id", bowler, bowlingTeam.players).fName +
                " " +
                getRealData("_id", bowler, bowlingTeam.players).lName
              : null}
          </h4>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "20%",
            color: color02
          }}
        >
          <h6>Batting</h6>
          <h5 styl={{ fontWeight: "bolder" }}>
            {batsmen
              ? getRealData("_id", batsmen[0], battingTeam.players).fName +
                " " +
                getRealData("_id", batsmen[0], battingTeam.players).lName
              : null}
            {batsman === batsmen[0] ? "*" : ""}
          </h5>
          <h5>
            {batsmen
              ? getRealData("_id", batsmen[1], battingTeam.players).fName +
                " " +
                getRealData("_id", batsmen[1], battingTeam.players).lName
              : null}
            {batsman === batsmen[1] ? "*" : ""}
          </h5>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { data: state.monitor.data.data, colors: state.monitor.data.colors };
};

export default connect(mapStateToProps)(ScoreBoard);
