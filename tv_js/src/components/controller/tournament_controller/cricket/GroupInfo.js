import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dropdown } from "../../Dropdown";
import {
  sendToDisplay,
  DISPLAY_GROUP_INFO_CRICKET
} from "../../../../redux/actions/MonitorActions";
import { Button } from "../../Button";
class GroupInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "not selected",
      groupTeams: null
    };
  }

  getGroupTeams = (teams, selected) => {
    let groupTeams = [];
    if (selected !== "not selected") {
      for (let i = 0; i < teams.length; i++) {
        if (teams[i].group === selected) {
          groupTeams.push(teams[i]);
        }
      }
    }
    return groupTeams;
  };

  onSubmit = teams => {
    if (this.state.selected !== "not selected") {
      let groupTeams = this.getGroupTeams(teams, this.state.selected);
      let paths = this.props.location.pathname.split("/");
      let _id = paths[paths.length - 1];
      let data = {
        logo: this.props.logo || "",
        groupTeams: groupTeams || "",
        groupName: this.state.selected
      };

      this.props.sendToDisplay({ _id, type: DISPLAY_GROUP_INFO_CRICKET, data });
    }
  };

  onChange = groupName => {
    this.setState({
      selected: groupName,
      groupTeams: this.getGroupTeams(this.props.teams, groupName)
    });
  };

  renderTeamList = () => {
    return this.state.groupTeams.map(ele => {
      return <h6 key={ele._id}>{ele.teamName}</h6>;
    });
  };

  renderDropDown = () => {
    let opt = (
      <option key={-1} value="not selected">
        Not Selected
      </option>
    );
    let app = [];
    let ret = [];
    let { teams } = this.props;
    for (let i = 0; i < teams.length; i++) {
      let found = false;
      for (let j = 0; j < app.length; j++) {
        if (app[j] === teams[i].group) {
          found = true;
        }
      }
      if (!found) {
        app.push(teams[i].group);
        ret.push(
          <option key={i} value={teams[i].group}>
            {teams[i].group}
          </option>
        );
      }
    }

    return [opt, ...ret];
  };

  render() {
    return (
      <div>
        <Dropdown
          onChange={this.onChange}
          elems={this.renderDropDown()}
          selected={this.state.selected}
        />
        <div>
          <h3>Teams</h3>
          <div>
            {this.state.selected === "not selected" ? (
              <h6>No Teams Selected"</h6>
            ) : (
              this.renderTeamList()
            )}
          </div>
        </div>
        <div
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => this.onSubmit(this.props.teams)}
            title={"Send To Display"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    logo: state.tournament.tournamentData.config.logo
  };
};

const mapDispatchToProps = {
  sendToDisplay
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupInfo)
);
