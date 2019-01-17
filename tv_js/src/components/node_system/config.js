export const DEFAULT_BODY_COLOR = "#26A69A";
export const DEFAULT_STROKE_COLOR = "#009688";
export const DEFAULT_HEADER_COLOR = "#009688";
export const DEFAULT_BODY_FONT_COLOR = "#ffffff";
export const DEFAULT_HEADER_FONT_COLOR = "#ffffff";

export const DEFAULT_HEADER_HEIGHT = 50;
export const DEFAULT_NODE_WIDTH = 250;
export const DEFAULT_NODE_HEIGHT = 150;
export const DEFAULT_NODE_XRADIUS = 10;
export const DEFAULT_NODE_YRADIUS = 10;
export const DEFAULT_STROKE_WIDTH = 5;

//Socket default config
export const DEFAULT_NODE_SOCKET_RADIUS = 10;
export const DEFAULT_NODE_SOCKET_TEXT_PADDING = 5;

export const DEFAULT_NODE_SOCKET_COLOR = "#ff00ff";
export const DEFAULT_NODE_SOCKET_STROKE_COLOR = "#000000";

//zooming config
export const ZOOM_STEP_SIZE = 100;
export const ZOOM_STEPS_MAX = { up: 10, down: 10 };

export const INITIAL_NODE = {
  _id: "abc001",
  title: "Title 01",
  config: {
    dimensions: {}
  },
  header: {
    sockets: {
      in: [],
      out: []
    }
  },
  body: {
    sockets: {
      in: [],
      out: []
    },
    content: [
      {
        type: "text",
        data: "This is a content text"
      },
      {
        type: "text",
        data: "This is a content text2"
      }
    ]
  }
};

export const INITIAL_SOCKET = {
  id: "sock_01",
  type: "in", //in or out
  text: "Sock 01", //name of the socket
  category: "", //category of the node
  color: {}, //color fill and stroke
  connect: [] //categoris that can be connected to
};
