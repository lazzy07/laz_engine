import Node from "./Node";

let dummyData = [
  {
    _id: "lol1",
    type: "node",
    position: { x: 10, y: 20 },
    config: {
      headNoodle: true,
      noodels: true
    },
    data: {
      header: {
        text: "Match 01",
        noodle: null
      },
      body: [
        {
          text: "Team 01 vs Team 02",
          noodle: null
        }
      ]
    }
  },
  {
    _id: "lol1",
    type: "node",
    position: { x: 280, y: 100 },
    config: {
      headNoodle: true,
      noodels: true
    },
    data: {
      header: {
        text: "Match 01",
        noodle: null
      },
      body: [
        {
          text: "Team 01 vs Team 02",
          noodle: null
        }
      ]
    }
  }
];

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext2d();
    this.mouse = { x: 0, y: 0 };
    this.renderElems = [];

    //Listning to mouse moves
    window.addEventListener("mousemove", event => {
      this.mouse = { x: event.x, y: event.y };
    });

    //Listning to mouse wheel to zoom in/out
    window.addEventListener("mousewheel", event => {
      if (event.deltaY >= 0) {
        this.canvas.setZoom(this.canvas.state.scaleSpeed.up);
        this.render();
      } else {
        this.canvas.setZoom(this.canvas.state.scaleSpeed.down);
      }
    });

    window.addEventListener("touchstart", e => {
      console.log(e);
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
   * Canvas configurations (made to run before render function but only once)
   */
  configCanvas = () => {
    dummyData.forEach(ele => {
      if (ele.type === "node") {
        this.renderElems.push(new Node(this.canvas, ele._id, ele.position));
      }
    });
  };

  /**
   * Element renderer
   */
  render = () => {
    this.renderElems.forEach(ele => {
      ele.render({ x: this.mouse.x, y: this.mouse.y });
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
