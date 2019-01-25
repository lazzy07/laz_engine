import React, { Component } from "react";
import { connect } from "react-redux";

class Intro extends Component {
  render() {
    const { color01, color02 } = this.props.data.colors;
    const { tournamentName, logo, description } = this.props.data.data;

    return (
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "100%",
          height: "100vh"
        }}
      >
        <div
          style={{
            width: "40%",
            height: "90vh",
            backgroundColor: color02,
            opacity: 0.5,
            position: "absolute",
            top: "5vh",
            left: "-10%"
          }}
        />
        <div
          style={{
            width: "30%",
            height: "90vh",
            opacity: 0.5,
            backgroundColor: color02,
            position: "absolute",
            top: "5vh",
            right: "-10%"
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "70%",
            opacity: 0.95,
            height: "80vh",
            backgroundColor: color01,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50vh",
            left: "50%"
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "70%",
            height: "80vh",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50vh",
            left: "50%"
          }}
        >
          <img height="280vh" alt="" src={logo} />
          <div style={{ opacity: 1 }}>
            <h2 style={{ color: color02 }}>{tournamentName.toUpperCase()}</h2>
          </div>
          <div>
            <h5 style={{ color: color02 }}>{description}</h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.monitor.data
  };
};

export default connect(mapStateToProps)(Intro);
