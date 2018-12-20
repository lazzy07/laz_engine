import React, { Component } from "react";
import Loading from "../../components/monitor/Loading";

class Monitor extends Component {
  render() {
    if (!this.props.loading) {
      return <Loading />;
    } else {
      return <div />;
    }
  }
}

export default Monitor;
