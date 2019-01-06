import React, { Component } from "react";
import { Inputbox } from "./Inputbox";
import { Button } from "./Button";
import Socket from "../../socket/Socket";
import { SAVE_TEAM_OK } from "../../redux/actions/TeamActions";

class AddNewTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: "",
      teamMembers: []
    };
  }

  /**
   * Changing Team name
   */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Changing player information in the state (teamMembers array)
   */
  onChangePlayerData = e => {
    let teamMembers = this.state.teamMembers;

    let vals = e.target.name.split("_");
    let index = parseInt(vals[1]);

    let name = vals[0];

    for (let i = 0; i < teamMembers.length; i++) {
      if (index === teamMembers[i].index) {
        teamMembers[index][name] = e.target.value;
      }
    }

    this.setState({
      teamMembers
    });
  };

  /**
   * Rendering player input data as a JSX element
   * @param {number} index index of the element to be rendered
   */
  renderPlayerDataEntry = index => {
    return (
      <tr key={index} className="row">
        <td className="col s6 m6">
          <Inputbox
            onChange={e => {
              this.onChangePlayerData(e);
            }}
            id={"fName" + index}
            name={"fName_" + index}
            value={this.state.teamMembers[index].fName}
            title={"Player " + (index + 1) + "'s First Name"}
            color="grey"
            active
          />
        </td>
        <td className="col s6 m6">
          <Inputbox
            onChange={e => {
              this.onChangePlayerData(e);
            }}
            id={"lName" + index}
            name={"lName_" + index}
            value={this.state.teamMembers[index].lName}
            title={"Player " + (index + 1) + "'s Last Name"}
            color="grey"
            active
          />
        </td>
        <td className="col s6 m6">
          <Inputbox
            onChange={e => {
              this.onChangePlayerData(e);
            }}
            id={"nickName" + index}
            name={"nickName_" + index}
            value={this.state.teamMembers[index].nickName}
            title={"Player " + (index + 1) + "'s Nick Name"}
            color="grey"
            active
          />
        </td>
      </tr>
    );
  };

  /**
   * Render user data inputs as an array
   * @param {number} size size of the array of inputs needed
   */
  renderTeamDataInputs = size => {
    let teamMembers = [];
    const initialPlayerData = {
      _id: null,
      fName: "",
      lName: "",
      nickName: ""
    };

    for (let i = 0; i < this.props.teamSize; i++) {
      teamMembers.push({ ...initialPlayerData, index: i });
    }

    if (this.state.teamMembers.length !== parseInt(this.props.teamSize)) {
      this.setState({
        teamMembers
      });
    }

    let inputs = [];

    for (let i = 0; i < size; i++) {
      if (this.state.teamMembers.length === parseInt(size)) {
        inputs.push(this.renderPlayerDataEntry(i));
      }
    }
    return inputs;
  };

  /**
   * Setting state with correct data
   * @param {Object} data data of team wih teamMembers injected
   */
  setTeamData = data => {
    let teamMembers = [];
    const initialPlayerData = {
      _id: null,
      fName: "",
      lName: "",
      nickName: ""
    };

    for (let i = 0; i < this.props.teamSize; i++) {
      teamMembers.push({ ...initialPlayerData, index: i });
    }

    for (let i = 0; i < data.teamMembers.length; i++) {
      teamMembers[i] = {
        ...teamMembers[i],
        ...data.teamMembers[i]
      };
    }

    this.setState({
      teamName: data.teamName,
      teamMembers
    });
  };

  setToAddNewData = () => {
    let teamMembers = [];
    const initialPlayerData = {
      _id: null,
      fName: "",
      lName: "",
      nickName: ""
    };

    for (let i = 0; i < this.props.teamSize; i++) {
      teamMembers.push({ ...initialPlayerData, index: i });
    }
    this.setState({
      _id: null,
      teamName: "",
      teamMembers
    });
  };

  componentDidMount() {
    Socket.socket.on(SAVE_TEAM_OK, () => {
      window.location.reload();
    });
  }

  render() {
    let arr = this.renderTeamDataInputs(this.props.teamSize);
    if (this.props.hidden) {
      return <div />;
    } else {
      return (
        <div>
          <Inputbox
            active
            id={"teamName"}
            name="teamName"
            onChange={e => this.onChange(e)}
            value={this.state.teamName}
            title={"Team Name"}
            color="grey"
          />
          <table className="striped">
            <tbody>{arr}</tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              padding: "30px"
            }}
          >
            <Button
              onClick={() =>
                this.props.setTeamData({
                  ...this.state,
                  tournament: this.props.tournament,
                  _id: this.props._id || null
                })
              }
              title="Add data"
            />
          </div>
        </div>
      );
    }
  }
}

export default AddNewTeam;
