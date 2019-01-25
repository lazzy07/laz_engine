import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

class Background extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: null,
      playing: null,
      no: 0
    };
    this.vid = null;
  }

  /**
   * Setting file list to be played in background video according to the monitorType
   */
  setFileList = () => {
    if (!this.state.fileList && this.props.fileList) {
      let monitorType = localStorage.getItem("monitorType");
      let fL = this.props.fileList[monitorType].sort(function(a, b) {
        return 0.5 - Math.random();
      });
      this.setState({
        fileList: fL,
        playing: fL[0],
        no: 0
      });
    }
  };

  onEnded = () => {
    let no = this.state.no + 1;
    if (this.state.fileList.length !== no) {
      this.setState({
        playing: this.state.fileList[this.state.no + 1],
        no: this.state.no + 1
      });
    } else {
      this.setState({
        playing: this.state.fileList[0],
        no: 0
      });
    }
  };

  render() {
    this.setFileList();
    if (this.state.fileList) {
      return (
        <div style={{ overflow: "hidden", zIndex: 10000 }}>
          <ReactPlayer
            playing={true}
            onEnded={this.onEnded}
            muted
            width="100vw"
            height="100vh"
            url={`./dependencies/videos/background_videos/${localStorage.getItem(
              "monitorType"
            )}/${this.state.playing}`}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    fileList: state.monitor.fileList
  };
};

export default connect(mapStateToProps)(Background);
