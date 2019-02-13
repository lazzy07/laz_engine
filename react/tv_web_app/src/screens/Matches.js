import React, { Component } from 'react'
import {firestore} from "../firebase"
import {Card} from "react-materialize";
import {withRouter} from "react-router-dom"

class Matches extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       matches: []
    }
  }

  componentWillMount = () => {
    firestore
      .collection("users")
      .doc("antiraggers15").collection("matches").onSnapshot(snapShot => {
        var matches = [];
        snapShot.forEach(doc => {
          matches.push({...doc.data(), _id: doc.id})
        })
        this.setState({
          matches
        })
      })
  };

  renderMatches = matches => {
    return matches.map((ele, index) => {
      return (
      <div key={index} className="col s12 m4">
        <Card className='teal' textClassName='white-text' title={ele.match} actions={[<span>Get Info</span>]}>
          {"Get more info"}
        </Card>
      </div>)
    })
  }
  
  render() {
    return (
      <div className="row">
        <h3>Matches</h3>
        <div className="row">
          {this.renderMatches(this.state.matches)}
        </div>
      </div>
    )
  }
}
export default withRouter(Matches)