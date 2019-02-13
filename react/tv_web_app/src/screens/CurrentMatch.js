import React, { Component } from 'react'
import {Col, Row, Preloader} from "react-materialize"
import { firestore } from '../firebase';
import { getRealData } from '../functions';
export default class CurrentMatch extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data: null
    }
  }
  componentWillMount = () => {
    firestore.collection("users").doc("antiraggers15").collection("data").doc("currentMatch").onSnapshot(snapShot => {
      this.setState({
        data: snapShot.data()
      })
    })
  };

  renderOver = (currentOver, colors) => {
    return currentOver.balls.map((ele, index) => {
      return (
        <span
          key={index}
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: colors.color01,
            color: colors.fontColor,
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
    if(this.state.data){
      let {data, colors} = this.state.data;
      let state = data.data;

      let {
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
      } = state;
      let {
        color01, color02, fontColor
      } = colors;

      console.log(batsmenData);
      let batsmen1 = {
        score: 0,
        balls: 0
      }

      let batsmen2 = {
        score: 0,
        balls: 0
      }
      if(batsmen.length > 0){
        if(batsmen[0]){
          if(batsmenData.score[batsmen[0]]){
            batsmen1.score = batsmenData.score[batsmen[0]]
          }
          if(batsmenData.balls[batsmen[0]]){
            batsmen1.balls = batsmenData.balls[batsmen[0]]
          }
        }
      }
      if(batsmen.length > 0){
        if(batsmen[1]){
          if(batsmenData.score[batsmen[1]]){
            batsmen1.score = batsmenData.score[batsmen[1]]
          }
          if(batsmenData.balls[batsmen[0]]){
            batsmen1.balls = batsmenData.balls[batsmen[1]]
          }
        }
      }
      
      return (<div>
        <div className="row">
          <div style={{textAlign: "center", width: "100%", color: fontColor, backgroundColor: color01, padding: "30px"}}>
            <h3>{battingTeam.teamName.toUpperCase() + " vs " + bowlingTeam.teamName.toUpperCase()}</h3>
            <h5 style={{ padding: "0px", fontWeight: "bolder" }}>
              {battingTeam.teamName.toUpperCase() + " batting"}
            </h5>
            <h1>{score} / {wickets} <span style={{fontSize: "35px"}}>({overs})</span></h1>
          </div>
        </div>
        <div className="row">
          <div style={{textAlign: "center"}}>
            <h4>This Over</h4>
            {this.renderOver(thisOver, colors)}
          </div>
        </div>
        {/* <div className="row">
        <div className="col offset-s2 s4">
            <h6>Bowler</h6>
            <h4>
              {bowler
                ? getRealData("_id", bowler, bowlingTeam.players).fName || null +
                  " " +
                  getRealData("_id", bowler, bowlingTeam.players).lName
                : null}
            </h4>
          </div>
          <div className="col offset-s2 s4">
            <h6>Batting</h6>
            <h5 styl={{ fontWeight: "bolder" }}>
              {batsmen
                ? getRealData("_id", batsmen[0], battingTeam.players).fName +
                  " " +
                  getRealData("_id", batsmen[0], battingTeam.players).lName //+ " "+ batsmen1.score + "(" + batsmen1.balls +")"
                : null}
              {batsman === batsmen[0] ? "*" : ""}
            </h5>
            <h5>
              {batsmen
                ? getRealData("_id", batsmen[1], battingTeam.players).fName +
                  " " +
                  getRealData("_id", batsmen[1], battingTeam.players).lName //+ " "+ batsmen2.score + "(" + batsmen2.balls +")"
                : null}
              {batsman === batsmen[1] ? "*" : ""}
            </h5>
          </div>
          
        </div> */}
      </div>);
    }else{
      return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%"}}>
          <Row>
          <Col s={4}>
            <Preloader flashing size='big'/>
          </Col>
        </Row>
        </div>
      )
    }
    
  }
}
