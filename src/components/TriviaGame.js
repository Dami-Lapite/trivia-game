import React, { Component } from "react";
import GameForm from "./GameForm";
import "../styles/App.css";

class TriviaGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      questions: [],
      setTimer: false,
    };
  }

  setQuestions = (questions, setTimer) => {
    this.setState({ questions: questions });
    this.setState({ setTimer: setTimer });
  };

  render() {
    return (
      <div id="trivia-game" className="trivia-game">
        {this.state.showForm && (
          <GameForm
            content={this.props.content.gameForm}
            returnQuestions={this.setQuestions}
          />
        )}
      </div>
    );
  }
}

export default TriviaGame;
