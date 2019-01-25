import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/monitor/Loading";
import {
  registerMonitor,
  DISPLAY_INTRO,
  DISPLAY_NEXT_MATCH,
  DISPLAY_GROUP_INFO_CRICKET
} from "../../redux/actions/MonitorActions";
import Background from "../../components/monitor/tv_graphics/Background";
import Intro from "../../components/monitor/tv_graphics/Intro";
import NextMatch from "../../components/monitor/tv_graphics/NextMatch";
import GroupInfo from "../../components/monitor/tv_graphics/cricket/GroupInfo";

class Monitor extends Component {
  componentDidMount = () => {
    let monitorName = localStorage.getItem("monitorName");
    this.props.registerMonitor(monitorName);
  };

  selectRender = () => {
    if (this.props.loading) {
      return <Loading />;
    } else {
      const { type } = this.props.data;

      switch (type) {
        case DISPLAY_INTRO:
          return <Intro />;

        case DISPLAY_NEXT_MATCH:
          return <NextMatch />;

        case DISPLAY_GROUP_INFO_CRICKET:
          return <GroupInfo />;

        default:
          return <Loading />;
      }
    }
  };

  render() {
    return (
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        {this.selectRender()}
        <Background />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.monitor.loading,
    type: state.monitor.type,
    data: state.monitor.data
  };
};

const mapDispatchToProps = {
  registerMonitor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor);
