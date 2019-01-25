import React, { Component } from "react";
import { connect } from "react-redux";

class NextMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pos: 0,
      pos2: 0
    };
    this.t1 = null;
    this.t2 = null;
  }

  componentDidMount = () => {
    this.setState({
      pos:
        this.t1.getBoundingClientRect().y +
        this.t1.getBoundingClientRect().height,
      pos2: this.t2.getBoundingClientRect()
    });

    window.addEventListener("resize", () => {
      this.setState({
        pos:
          this.t1.getBoundingClientRect().y +
          this.t1.getBoundingClientRect().height,
        pos2: this.t2.getBoundingClientRect()
      });
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", () => {});
  }

  render() {
    const { color01, color02, fontColor } = this.props.data.colors;
    const { team1, team2, group, logo } = this.props.data.data;
    return (
      <div
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
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
        <div
          style={{
            zIndex: 10,
            position: "absolute",
            width: "30vw",
            height: "90vh",
            top: "5vh",
            right: "-10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            style={{ transform: "translate(-50%,-50%)" }}
            src={logo}
            width="180vw"
            alt=""
          />
        </div>

        <h1
          ref={t1 => (this.t1 = t1)}
          style={{
            position: "absolute",
            zIndex: 11,
            top: "34vh",
            left: "20vw",
            color: fontColor,
            fontWeight: "bolder",
            backgroundColor: color01,
            padding: "10px"
          }}
        >
          {team1.toUpperCase()}
        </h1>
        <h1
          ref={t2 => (this.t2 = t2)}
          style={{
            position: "absolute",
            zIndex: 11,
            top: this.state.pos,
            left: "20vw",
            color: fontColor,
            fontWeight: "bolder",
            backgroundColor: color01,
            padding: "10px",
            marginLeft: "50px"
          }}
        >
          {team2.toUpperCase()}
        </h1>
        <h5
          style={{
            fontWeight: "bold",
            position: "absolute",
            zIndex: 11,
            top: "10vh",
            left: "50vw",
            textAlign: "center",
            color: color02,
            backgroundColor: color01,
            padding: "10px"
          }}
        >
          {"Coming Up..."}
        </h5>
        <h6
          style={{
            fontWeight: "bold",
            position: "absolute",
            zIndex: 11,
            top: this.state.pos + this.state.pos2.height - 12 || 0,
            left: this.state.pos2.x,
            color: color01,
            backgroundColor: color02,
            padding: "10px"
          }}
        >
          {group}
        </h6>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.monitor.data
  };
};

export default connect(mapStateToProps)(NextMatch);
