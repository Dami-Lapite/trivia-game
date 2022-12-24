import React, { Component } from "react";
import "../styles/App.css";

class AnswerSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
    };
  }

  selectAnswer = (answer, index) => {
    let $selectedAnswer = document.getElementById("answer-" + index);
    if (this.state.selectedIndex === null) {
      $selectedAnswer.classList.add("selected");
    } else {
      let $previousSelectedAnswer = document.getElementById(
        "answer-" + this.state.selectedIndex
      );
      $previousSelectedAnswer.classList.remove("selected");
      $selectedAnswer.classList.add("selected");
    }
    this.setState({ selectedIndex: index });
    this.props.returnAnswer(answer);
  };

  render() {
    return (
      <div className="answer-container">
        {this.props.answers.map((answer, index) => (
          <div
            key={index}
            id={"answer-" + index}
            className="answer"
            onClick={() => this.selectAnswer(answer, index)}
          >
            <p>{answer}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default AnswerSelect;
