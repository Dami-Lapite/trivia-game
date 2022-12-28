import React, { Component } from "react";
import "../styles/App.css";

class ChoiceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
    };
  }

  handleClick = (index, value) => {
    this.selectOption(index);
    this.props.setFieldValue(this.props.fieldId, value);
  };

  selectOption = (option) => {
    let $selectedOption = document.getElementById(
      this.props.fieldId + "-" + option
    );
    if (this.state.selectedIndex === null) {
      $selectedOption.classList.add("selected");
    } else {
      let $previousSelectedOption = document.getElementById(
        this.props.fieldId + "-" + this.state.selectedIndex
      );
      $previousSelectedOption.classList.remove("selected");
      $selectedOption.classList.add("selected");
    }
    this.setState({ selectedIndex: option });
  };

  componentDidMount() {
    this.selectOption(this.props.default);
  }

  render() {
    return (
      <div className="choice-select-container">
        <label htmlFor={this.props.fieldId}>{this.props.content.label}</label>
        <div className="choice-select" id={this.props.fieldId}>
          {this.props.content.options.map((item, index) => (
            <div
              className="choice"
              id={this.props.fieldId + "-" + index}
              key={item.value}
              value={item.value}
              onClick={() => this.handleClick(index, item.value)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ChoiceSelect;
