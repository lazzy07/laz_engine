import React, { Component } from "react";
import { fontColor } from "../../constants";
import { Gradient } from "../../components/Gradient";
import { connect } from "react-redux";
import { getTournamentList } from "../../redux/actions/TournamentActions";
import { Button } from "../../components/controller/Button";
import { withRouter } from "react-router-dom";

class SelectTournament extends Component {
  componentDidMount() {
    this.props.getTournamentList();
  }

  createTournament = () => {
    this.props.history.push("create_tournament");
  };

  onSelectTournament = id => {
    this.props.history.push("controller/" + id);
  };

  renderTournamentList = data => {
    if (data) {
      return data.map(ele => {
        return (
          <div
            id={ele._id}
            key={ele._id}
            onClick={() => this.onSelectTournament(ele._id)}
            className="pressable"
            style={{
              padding: "5px",
              paddingLeft: "50px",
              paddingRight: "50px",
              marginBottom: "10px",
              borderBottom: "6px solid rgba(237, 0, 247, 1)",
              backgroundColor: "rgba(255,255,255,0.05)"
            }}
          >
            <h3>{ele.name}</h3>
            <h5>{ele.type}</h5>
          </div>
        );
      });
    }
  };

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
                SELECT TOURNAMENT
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
          style={{
            justifyContent: "center",
            marginTop: "10px",
            paddingBottom: "80px",
            fontFamily: "Bebas Neue",
            color: fontColor
          }}
        >
          {/* Select Tournament */}
          <div
            style={{
              border: "",
              margin: "30px",
              maxHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              overflowY: "scroll"
            }}
          >
            <div>{this.renderTournamentList(this.props.tournamentList)}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button title="Create New" onClick={this.createTournament} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { tournamentList: state.tournament.tournamentList };
};

const mapDispatchToProps = {
  getTournamentList
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SelectTournament)
);
