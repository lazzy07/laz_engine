import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  DEFAULT_BODY_COLOR,
  DEFAULT_HEADER_COLOR,
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_NODE_XRADIUS,
  DEFAULT_NODE_YRADIUS,
  DEFAULT_HEADER_FONT_COLOR,
  DEFAULT_BODY_FONT_COLOR,
  DEFAULT_NODE_SOCKET_TEXT_PADDING,
  DEFAULT_NODE_SOCKET_RADIUS,
  DEFAULT_NODE_SOCKET_COLOR
} from "./config";
import { Node } from "./elements/Node";

let dummyNodes = {
  _id: "abc001",
  title: "Title 01",
  config: {
    dimensions: {}
  },
  header: {
    sockets: {
      in: [
        {
          id: "sock_01",
          type: "in", //in or out
          text: "Sock 01", //name of the socket
          category: "", //category of the node
          color: {}, //color fill and stroke
          connect: [] //categoris that can be connected to
        }
      ],
      out: [
        {
          id: "sock_01",
          type: "in", //in or out
          text: "Sock 01", //name of the socket
          category: "", //category of the node
          color: {}, //color fill and stroke
          connect: [] //categoris that can be connected to
        }
      ]
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

class NodeSystem extends Component {
  render() {
    return (
      <div>
        <svg
          height={this.props.height || window.screen.height}
          width={this.props.width || window.screen.width}
        >
          <Node
            position={{ x: 10, y: 10 }}
            text={{ title: "Node 01" }}
            content={dummyNodes.body.content}
            headerSockets={dummyNodes.header.sockets}
            dimensions={{
              width: DEFAULT_NODE_WIDTH,
              height: DEFAULT_NODE_HEIGHT,
              headerHeight: 50,
              xRadius: DEFAULT_NODE_XRADIUS,
              yRadius: DEFAULT_NODE_YRADIUS,
              socketTextPadding: DEFAULT_NODE_SOCKET_TEXT_PADDING,
              socketRadius: DEFAULT_NODE_SOCKET_RADIUS
            }}
            colors={{
              bodyColor: DEFAULT_BODY_COLOR,
              headerColor: DEFAULT_HEADER_COLOR,
              headerTitleColor: DEFAULT_HEADER_FONT_COLOR,
              textColor: DEFAULT_BODY_FONT_COLOR,
              headerSocketFill: DEFAULT_NODE_SOCKET_COLOR
            }}
            zoom={500}
          />
        </svg>
      </div>
    );
  }
}

NodeSystem.protoTypes = {
  height: PropTypes.string,
  width: PropTypes.string
};

export default NodeSystem;
