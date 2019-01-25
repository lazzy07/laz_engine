import React, { Component } from "react";
import PropTypes from "prop-types";

export class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };
  }

  activeEle = index => {
    if (this.props.activeEle) {
      this.props.activeEle(index);
    }
    this.setState({
      active: index
    });
  };

  renderElements = data => {
    return data.map((ele, index) => {
      return (
        <span key={index}>
          {/* eslint-disable-next-line */}
          <a
            onClick={() => {
              this.activeEle(index);
            }}
            className={
              this.state.active === index
                ? "collection-item active"
                : "collection-item"
            }
          >
            {ele}
          </a>
        </span>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="collection">
          {this.props.data ? this.renderElements(this.props.data) : null}
        </div>
      </div>
    );
  }
}

Collection.propTypes = {
  activeEle: PropTypes.func,
  data: PropTypes.array.isRequired
};
