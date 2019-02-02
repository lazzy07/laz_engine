import React, { Component } from "react";

export default class Paginations extends Component {
  renderPaginations = (elems, activeId) => {
    if (elems) {
      return elems.map((ele, index) => {
        return (
          <li
            key={index}
            className={
              ele === activeId ? "waves-effect active" : "waves-effect"
            }
          >
            {/* eslint-disable-next-line */}
            <a onClick={() => this.props.onClick(ele)}>{ele}</a>
          </li>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <ul className="pagination">
          <li className={this.props.leftDisabled ? "disabled" : ""}>
            {/* eslint-disable-next-line */}
            {this.props.left ? <a onClick={this.props.onLeftPaginationClick} style={{ fontWeight: "bolder" }}>{"<"}</a> : <div/>}
          </li>
          {this.renderPaginations(this.props.elems, this.props.active)}
          <li className={this.props.rightDisabled ? "disabled" : ""}>
            {/* eslint-disable-next-line */}
            {this.props.right ? <a onClick={this.props.onRightPaginationClick} style={{ fontWeight: "bolder" }}>{">"}</a> : <div/>}
          </li>
        </ul>
      </div>
    );
  }
}
