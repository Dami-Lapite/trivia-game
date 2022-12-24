import React, { Component } from "react";
import GameForm from "./GameForm";
import Game from "./Game";
import "../styles/App.css";
import { isEmpty } from "lodash";

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
    this.setState({ showForm: false });
  };

  restart = () => {
    this.setState({
      showForm: true,
      questions: [],
      setTimer: false,
    });
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
        {!isEmpty(this.state.questions) && (
          <Game
            content={this.props.content.game}
            questions={this.state.questions}
            setTimer={this.state.setTimer}
            allDone={this.restart}
          />
        )}
      </div>
    );
  }
}

export default TriviaGame;
