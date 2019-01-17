import Node from "./Node";

let dummyData = [
  {
    _id: "lol1",
    position: { x: 10, y: 10 },
    type: "node",
    data: {
      header: {
        title: "Match 01",
        config: {
          color: null, //if special color needed for the node {headerColor, fontColor, bodyColor, noddleColor, blobColor}
          canConnect: true //set this false to stop nodes connecting
        },

        noodles: {
          input: [
            {
              title: "",
              to: null,
              types: [""] //only types of noodles mentioned here can be connected
            }
          ],
          output: [
            {
              title: "",
              to: null,
              types: [""] //only types of noodles mentioned here can be connected
            }
          ]
        }
      },
      body: {
        title: "Team 01 vs Team 02",
        config: {
          color: null, //{bodyColor, noddleColor, blobColor}
          canConnect: true
        },
        noodles: {
          input: [
            {
              title: "",
              to: null,
              types: [""] //only types of noodles mentioned here can be connected
            }
          ],
          output: [
            {
              title: "",
              to: null, //id of the other node to be connected
              types: [""] //only types of noodles mentioned here can be connected
            }
          ]
        }
      }
    }
  }
];

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext2d();
    this.mouse = { x: 0, y: 0 };
    this.renderElems = [];
    this.dragStartPos = { x: 0, y: 0 };
    this.mouseDown = false;
    this.touch = false;
    this.dragRequest = false;

    //this will be set to false by nodes when there are interactions with nodes, we can find wether the touch to be handled by the canvas or node
    this.noNodeActions = true;

    //Listning to mouse moves
    window.addEventListener("mousemove", event => {
      this.mouse = { x: event.x, y: event.y };

      //Setting wether the viewport is movable, if we have selected on a node (if noNodeActions === true), have to move the viewport
      for (let i = 0; i < this.renderElems.length; i++) {
        let res = this.renderElems[i].getCanSelect();
        if (res) {
          this.setNoNodeActions(false);
          return;
        }
      }
      this.setNoNodeActions(true);
    });

    window.addEventListener("mousedown", e => {
      if (e.button === 0) {
        this.mouseDown = true;
      } else if (e.button === 1) {
        this.mouse = { x: e.pageX, y: e.pageY };
        this.dragStartPos = this.mouse;
        this.dragRequest = true;
        this.checkForNoNodeActions();
        this.movingViewportMouse();
      }
    });

    window.addEventListener("mouseup", e => {
      if (e.button === 0) {
        this.mouseDown = true;
      } else if (e.button === 1) {
        this.dragRequest = false;
      }
    });

    //Listning to mouse wheel to zoom in/out
    window.addEventListener("mousewheel", event => {
      if (event.deltaY >= 0) {
        this.canvas.setZoom(this.canvas.state.scaleSpeed.up);
      } else {
        this.canvas.setZoom(this.canvas.state.scaleSpeed.down);
      }
    });

    window.addEventListener("touchstart", e => {
      this.mouse = { x: e.touches[0].pageX, y: e.touches[0].pageY };
      this.mouseDown = true;
      this.dragStartPos = this.mouse;

      this.checkForNoNodeActions();
    });

    window.addEventListener("touchmove", e => {
      this.mouse = { x: e.touches[0].pageX, y: e.touches[0].pageY };

      this.movingViewport();
    });

    window.addEventListener("touchend", e => {
      this.mouseDown = false;
    });
  }

  /**
   * Get position of the mouse
   * @returns {Object} object with mouse pos {x, y}
   */
  getMousePos = () => {
    return this.mouse;
  };

  /**
   * Moving the viewport
   */
  movingViewport = () => {
    //Setting wether the viewport is movable, if we haven't selected a node (if noNodeActions === true), have to move the viewport
    if (this.noNodeActions) {
      //move the viewport
      let { x, y } = this.canvas.getViewportPos();
      this.canvas.setViewportPos({
        x: x + (this.mouse.x - this.dragStartPos.x) * 0.029,
        y: y + (this.mouse.y - this.dragStartPos.y) * 0.029
      });
    }
  };

  movingViewportMouse = () => {
    if (this.dragRequest) {
      requestAnimationFrame(this.movingViewportMouse);
      this.movingViewport();
    }
  };

  checkForNoNodeActions = () => {
    for (let i = 0; i < this.renderElems.length; i++) {
      this.renderElems[i].isNodeSelectable({
        mouseX: this.mouse.x,
        mouseY: this.mouse.y
      });
      let res = this.renderElems[i].getCanSelect();
      if (res) {
        this.setNoNodeActions(false);
        return;
      }
    }
    this.setNoNodeActions(true);
  };

  /**
   * Setting no node actions
   */
  setNoNodeActions = bool => {
    this.noNodeActions = bool;
  };

  /**
   * Canvas configurations (made to run before render function but only once)
   */
  configCanvas = () => {
    dummyData.forEach(ele => {
      if (ele.type === "node") {
        this.renderElems.push(
          new Node(this.canvas, ele._id, ele.position, ele.data)
        );
      }
    });
  };

  /**
   * Element renderer
   */
  render = () => {
    this.renderElems.forEach(ele => {
      ele.render({
        x: ele.position.x + this.canvas.getViewportPos().x,
        y: ele.position.y + this.canvas.getViewportPos().y
      });
    });
  };

  /**
   * Animator - runs 60 times per second
   */
  animate = () => {
    requestAnimationFrame(this.animate);
    this.canvas.clearCanvas();
    this.render();
  };
}

export default Renderer;
