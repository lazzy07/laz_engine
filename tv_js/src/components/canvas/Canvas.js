import React, { Component } from "react";
import { SCALE_SPEED } from ".";

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasSize: {
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight
      },
      viewPortPos: { x: 0, y: 0 },
      scale: 1,
      scalefac: 1,
      scaleSpeed: {
        up: SCALE_SPEED.up,
        down: SCALE_SPEED.down
      },
      scaleClip: { min: -3, max: 4 },
      scaleCount: { up: 0, down: 0 }
    };
    this.canvas = null;
  }

  /**
   * Get ref to canvas
   */
  getCanvas = () => {
    return this.canvas;
  };

  /**
   * Get the position of the canvas element from the top of the page
   * @returns {Number} offset from the top of the webpage
   */
  getDivPos = () => {
    return this.canvas.offsetTop;
  };

  /**
   * Getting 2d context reference of the canvas element
   * @returns {Object} canvas 2d context refernce
   */
  getContext2d = () => {
    return this.canvas.getContext("2d");
  };

  /**
   * Setting up viewport position
   * @param {Object} pos pos {x, y} of the viewport
   */
  setViewportPos = ({ x, y }) => {
    this.setState({
      viewPortPos: {
        ...this.state.viewPortPos,
        x,
        y
      }
    });
  };

  /**
   * Get viewport pos
   * @returns {Object} get viewport pos {x, y}
   */
  getViewportPos = () => {
    let { x, y } = this.state.viewPortPos;
    return { x, y };
  };

  /**
   * Convert to screen position
   * @param {Object} pos get position relative to the screen pos
   * @returns {Object} object with parameters {x,y} which are screen coordinates
   */
  getScreenPos = ({ x, y }) => {
    let { xx, yy } = this.state.viewPortPos;
    return { x: x - xx, y: y - yy };
  };

  /**
   * Get zoom of the canvas
   * @returns {Number} zoom amount of the canvas
   */
  getZoom = () => {
    return this.state.scale;
  };

  /**
   * Set zoom amount of the canvas
   * @param {Number} scale scale of the zoom
   */
  setZoom = scale => {
    let sc = this.state.scale;
    let canScale = true;

    let upScale = this.getScaleCount().up;
    let downScale = this.getScaleCount().down;

    if (scale === this.state.scaleSpeed.up) {
      if (sc >= this.state.scaleClip.max) {
        canScale = false;
      } else {
        let scaleDiff = upScale + 1 - downScale;
        let scalefac = Math.pow(SCALE_SPEED.up, scaleDiff);
        this.setState({
          scalefac,
          scale: this.state.scale + 1,
          scaleCount: {
            ...this.state.scaleCount,
            up: this.state.scaleCount.up + 1
          }
        });
      }
    } else {
      if (sc <= this.state.scaleClip.min) {
        canScale = false;
      } else {
        let scaleDiff = upScale - (downScale + 1);
        let scalefac = Math.pow(SCALE_SPEED.up, scaleDiff);
        this.setState({
          scale: this.state.scale - 1,
          scalefac,
          scaleCount: {
            ...this.state.scaleCount,
            down: this.state.scaleCount.down + 1
          }
        });
      }
    }
    if (canScale) {
      this.getContext2d().scale(scale, scale);
    }
  };

  /**
   * Clearing canvas after drawing
   */
  clearCanvas = () => {
    this.getContext2d().clearRect(
      0,
      0,
      this.state.canvasSize.canvasWidth,
      this.state.canvasSize.canvasHeight
    );
  };

  /**
   * Getting count of the scaling (zooming) done
   * @returns {Object} object with no of upsacling and downscaling done by the user {up, down}
   */
  getScaleCount = () => {
    return this.state.scaleCount;
  };

  getScaleFac = () => {
    return this.state.scalefac;
  };

  componentDidMount() {
    let { canvasHeight, canvasWidth } = this.state.canvasSize;
    this.canvas.height = canvasHeight;
    this.canvas.width = canvasWidth;
  }

  render() {
    return (
      <div>
        <canvas ref={canvas => (this.canvas = canvas)} />
      </div>
    );
  }
}

export default Canvas;
