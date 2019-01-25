import React, { Component } from "react";
import { Inputbox } from "./Inputbox";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { connect } from "react-redux";
import {
  setTournamentConfigData,
  setTournamentConfigState
} from "../../redux/actions/TournamentActions";
import MyDropzone from "./DropZone";

class CricketSettings extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     ballsPerOver: 6,
  //     overs: 6,
  //     playersPerTeam: 6,
  //     teamSize: 8,
  //     pointsPerWin: 3,
  //     pointsPerDraw: 1,
  //     pointsPerLoss: 0,
  //     freeHit: true,
  //     pointsPerWide: 1,
  //     pointsPerNoball: 1,
  //     pointsPerBoundary: 4,
  //     pointsPerSix: 6,
  //     changeSides: true
  //   };
  // }

  onChange = e => {
    this.props.setTournamentConfigState({
      [e.target.name]: e.target.value
    });
  };

  onClick = name => {
    this.props.setTournamentConfigState({
      [name]: !this.props.data[name]
    });
  };

  componentDidMount = () => {
    this.drop.setImage(this.props.data.logo);
  };

  render() {
    return (
      <div className="row">
        <div className="col s12 m4 offset-m4">
          <div>
            <h5>Common Settings</h5>
            <MyDropzone ref={drop => (this.drop = drop)} />
          </div>
          <h5 style={{ paddingBottom: "10px" }}>Cricket Settings</h5>
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Description"
            name="description"
            id="description"
            value={this.props.data.description || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Balls Per Over"
            name="ballsPerOver"
            id="ballsPerOver"
            value={this.props.data.ballsPerOver || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Overs"
            name="overs"
            id="overs"
            value={this.props.data.overs || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Players per team"
            name="playersPerTeam"
            id="playersPerTeam"
            value={this.props.data.playersPerTeam || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Team size"
            name="teamSize"
            id="teamSize"
            value={this.props.data.teamSize || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Points awarded per win"
            name="pointsPerWin"
            id="pointsPerWin"
            value={this.props.data.pointsPerWin || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Points awarded per draw"
            name="pointsPerDraw"
            id="pointsPerDraw"
            value={this.props.data.pointsPerDraw || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Points awarded per loss"
            name="pointsPerLoss"
            id="pointsPerLoss"
            value={this.props.data.pointsPerLoss.toString() || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Runs awarded per wide"
            name="pointsPerWide"
            id="pointsPerWide"
            value={this.props.data.pointsPerWide || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Runs awarded per noball"
            name="pointsPerNoball"
            id="pointsPerNoball"
            value={this.props.data.pointsPerNoball || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Runs awarded per boundary"
            name="pointsPerBoundary"
            id="pointsPerBoundary"
            value={this.props.data.pointsPerBoundary || ""}
            color={"black"}
            active
          />
          <Inputbox
            onChange={e => this.onChange(e)}
            title="Runs awarded per six"
            name="pointsPerSix"
            id="pointsPerSix"
            value={this.props.data.pointsPerSix || ""}
            color={"black"}
            active
          />
          <Checkbox
            onClick={() => this.onClick("freeHit")}
            name="freeHit"
            title="Free Hit?"
            checked={this.props.data.freeHit}
          />
          <Checkbox
            onClick={() => this.onClick("changeSides")}
            name="changeSides"
            title="Change batting ends?"
            checked={this.props.data.changeSides}
          />
          <Button
            title="Confirm"
            onClick={() =>
              this.props.setTournamentConfigData({
                ...this.props.data,
                logo: this.drop.getImage()
              })
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: { ...state.tournament.tournamentData.config }
  };
};

const mapDispatchToProps = {
  setTournamentConfigData,
  setTournamentConfigState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CricketSettings);
