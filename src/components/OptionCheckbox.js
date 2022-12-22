import React, { Component } from "react";
import "../styles/App.css";

class OptionCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = ($event) => {
    this.props.setFieldValue(this.props.fieldId, $event.target.checked);
  };

  render() {
    return (
      <div className="option-checkbox-container">
        <label htmlFor={this.props.fieldId}>{this.props.content.label}</label>
        <input
          type="checkbox"
          id={this.props.fieldId}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default OptionCheckbox;
