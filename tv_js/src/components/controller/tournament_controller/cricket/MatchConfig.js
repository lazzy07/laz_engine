import React, { Component } from "react";
import { Dropdown } from "../../Dropdown";
import { getRealData } from "../../../../functions";
import { Button } from "../../Button";
import { Checkbox } from "../../Checkbox";
import { Inputbox } from "../../Inputbox";

export default class MatchConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "odi",
      firstInnningBat: "not selected",
      thirdInningBat: "not seleceted",
      ballsPerOver: null,
      overs: null,
      extraCountAsABall: null,
      changeSides: null,
      freeHit: null
    };
  }

  onbattingTeamChange = id => {
    this.setState({
      firstInnningBat: id
    });
  };

  renderDropDownForBat = selectedMatch => {
    let opt = (
      <option disabled key={-1} value="not selected">
        Not Selected
      </option>
    );
    let app = [];
    if (selectedMatch !== "not selected") {
      const { matches, teams } = this.props;
      if (matches.length !== 0 && teams.length !== 0) {
        let matchdata = getRealData("_id", selectedMatch, matches);
        if (matchdata) {
          let getTeams = [];
          getTeams.push(getRealData("_id", matchdata.teams[0], teams));
          getTeams.push(getRealData("_id", matchdata.teams[1], teams));

          app = getTeams.map((ele, index) => {
            return (
              <option value={ele._id} key={index}>
                {ele.teamName}
              </option>
            );
          });
        }
      }
      return [opt, ...app];
    } else {
      return [opt];
    }
  };

  renderMatchType = () => {
    return [
      <option key={0} value="odi">
        ODI
      </option>,
      <option key={1} value="test">
        Test
      </option>
    ];
  };

  changeMatchType = type => {
    this.setState({
      type
    });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state);
  };

  onClick = name => {
    this.setState({
      [name]: !this.state[name]
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount() {
    let {
      ballsPerOver,
      overs,
      extraCountAsABall,
      changeSides,
      freeHit
    } = this.props.tournament.config;
    this.setState({
      ballsPerOver,
      overs,
      extraCountAsABall,
      changeSides,
      freeHit
    });
  }

  render() {
    return (
      <div>
        <h4>Please Select configurations for the match</h4>

        <div className="row">
          <div className="col s12 m6">
            <h6>Type of the match (ODI / TEST)</h6>
            <Dropdown
              value={this.state.type}
              elems={this.renderMatchType()}
              onChange={this.changeMatchType}
            />
          </div>
          <div className="col s12 m6">
            <h6>First inning batting team</h6>
            <Dropdown
              elems={this.renderDropDownForBat(this.props.selected)}
              value={this.state.firstInnningBat}
              onChange={this.onbattingTeamChange}
            />
          </div>
        </div>
        <Inputbox
          onChange={e => this.onChange(e)}
          title="Balls Per Over"
          name="ballsPerOver"
          id="ballsPerOver"
          value={this.state.ballsPerOver || ""}
          color={"black"}
          active
        />
        <Inputbox
          onChange={e => this.onChange(e)}
          title="Overs"
          name="overs"
          id="overs"
          value={this.state.overs || ""}
          color={"black"}
          active
        />
        <Checkbox
          onClick={() => this.onClick("freeHit")}
          name="freeHit"
          title="Free Hit?"
          checked={this.state.freeHit}
        />
        <Checkbox
          onClick={() => this.onClick("changeSides")}
          name="changeSides"
          title="Change batting ends?"
          checked={this.state.changeSides}
        />
        <Checkbox
          onClick={() => this.onClick("extraCountAsABall")}
          name="extraCountAsABall"
          title="Does an extra count as a ball?"
          checked={this.state.extraCountAsABall}
        />
        <div className="row">
          <div
            className="col s12"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button title="Start Match" onClick={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}
