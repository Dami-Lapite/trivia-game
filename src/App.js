// Import React
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// Import Components
import QuestionsForm from './components/QuestionsForm';
import Question from './components/Question';
// Import Functions
import getURL from './functions/getURL';
import decodeHtmlEntities from './functions/decodeHtmlEntities';
import getRandomInt from './functions/getRandomInt';
import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state  = {
      error: null,
      isLoaded: false,
      categoryList: [],
      questions: [],
      hasQuestions: false,
      questionIndex: 0,
      teams: [],
      teamIndex: 0,
      showScores: false,
      gameOver: false,
      noQuestions: false,
    }
  }

  async fetchQuestions(url) {
    let response = await fetch(url);
    if (response.status === 200) {
        let data = await response.json();
        return data;
    }else{
      return "Error";
    }
  }

  getWinner = ()=>{
    let maxScore = Math.max.apply(Math, this.state.teams.map(function(o) { return o.score; }));
    let winners = "";
    for (const team of this.state.teams) {
      if(team.score === maxScore){
        winners += team.name + " ,";
      }
    }
    winners = winners.substring(0, winners.length - 1);
    return winners;
  }

  isLastQuestion = ()=>{
    if((this.state.questionIndex + 1) === this.state.questions.length){
      return({"bool":true, "winner":this.getWinner()})
    }
    return ({"bool":false,"winner":null});
  }

  setScoresCallBackFunction = (score)=>{
    let tempArr = this.state.teams;
    tempArr[this.state.teamIndex].score = score;
    this.setState({showScores: true, teams:tempArr});
  }

  newGame = ()=>{
    this.setState({hasQuestions: false, questionIndex: 0, questions:[], showScores: false, gameOver: false, noQuestions: false
    ,teams: [], teamIndex:0});
  }

  setAnswers = (questionData)=>{
    let allAnswers = [];
    for (const incorrect_answer of questionData.incorrect_answers) {
        allAnswers.push(decodeHtmlEntities(incorrect_answer));
    }
    let randomIndex = getRandomInt(allAnswers.length);
    allAnswers.splice(randomIndex , 0, decodeHtmlEntities(questionData.correct_answer));
    return allAnswers;
  }

  nextCallBackFunction = ()=>{
    let index = this.state.teamIndex;
    if(index === (this.state.teams.length - 1)){
      this.setState({teamIndex: 0});
    }else{
      if(this.state.teams.length > 1){
        this.setState({teamIndex: index+1});
      }
    }
    let newIndex = this.state.questionIndex + 1;
    if(newIndex < this.state.questions.length){
      this.setState({questionIndex: newIndex, showScores: false});
    }else{
      this.setState({gameOver: true, showScores: false});
    }
  }

  formCallBackFunction = (options) =>{
    let tempArr = [];
    for (let i = 0; i < options.numOfTeams; i++) {
      tempArr.push({"name":i+1, "score":0});
    }
    this.setState({teams: tempArr});
    let url = getURL(options)
    this.fetchQuestions(url)
      .then(data =>{
        this.setState({
          questions: data.results,
        });
        if (data.results.length > 0){
          this.setState({
            hasQuestions: true,
          })
        }else{
          this.setState({
            noQuestions: true,
          })
        }
      })

  }

  componentDidMount(){
    fetch("./options.json")
      .then(res => res.json())
      .then( json => {
          this.setState({
            isLoaded: true,
            categoryList: json.categories,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render (){
    return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="headerContainer"><h2>little-trivia-game</h2></div>
          {this.state.noQuestions ? (
            <div className="gameTextContainer">
              <p className="gameText">Not enough questions available for that parameter combination.
                Try changing the number of questions, question type or difficulty.</p>
              <Button type="button" className="button" onClick={this.newGame}>New Game</Button>
            </div>
          ):(<div>
            {!this.state.hasQuestions ? (
            <QuestionsForm categories={this.state.categoryList} parentCallBack={this.formCallBackFunction} />
          ):(
            <div>
            {this.state.gameOver ?
            <div className="gameTextContainer">
              <h3>Team(s) {this.getWinner()} answered the most questions correctly !</h3>
              <div className="scoreContainer">{this.state.teams.map((team,i) => 
              <div className="team" key={i}><p>Team {team.name} : {team.score}</p></div>)}</div>
              <Button type="button" className="button" onClick={this.newGame}>New Game</Button>
            </div>
            :<div>
              <Question questionData={this.state.questions[this.state.questionIndex]} parentCallBack={this.nextCallBackFunction} 
              answers={this.setAnswers(this.state.questions[this.state.questionIndex])} setShow={this.setScoresCallBackFunction}
              team={this.state.teams[this.state.teamIndex]}/>
              {this.state.showScores && <div className="scoreContainer">
                {this.state.teams.map((team,i) => 
                <div className="team" key={i}><p>Team {team.name} : {team.score}</p></div>)}
              </div>}
              </div>}
            </div>
          )}
          </div>)}
        </div>
      </div>
      <div className="footer">
          <p className="footerText">
          <span><a className="fab fa-github"
          style={{display: "table-cell"}} href="https://github.com/Dami-Lapite/trivia-game" rel="noreferrer" target="_blank">&emsp;</a></span>&emsp;
          <span><a className="fas fa-external-link-alt"
          style={{display: "table-cell"}} href="https://www.damilapite.com/" rel="noreferrer" target="_blank">&emsp;</a></span>
          &emsp;Designed and Developed by Dami Lapite - 2021</p>
        </div>
    </div>
    );
  }
}

export default App;
