import React, { Component } from "react";
import "../styles/App.css";

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = ($event) => {
    this.props.setFieldValue(this.props.fieldId, $event.target.value);
  };

  render() {
    return (
      <div className="dropdown-container">
        <label htmlFor={this.props.fieldId}>{this.props.content.label}</label>
        <select
          name="dropdown-select"
          id={this.props.fieldId}
          onChange={this.handleChange}
        >
          {this.props.content.options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default DropDown;
