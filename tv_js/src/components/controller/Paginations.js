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
          <li className="disabled">
            {/* eslint-disable-next-line */}
            <a style={{ fontWeight: "bolder" }}>{"<"}</a>
          </li>
          {this.renderPaginations(this.props.elems, this.props.active)}
        </ul>
      </div>
    );
  }
}
