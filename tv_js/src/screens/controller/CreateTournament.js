import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Inputbox } from "../../components/controller/Inputbox";
import { fontColor } from "../../constants";
import { Gradient } from "../../components/Gradient";
import { Radiobutton } from "../../components/controller/RadioButton";
import { Button } from "../../components/controller/Button";
import {
  createNewTournament,
  CREATE_TOURNAMENT_ERROR,
  CREATE_TOURNAMENT_OK
} from "../../redux/actions/TournamentActions";

import Socket from "../../socket/Socket";

class CreateTournament extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: {
        cricket: true,
        football: false,
        rugby: false
      },
      err: ""
    };
  }

  changeName = e => {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  };

  changeType = e => {
    this.setState({
      type: {
        cricket: false,
        football: false,
        rugby: false,
        [e.target.name]: e.target.value === "on" ? true : false
      }
    });
  };

  onSubmit = () => {
    if (this.state.name !== "") {
      this.setState({
        err: ""
      });
      let type = "cricket";

      if (this.state.type.football) {
        type = "football";
      } else if (this.state.type.rugby) {
        type = "rugby";
      }

      let res = {
        name: this.state.name,
        type
      };

      this.props.createNewTournament(res);
    }
  };

  componentDidMount() {
    Socket.socket.on(CREATE_TOURNAMENT_OK, () => {
      this.props.history.push("select_tournament");
    });

    Socket.socket.on(CREATE_TOURNAMENT_ERROR, err => {
      this.setState({
        err
      });
    });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            zIndex: -9999999999,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            backgroundColor: "#040e2f",
            backgroundSize: "cover",
            overflow: "hidden"
          }}
        >
          <video height="100%" loop autoPlay muted>
            <source
              src="./dependencies/videos/background.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <Gradient />
        <div style={{ display: "flex" }}>
          <div
            style={{
              textAlign: "center",
              width: "100%",
              color: fontColor,
              fontFamily: "Bebas Neue"
            }}
          >
            <h1 className="hide-on-small-only">
              <u style={{ textDecoration: "overline underline" }}>
                CREATE TOURNAMENT
              </u>
            </h1>
          </div>
        </div>
        <div
          style={{
            color: fontColor,
            position: "absolute",
            bottom: 0,
            right: 0,
            paddingRight: "10px"
          }}
        >
          <h5>
            <b>@lazzy07</b> Production
          </h5>
          <p>2018 Copyright Cyborg Studios ©</p>
        </div>
        <div
          style={{
            color: fontColor,
            position: "absolute",
            bottom: 0,
            left: 0,
            fontFamily: "Bebas Neue",
            paddingLeft: "10px"
          }}
        >
          <h6>Engine v 2.0</h6>
        </div>
        <div
          className="row"
          style={{
            justifyContent: "center",
            marginTop: "10px",
            padding: "80px",
            fontFamily: "Bebas Neue",
            color: fontColor
          }}
        >
          {/* Select Tournament */}
          <div className="col s12 m8 offset-m2">
            <Inputbox
              color={fontColor}
              white
              id="tournament_name"
              title="Tournament name"
              onChange={this.changeName}
              value={this.state.name}
            />
            <div>
              <Radiobutton
                title="Cricket"
                name="cricket"
                value={this.state.type.cricket}
                onChange={e => this.changeType(e)}
              />
            </div>
            <div>
              <Radiobutton
                title="Football"
                name="football"
                value={this.state.type.football}
                onChange={e => this.changeType(e)}
              />
            </div>
            <div>
              <Radiobutton
                title="Rugby"
                name="rugby"
                value={this.state.type.rugby}
                onChange={e => this.changeType(e)}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingTop: "10px"
              }}
            >
              <p>{this.state.err}</p>
              <Button
                title="Create"
                onClick={this.onSubmit}
                disabled={this.state.name !== "" ? false : true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createNewTournament
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(CreateTournament)
);
