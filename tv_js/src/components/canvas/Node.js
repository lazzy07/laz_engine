import { HEADER_COLOR, HEADER_HEIGHT, NODE_WIDTH, NODE_HEIGHT } from ".";

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
    this.canMove = false;
    this.canSelect = false;
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

    let scalefac = this.canvas.getScaleFac();

    let off = this.canvas.getDivPos();
    if (
      (x - vX) * scalefac < mouseX &&
      (y - vY) * scalefac < mouseY - off &&
      (x + this.width - vX) * scalefac > mouseX &&
      (y + this.headerHeight - vY) * scalefac > mouseY - off
    ) {
      //code goes here
      this.canMove = true;
    } else {
      this.canMove = false;
    }
  };

  isNodeSelectable = ({ mouseX, mouseY }) => {
    let { x, y } = this.position;
    let vX = this.canvas.getViewportPos().x;
    let vY = this.canvas.getViewportPos().y;

    let scalefac = this.canvas.getScaleFac();

    let off = this.canvas.getDivPos();
    if (
      (x + vX) * scalefac < mouseX &&
      (y + vY) * scalefac < mouseY - off &&
      (x + this.width + vX) * scalefac > mouseX &&
      (y + this.height + vY) * scalefac > mouseY - off
    ) {
      //code goes here
      this.canSelect = true;
    } else {
      this.canSelect = false;
    }
  };

  /**
   * Get node can be selected or not
   * @returns {Boolean} says wether the node can be selected or not
   */
  getCanSelect = () => {
    return this.canSelect;
  };

  /**
   * Get nodes current position
   * @returns {Object} object with x, y coordinates of the nodes position
   */
  getPosition = () => {};

  /**
   * Drawing a node on the canvas
   */
  render = ({ x, y }) => {
    if (this.canvas) {
      // this.isNodeSelectable({ mouseX: x, mouseY: y });
      // this.isNodeMovable({ mouseX: x, mouseY: y });
      let ctx = this.canvas.getContext2d();

      //Outliner
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.rect(x, y, this.width, this.height);
      ctx.stroke();

      //Header Background
      ctx.beginPath();
      ctx.rect(x, y, this.width, this.headerHeight);
      ctx.fillStyle = this.color;
      ctx.fill();

      //Header Text
      ctx.font = "20px Arial";
      ctx.fillStyle = this.color;
      ctx.fillText("this.data.header.title");
    } else {
      console.log("Canvas not loaded");
    }
  };
}

export default Node;
