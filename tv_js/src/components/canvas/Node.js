import {
  HEADER_COLOR,
  HEADER_HEIGHT,
  NODE_WIDTH,
  NODE_HEIGHT,
  SCALE_SPEED
} from ".";

class Node {
  constructor(
    canvas,
    _id,
    position,
    data,
    color = HEADER_COLOR,
    width = NODE_WIDTH,
    height = NODE_HEIGHT,
    headerHeight = HEADER_HEIGHT
  ) {
    this.canvas = canvas;
    this._id = _id;
    this.position = position;
    this.data = data;
    this.color = color;
    this.width = width;
    this.height = height;
    this.headerHeight = headerHeight;
  }

  /**
   * Changing nodes position
   * @param {Object} position position to be changed
   */
  changePos = ({ x, y }) => {
    this.position.x = x;
    this.position.y = y;
  };

  /**
   * Check wether the node is movable
   */
  isNodeMovable = ({ mouseX, mouseY }) => {
    let { x, y } = this.position;
    let vX = this.canvas.getViewportPos().x;
    let vY = this.canvas.getViewportPos().y;

    let upScale = this.canvas.getScaleCount().up;
    let downScale = this.canvas.getScaleCount().down;

    let scaleDiff = upScale - downScale;

    let scalefac = Math.pow(SCALE_SPEED.up, scaleDiff);

    let off = this.canvas.getDivPos();
    if (
      (x - vX) * scalefac < mouseX &&
      (y - vY) * scalefac < mouseY - off &&
      (x + this.width - vX) * scalefac > mouseX &&
      (y + this.headerHeight - vY) * scalefac > mouseY - off
    ) {
      //code goes here
    }
  };

  /**
   * Drawing a node on the canvas
   * @param {Object} data data to be drawn {header: {text: "", noodle: null, description: ""}, body: [{text: "", noodle: null, description: ""}]}
   * @param {String} color color of the node
   * noodle - {node}
   */
  render = ({ x, y }) => {
    if (this.canvas) {
      this.isNodeMovable({ mouseX: x, mouseY: y });
      let ctx = this.canvas.getContext2d();

      //Outliner
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.rect(this.position.x, this.position.y, this.width, this.height);
      ctx.stroke();

      //Header Background
      ctx.beginPath();
      ctx.rect(this.position.x, this.position.y, this.width, this.headerHeight);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      console.log("Canvas not loaded");
    }
  };
}

export default Node;
