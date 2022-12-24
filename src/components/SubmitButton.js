import React, { Component } from "react";
import "../styles/App.css";

class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="submit-section">
        <button onClick={this.props.handleSubmit}>{this.props.label}</button>
      </div>
    );
  }
}

export default SubmitButton;
