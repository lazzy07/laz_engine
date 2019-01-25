import React, { Component } from "react";
import Ground from "./Ground";

export default class CricketMatchController extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l6">
          <Ground />
        </div>
      </div>
    );
  }
}
