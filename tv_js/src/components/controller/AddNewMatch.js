import React, { Component } from "react";
import { Dropdown } from "./Dropdown";
import { Inputbox } from "./Inputbox";
import { Button } from "./Button";
import { getRealData } from "../../functions";
import Socket from "../../socket/Socket";
import { SET_MATCH_DATA_OK } from "../../redux/actions/MatchActions";

class AddNewMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      matchName: "",
      group: "",
      selected1: null,
      selected2: null
    };
  }

  onSubmit = () => {
    if (this.state.selected1 && this.state.selected2) {
      let sendData = {
        ...this.state,
        tournamentId: this.props.tournament
      };
      this.props.setMatch(sendData);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeValDropdown = (teamName, sel) => {
    if (this.props.teams) {
      for (let i = 0; i < this.props.teams.length; i++) {
        if (this.props.teams[i].teamName === teamName) {
          this.setState({ [sel]: this.props.teams[i] });
        }
      }
    }
  };

  getTeamListToDropdown = (data, otherSel) => {
    let teamArr = [];
    data.forEach(element => {
      if (element !== this.state[otherSel]) {
        teamArr.push(element);
      }
    });
    return teamArr;
  };

  renderDropdownList = data => {
    let a = (
      <option value="Not Selected" disabled key={-1}>
        Not Selected
      </option>
    );
    let b = data.map((ele, index) => {
      return (
        <option value={ele.teamName} key={index}>
          {ele.teamName}
        </option>
      );
    });

    return [a, ...b];
  };

  settingState = (data, teams) => {
    if (data) {
      this.setState({
        _id: data._id,
        selected1: getRealData("_id", data.teams[0], teams),
        selected2: getRealData("_id", data.teams[1], teams),
        matchName: data.match || "",
        group: data.group || ""
      });
    } else {
      this.setState({
        _id: null,
        matchName: "",
        group: "",
        selected1: null,
        selected2: null
      });
    }
  };

  componentDidMount() {
    Socket.socket.on(SET_MATCH_DATA_OK, () => {
      this.setState({
        _id: null,
        matchName: "",
        selected1: null,
        selected2: null
      });
      window.location.reload();
    });
  }

  render() {
    if (this.props.hidden) {
      return <div />;
    } else {
      return (
        <div className="row">
          <div className="col s12">
            <div className="col offset-m2 s12 m8">
              <Inputbox
                active
                color="grey"
                name="matchName"
                title="Match Name(optional)"
                id="match_name"
                value={this.state.matchName}
                onChange={e => this.onChange(e)}
              />
              <Inputbox
                active
                id={"group"}
                name="group"
                onChange={e => this.onChange(e)}
                value={this.state.group}
                title={"Group (A, B, C or semi, quarter, final)"}
                color="grey"
              />
            </div>
          </div>
          <div className="col s12">
            <div className="col m6">
              <Dropdown
                value={
                  this.state.selected1
                    ? this.state.selected1.teamName
                    : "Not Selected"
                }
                elems={this.renderDropdownList(
                  this.getTeamListToDropdown(this.props.teams, "selected2"),
                  "selected1"
                )}
                title="Team 01"
                onChange={teamName => {
                  this.onChangeValDropdown(teamName, "selected1");
                }}
              />
            </div>
            <div className="col m6">
              <Dropdown
                value={
                  this.state.selected2
                    ? this.state.selected2.teamName
                    : "Not Selected"
                }
                elems={this.renderDropdownList(
                  this.getTeamListToDropdown(this.props.teams, "selected1"),
                  "selected2"
                )}
                title="Team 02"
                onChange={teamName => {
                  this.onChangeValDropdown(teamName, "selected2");
                }}
              />
            </div>
            <div
              className="col s12"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button title="Add Match" onClick={this.onSubmit} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AddNewMatch;
