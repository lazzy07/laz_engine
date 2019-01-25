import React, { Component } from "react";
import { connect } from "react-redux";

class GroupInfo extends Component {
  render() {
    const { groupName } = this.props.data;
    const { color01, color02, fontColor } = this.props.colors;
    return (
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            zIndex: 10,
            position: "absolute",
            backgroundColor: color02,
            width: "40vw",
            height: "90vh",
            opacity: 0.7,
            top: "5vh",
            left: "-10%"
          }}
        />
        <div
          style={{
            zIndex: 10,
            position: "absolute",
            backgroundColor: color02,
            width: "30vw",
            height: "90vh",
            opacity: 0.7,
            top: "5vh",
            right: "-10%"
          }}
        />
        <h3
          style={{
            position: "absolute",
            zIndex: 11,
            fontSize: "2.5rem",
            color: color01,
            textAlign: "center",
            top: "5vh",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: color02,
            padding: "10px"
          }}
        >
          {groupName}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { data: state.monitor.data.data, colors: state.monitor.data.colors };
};

export default connect(mapStateToProps)(GroupInfo);
