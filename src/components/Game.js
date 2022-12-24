import React, { Component } from "react";
import Question from "./Question";
import SubmitButton from "./SubmitButton";
import getRandomInt from "../functions/getRandomInt";
import "../styles/App.css";
import { cloneDeep, get, isUndefined } from "lodash";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answers: [],
      correctAnswer: null,
      questionIndex: 0,
      score: 0,
      showResults: false,
      showQuestion: false,
    };
  }

  setQuestion = (question) => {
    let correctAnswer = question.correct_answer;
    let answers;
    if (question.type === "boolean") {
      answers = ["True", "False"];
    } else {
      answers = cloneDeep(question.incorrect_answers);
      let answerIndex = getRandomInt(answers.length + 1);
      answers.splice(answerIndex, 0, correctAnswer);
    }
    this.setState({ question: question });
    this.setState({ answers: answers });
    this.setState({ correctAnswer: correctAnswer });
  };

  resetState = () => {
    this.setState({
      question: null,
      answers: [],
      correctAnswer: null,
      questionIndex: 0,
      score: 0,
      showResults: false,
      showQuestion: false,
    });
  };

  handleContinue = (answeredCorrectly) => {
    if (answeredCorrectly) {
      let score = this.state.score + 1;
      this.setState({ score: score });
    }
    let newIndex = this.state.questionIndex + 1;
    if (!isUndefined(this.props.questions[newIndex])) {
      this.setQuestion(this.props.questions[newIndex]);
      this.setState({ questionIndex: newIndex });
    } else {
      this.setState({ showResults: true });
      this.setState({ showQuestion: false });
    }
  };

  handleRestart = () => {
    this.resetState();
    this.props.allDone();
  };

  componentDidMount() {
    this.setQuestion(this.props.questions[0]);
    this.setState({ showQuestion: true });
  }

  render() {
    return (
      <div id="game" className="game-container">
        {this.state.showQuestion && (
          <div>
            <h3>
              {this.props.content.questionTitle}
              {this.state.questionIndex + 1}
            </h3>
            <Question
              content={this.props.content.question}
              question={this.state.question}
              answers={this.state.answers}
              correctAnswer={this.state.correctAnswer}
              handleContinue={this.handleContinue}
              showTimer={this.props.setTimer}
            />
          </div>
        )}
        {this.state.showResults && (
          <div className="game-results-container">
            <p>
              {this.props.content.results.prefix}
              {this.state.score}/{this.props.questions.length}
              {this.props.content.results.suffix}
            </p>
            <SubmitButton
              label={this.props.content.restart}
              handleSubmit={this.handleRestart}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Game;
