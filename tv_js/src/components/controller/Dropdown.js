import React from "react";

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  render() {
    return (
      <div className="input-field">
        <h5>{this.props.title}</h5>
        <select
          onChange={e => {
            this.props.onChange(e.target.value);
          }}
          value={this.props.value}
          className="browser-default"
        >
          {this.props.elems}
        </select>
      </div>
    );
  }
}
