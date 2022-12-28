import React, { Component } from "react";
import "../styles/App.css";
class NumericInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  roundValue = (number) => {
    let numberValue = Number(number);
    if (numberValue > this.props.max) {
      return this.props.max;
    } else if (numberValue < this.props.min) {
      return this.props.min;
    } else {
      return numberValue;
    }
  };

  handleFocusOut = ($event) => {
    let fieldValue = this.roundValue($event.target.value.trim());
    document.getElementById(this.props.fieldId).value = fieldValue;
    this.props.setFieldValue(this.props.fieldId, String(fieldValue));
  };

  handleChange = ($event) => {
    let fieldValue = this.roundValue($event.target.value.trim());
    this.props.setFieldValue(this.props.fieldId, String(fieldValue));
  };

  validateInput = () => {
    let $InputBox = document.getElementById(this.props.fieldId);
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "drop",
      "paste",
    ].forEach(function (event) {
      $InputBox.addEventListener(event, function ($event) {
        let inputValue;
        if ($event.type === "paste") {
          inputValue = Number(
            ($event.clipboardData || window.clipboardData).getData("text")
          );
        } else {
          inputValue = Number($event.target.value);
        }
        if (Number.isInteger(inputValue)) {
          // Store accepted integer value
          this.storedValue = this.value;
        } else if (this.hasOwnProperty("storedValue")) {
          // Reset to stored value
          this.value = this.storedValue;
        } else {
          // If there's no stored value, empty field
          this.value = "";
        }
      });
    });
  };

  componentDidMount() {
    this.validateInput();
  }

  render() {
    return (
      <div className="numeric-input-container">
        <label htmlFor={this.props.fieldId}>{this.props.content.label}</label>
        <input
          type="text"
          autoComplete="off"
          name="numeric-input"
          id={this.props.fieldId}
          defaultValue={this.props.min}
          maxLength={this.props.maxlength}
          onChange={this.handleChange}
          onBlur={this.handleFocusOut}
        />
        {this.props.content.hint && (
          <p className="hint">{this.props.content.hint}</p>
        )}
      </div>
    );
  }
}

export default NumericInput;
