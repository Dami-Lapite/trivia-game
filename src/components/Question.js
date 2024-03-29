import React, { Component } from "react";
import AnswerSelect from "./AnswerSelect";
import SubmitButton from "./SubmitButton";
import "../styles/App.css";
import { toLower, cloneDeep } from "lodash";
import Timer from "./Timer";
import decodeHtmlEntities from "../functions/decodeHtmlEntities";

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: null,
      isAnswered: false,
      isAnswerCorrect: false,
    };
  }

  setAnswer = (answer) => {
    this.setState({ answer: answer });
  };

  timerCallBack = () => {
    if (this.state.answer === null) {
      this.setState({
        isAnswerCorrect: false,
      });
      this.setState({ isAnswered: true });
    } else {
      this.handleSubmit();
    }
  };

  resetState = () => {
    this.setState({
      answers: [],
      answer: null,
      correctAnswer: null,
      isAnswered: false,
      isAnswerCorrect: false,
    });
  };

  handleSubmit = () => {
    if (this.state.answer !== null) {
      let isAnswerCorrect;
      if (this.props.question.type === "boolean") {
        isAnswerCorrect =
          toLower(this.state.answer) === toLower(this.props.correctAnswer);
      } else {
        isAnswerCorrect = this.state.answer === this.props.correctAnswer;
      }
      this.setState({
        isAnswerCorrect: isAnswerCorrect,
      });
      this.setState({ isAnswered: true });
    }
  };

  handleContinue = () => {
    let isAnswerCorrect = cloneDeep(this.state.isAnswerCorrect);
    this.resetState();
    this.props.handleContinue(isAnswerCorrect);
  };

  render() {
    return (
      <div>
        {!this.state.isAnswered && (
          <div className="question-container">
            {this.props.showTimer && (
              <Timer parentCallBack={this.timerCallBack} />
            )}
            <p className="question-text">
              {decodeHtmlEntities(this.props.question.question)}
            </p>
            <AnswerSelect
              content={this.props.content}
              answers={this.props.answers}
              returnAnswer={this.setAnswer}
            />
            <SubmitButton
              label={this.props.content.submitLabel}
              handleSubmit={this.handleSubmit}
            />
          </div>
        )}
        {this.state.isAnswered && (
          <div className="question-result-container">
            {this.state.isAnswerCorrect ? (
              <div>
                <p>{this.props.content.correctAnswer}</p>
                <div className="correct-answer">
                  <p>{decodeHtmlEntities(this.state.answer)}</p>
                </div>
              </div>
            ) : (
              <div>
                {this.state.answer !== null ? (
                  <p>{this.props.content.incorrectAnswer}</p>
                ) : (
                  <p>{this.props.content.unAnswered}</p>
                )}
                <div className="correct-answer">
                  <p>{decodeHtmlEntities(this.props.correctAnswer)}</p>
                </div>
                {this.state.answer !== null && (
                  <div className="incorrect-answer">
                    <p>{decodeHtmlEntities(this.state.answer)}</p>
                  </div>
                )}
              </div>
            )}
            <SubmitButton
              label={this.props.content.continueLabel}
              handleSubmit={this.handleContinue}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Question;
