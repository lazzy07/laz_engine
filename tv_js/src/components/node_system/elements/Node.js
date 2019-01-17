import React, { Component } from "react";
import PropTypes from "prop-types";

class Node extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerDimensions: { height: null, width: null },
      contentDimensions: [],
      inputDimensions: { height: null, width: null },
      titleDimensions: { height: null, width: null },
      outputDimensions: { height: null, width: null }
    };

    this.titleRef = null;
    this.refs = [];
    this.headerInSocketRefs = [];
    this.headerOutSocketRefs = [];
  }

  /**
   * Render title of the node also calculating dimensions of those elements
   * @param {Object} position position data of the node
   * @param {Object} dimensions dimensions of the node
   * @param {Object} colors colors of the node
   * @param {Object} text text data
   * @returns {JSX} jsx object of the title text (SVG)
   */
  renderTitle = (position, dimensions, colors, text) => {
    let title = (
      <text
        ref={title => (this.titleRef = title)}
        onClick={e => this.onClickHeader(e)}
        onMouseDown={e => this.onMouseDownNode(e)}
        alignmentBaseline="central"
        textAnchor="middle"
        style={{
          fontFamily: "arial",
          fontSize: "16px",
          pointerEvents: "none",
          userSelect: "none"
        }}
        x={position.x + dimensions.width / 2}
        y={position.y + dimensions.headerHeight / 2}
        fill={colors.headerTitleColor || colors.textColor}
      >
        {text.title}
      </text>
    );

    if (this.titleRef) {
      let dimensions = this.titleRef.getBBox();
      if (dimensions) {
        if (
          dimensions.height !== this.state.titleDimensions.height &&
          dimensions.width !== this.state.titleDimensions.width
        ) {
          this.setState({
            titleDimensions: dimensions
          });
        }
      }
    }
    return title;
  };

  /**
   * Render content data and also calculate dimensions of content
   * @param {Object} position position data of the node
   * @param {Object} dimensions dimensions of the node
   * @param {Object} colors colors of the node
   * @param {Array} content content array with the type of objects like {type, data}
   * @returns {Array} array of text jsx SVG elements properly positioned
   */
  renderContent = (position, dimensions, colors, content) => {
    let padding = dimensions.socketTextPadding;
    let contentStartPosition = position.y + dimensions.headerHeight + padding;
    let renderedContent = null;

    if (this.refs) {
      if (this.refs.length !== this.state.contentDimensions) {
        let contentDimensions = [];
        for (let i = 0; i < this.refs.length; i++) {
          let posY = 0;
          let curEle = { ...this.refs[i] };
          i === 0
            ? (posY = contentStartPosition)
            : (posY =
                this.refs[i - 1].getBBox().y +
                this.refs[i - 1].getBBox().height +
                padding);
          curEle.y = posY;
          contentDimensions.push(curEle);
        }
        if (this.state.contentDimensions.length !== contentDimensions.length) {
          this.setState({
            contentDimensions
          });
        }
      }
    }

    if (content) {
      this.refs = [];
      renderedContent = content.map((ele, index) => {
        if (ele.type === "text") {
          return (
            <text
              key={index}
              ref={cont => {
                if (cont) this.refs.push(cont);
              }}
              alignmentBaseline="before-edge"
              textAnchor="middle"
              style={{
                fontFamily: "arial",
                fontSize: "12px",
                pointerEvents: "none",
                userSelect: "none"
              }}
              x={position.x + dimensions.width / 2}
              y={
                this.state.contentDimensions[index]
                  ? this.state.contentDimensions[index].y
                  : contentStartPosition
              }
              fill={colors.textColor}
            >
              {ele.data}
            </text>
          );
        }
        return null;
      });

      // console.log(this.refs);
    }

    return renderedContent;
  };

  renderSockets = (position, dimensions, colors, sockets) => {};

  renderHeaderSockets = ({ position, dimensions, colors, headerSockets }) => {
    if (headerSockets) {
      let a = headerSockets.in.map((ele, index) => {
        return (
          <circle
            key={"header_in" + index}
            ref={cir => {
              if (cir) this.headerInSocketRefs.push(cir);
            }}
            r={dimensions.socketRadius}
            cx={position.x}
            cy={position.y + dimensions.headerHeight / 2}
            fill={ele.color.fill || colors.headerSocketFill}
            stroke={ele.color.stroke || colors.headerSocketStroke}
            strokeWidth={dimensions.socketStrokeWidth}
          />
        );
      });

      let b = headerSockets.out.map((ele, index) => {
        return (
          <circle
            key={"header_out" + index}
            ref={cir => {
              if (cir) this.headerOutSocketRefs.push(cir);
            }}
            r={dimensions.socketRadius}
            cx={position.x + dimensions.width}
            cy={position.y + dimensions.headerHeight / 2}
            fill={ele.color.fill || colors.headerSocketFill}
            stroke={ele.color.stroke || colors.headerSocketStroke}
            strokeWidth={dimensions.socketStrokeWidth}
          />
        );
      });

      return [...a, ...b];
    }
  };

  /**
   * When the header bar clicked, this function get fired
   */
  onClickHeader = e => {
    if (this.props.onClickHeader) {
      this.props.onClickHeader(this.props._id);
    }
  };

  /**
   * Clicking on the node handler
   * @param {Object} e default event
   */
  onClickNode = e => {
    if (this.props.onClickNode) {
      this.props.onClickNode(e);
    }
  };

  /**
   * Mouse pressed on the node handler
   * @param {Object} e default event
   */
  onMouseDownNode = e => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }
  };

  /**
   * When mouse is released fire this function
   * @param {Object} e default event
   */
  onMouseUpNode = e => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  };

  componentDidMount() {
    window.addEventListener("mouseup", e => {
      this.onMouseUpNode(e);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", e => {
      this.onMouseDownNode(e);
    });
  }

  render() {
    const {
      position,
      dimensions,
      colors,
      text,
      content,
      headerSockets
    } = this.props;

    return (
      <svg>
        {/* Body Rectangle */}
        <rect
          onClick={e => this.onClickNode(e)}
          x={position.x}
          y={position.y}
          width={dimensions.width}
          height={dimensions.height}
          rx={dimensions.xRadius}
          ry={dimensions.yRadius}
          style={{
            fill: colors.bodyColor,
            stroke: colors.stroke,
            strokeWidth: dimensions.strokeWidth
          }}
        />
        {/* Header Rectangle */}
        <rect
          onMouseDown={e => this.onMouseDownNode(e)}
          draggable="true"
          onClick={e => this.onClickHeader(e)}
          x={position.x}
          y={position.y}
          rx={dimensions.xRadius}
          ry={dimensions.yRadius}
          width={dimensions.width}
          height={dimensions.headerHeight}
          style={{
            fill: colors.headerColor,
            stroke: colors.stroke,
            strokeWidth: dimensions.strokeWidth
          }}
        />
        {/* Header Text */}
        {this.renderTitle(position, dimensions, colors, text)}
        {/* Header input/output sockets */}
        {/* Header input socket */}
        {this.renderHeaderSockets({
          position,
          dimensions,
          colors,
          headerSockets
        })}

        {this.renderContent(position, dimensions, colors, content)}
      </svg>
    );
  }
}

Node.propTypes = {
  position: PropTypes.object.isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    xRadius: PropTypes.number,
    yradius: PropTypes.number,
    socketRadius: PropTypes.number,
    socketTextPadding: PropTypes.number,
    socketStrokeWidth: PropTypes.number,
    socketTitleWidth: PropTypes.number,
    contentWidth: PropTypes.number
  }),
  onClickHeader: PropTypes.func,
  onClickNode: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  text: PropTypes.object,
  colors: PropTypes.shape({
    headerTitleColor: PropTypes.string,
    textColor: PropTypes.string.isRequired,
    stroke: PropTypes.string,
    socketFill: PropTypes.string,
    headerSocketFill: PropTypes.string,
    headerSocketStroke: PropTypes.string,
    socketStroke: PropTypes.string,
    bodyColor: PropTypes.string,
    headerColor: PropTypes.string
  }).isRequired
};

export { Node };
