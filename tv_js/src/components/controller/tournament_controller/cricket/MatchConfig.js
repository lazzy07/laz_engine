import React, { Component } from "react";
import { Dropdown } from "../../Dropdown";
import { getRealData } from "../../../../functions";
import { Button } from "../../Button";

export default class MatchConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "odi",
      firstInnningBat: "not selected",
      thirdInningBat: "not seleceted"
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
