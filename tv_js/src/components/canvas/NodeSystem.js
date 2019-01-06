import React, { Component } from "react";
import Canvas from "./Canvas";
import Renderer from "./Renderer";

class NodeSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvas = null;
    this.renderer = null;
  }

  componentDidMount() {
    this.renderer = new Renderer(this.canvas);
    this.renderer.configCanvas();
    this.renderer.animate();
  }

  render() {
    return (
      <div style={{ width: "100%", height: "70vh", overflow: "hidden" }}>
        <Canvas ref={canvas => (this.canvas = canvas)} />
      </div>
    );
  }
}

export default NodeSystem;
