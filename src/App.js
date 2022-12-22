// Import React
import React, { Component } from "react";
import TriviaGame from "./components/TriviaGame";
import "./styles/App.css";
import icons8 from "./assets/images/icons8-icons8-50.png";
import github from "./assets/images/icons8-github-64.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      content: null,
    };
  }

  componentDidMount() {
    // Fetch content json from public/content.json
    fetch("./content.json")
      .then((res) => res.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            content: json,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    return (
      <div id="App" className="App">
        <div className="header">
          <h1>TRIVIA GAME</h1>
        </div>
        {this.state.content !== null && this.state.isLoaded ? (
          <TriviaGame content={this.state.content} />
        ) : (
          <div className="error">
            <p>Sorry, there's an issue loading content for this page :(</p>
          </div>
        )}
        <div className="footer">
          <a
            className="text-link"
            target="_blank"
            rel="noreferrer"
            href="https://opentdb.com/api_config.php"
          >
            Open Trivia API
          </a>
          <a target="_blank" rel="noreferrer" href="https://icons8.com">
            <img src={icons8} alt="icons8 logo" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Dami-Lapite/trivia-game"
          >
            <img src={github} alt="github logo" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
