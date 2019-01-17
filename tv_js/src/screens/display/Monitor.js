import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/monitor/Loading";
import { registerMonitor } from "../../redux/actions/MonitorActions";

class Monitor extends Component {
  componentDidMount = () => {
    let monitorName = localStorage.getItem("monitorName");
    this.props.registerMonitor(monitorName);
  };

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return { loading: state.monitor.loading, type: state.monitor.type };
};

const mapDispatchToProps = {
  registerMonitor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor);
