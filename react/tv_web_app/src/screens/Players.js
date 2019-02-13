import React, { Component } from 'react'
import {firestore} from "../firebase"
import {Card} from "react-materialize";
import {withRouter} from "react-router-dom";

class Players extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       players: []
    }
  }
  componentWillMount = () => {
    firestore
      .collection("users")
      .doc("antiraggers15").collection("players").onSnapshot(snapShot => {
        var players = [];
        snapShot.forEach(doc => {
          players.push(doc.data())
        })
        this.setState({
          players
        })
      })
  };

  renderPlayers = players => {
    return players.map((ele, index) => {
      return (
      <div key={index} className="col s12 m4">
        <Card className='teal' textClassName='white-text' title={ele.fName + " " + ele.lName} actions={[<span>Get Info</span>]}>
          {"Get more info"}
        </Card>
      </div>)
    })
  }
  
  render() {
    return (
      <div className="row">
        <h3>Players</h3>
        <div className="row">
          {this.renderPlayers(this.state.players)}
        </div>
      </div>
    )
  }
}

export default withRouter(Players)