import React, { Component } from "react";
import { Inputbox } from "./Inputbox";
import { Button } from "./Button";
import Socket from "../../socket/Socket";
import { SET_PLAYER_DATA_OK } from "../../redux/actions/PlayerActions";

class AddNewPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      fName: "",
      lName: "",
      nickName: ""
    };
  }

  onSubmit = () => {
    this.props.setPlayer({
      ...this.state,
      tournamentId: this.props.tournament
    });
  };

  setPlayerData = ({ _id, fName, lName, nickName }) => {
    this.setState({
      _id,
      fName,
      lName,
      nickName
    });
  };

  onChangePlayerData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount = () => {
    Socket.socket.on(SET_PLAYER_DATA_OK, () => {
      this.setState({
        _id: null,
        fName: "",
        lName: "",
        nickName: ""
      });
      window.location.reload();
    });
  };

  render() {
    if (this.props.hidden) {
      return <div />;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col s6 m6">
              <Inputbox
                onChange={e => {
                  this.onChangePlayerData(e);
                }}
                id={"fName_player"}
                name={"fName"}
                value={this.state.fName}
                title={"First Name"}
                color="grey"
                active
              />
            </div>
            <div className="col s6 m6">
              <Inputbox
                onChange={e => {
                  this.onChangePlayerData(e);
                }}
                id={"lName_player"}
                name={"lName"}
                value={this.state.lName}
                title={"Last Name"}
                color="grey"
                active
              />
            </div>
            <div className="col s6 m6">
              <Inputbox
                onChange={e => {
                  this.onChangePlayerData(e);
                }}
                id={"nickName_player"}
                name={"nickName"}
                value={this.state.nickName}
                title={"Nick Name"}
                color="grey"
                active
              />
            </div>
            <div
              className="col s12"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button title="Change Player" onClick={this.onSubmit} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AddNewPlayer;
