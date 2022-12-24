import React, { Component } from "react";
import NumericInput from "./NumericInput";
import DropDown from "./DropDown";
import SubmitButton from "./SubmitButton";
import ChoiceSelect from "./ChoiceSelect";
import OptionCheckbox from "./OptionCheckbox";
import info from "../assets/images/icons8-info-24.png";
import { isEmpty } from "lodash";
import "../styles/App.css";

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfQuestions: "1",
      category: "0",
      difficulty: "0",
      questionType: "0",
      timerSelect: false,
      error: false,
      fetchError: false,
    };
  }

  async fetchQuestions(url) {
    let response = await fetch(url);
    if (response.status === 200) {
      let data = await response.json();
      return data;
    } else {
      return "Error";
    }
  }

  createURL = () => {
    let url = `https://opentdb.com/api.php?`;
    url += `amount=` + this.state.numOfQuestions;
    if (this.state.category !== "0") {
      url += `&category=` + this.state.category;
    }
    if (this.state.difficulty !== "0") {
      url += `&difficulty=` + this.state.difficulty;
    }
    if (this.state.questionType !== "0") {
      url += `&type=` + this.state.questionType;
    }
    return url;
  };

  handleSubmit = () => {
    let queryURL = this.createURL();
    this.fetchQuestions(queryURL)
      .then((data) => {
        if (data.response_code === 0 && !isEmpty(data.results)) {
          this.props.returnQuestions(data.results, this.state.timerSelect);
        } else {
          this.setState({
            error: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          fetchError: true,
        });
        console.log(error);
      });
    // Fail Example: https://opentdb.com/api.php?amount=1&category=32&difficulty=hard&type=boolean
  };

  setFormField = (fieldId, value) => {
    this.setState({ [fieldId]: value });
  };

  render() {
    return (
      <div id="game-form" className="game-form-container">
        <div className="form-section">
          <NumericInput
            content={this.props.content.numOfQuestions}
            fieldId="numOfQuestions"
            maxlength="2"
            min="1"
            max="50"
            setFieldValue={this.setFormField}
          />
        </div>
        <div className="form-section">
          <DropDown
            content={this.props.content.category}
            fieldId="category"
            setFieldValue={this.setFormField}
          />
        </div>
        <div className="form-section">
          <ChoiceSelect
            content={this.props.content.difficulty}
            fieldId="difficulty"
            default="3"
            setFieldValue={this.setFormField}
          />
        </div>
        <div className="form-section">
          <ChoiceSelect
            content={this.props.content.questionType}
            fieldId="questionType"
            default="2"
            setFieldValue={this.setFormField}
          />
        </div>
        <div className="form-section">
          <OptionCheckbox
            content={this.props.content.timer}
            fieldId="timerSelect"
            setFieldValue={this.setFormField}
          />
        </div>
        <div className="disclaimer">
          <img src={info} alt="info icon" />
          <p>{this.props.content.disclaimer}</p>
          {this.state.error && (
            <p className="error">
              <br />
              {this.props.content.invalidCombination}
            </p>
          )}
          {this.state.fetchError && (
            <p className="error">
              <br />
              {this.props.content.fetchError}
            </p>
          )}
        </div>
        <SubmitButton
          label={this.props.content.submitLabel}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default GameForm;
