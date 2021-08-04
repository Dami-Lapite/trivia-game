import React, { Component } from 'react';
import QuestionsForm from './components/QuestionsForm';
import Question from './components/Question';
import Team from './components/Team';
import getURL from './functions/getURL';
import Button from 'react-bootstrap/Button';
import './App.css';

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
      score: 0,
      numOfTeams: 1,
      teams: [],
      addedScore: false,
      showScores: false,
      gameOver: false,
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
    console.log(maxScore);
    return winners;
  }

  isLastQuestion = ()=>{
    if((this.state.questionIndex + 1) === this.state.questions.length){
      return({"bool":true, "winner":this.getWinner()})
    }
    return ({"bool":false,"winner":null});
  }

  setScoresCallBackFunction = ()=>{
    this.setState({showScores: true});
  }

  addCallBackFunction = (teamName)=>{
    let tempTeam = this.state.teams.find(team => team.name === teamName);
    let tempTeamScore = tempTeam.score + 1;
    tempTeam.score = tempTeamScore;
    this.setState({addedScore:true});
  }

  newGame = ()=>{
    this.setState({hasQuestions: false, questionIndex: 0, questions:[], showScores: false, gameOver: false});
  }

  nextCallBackFunction = ()=>{
    let newIndex = this.state.questionIndex + 1;
    if(newIndex < this.state.questions.length){
      this.setState({questionIndex: newIndex, showScores: false});
    }else{
      this.setState({gameOver: true, showScores: false});
    }
  }

  formCallBackFunction = (options) =>{
    let tempArr = [];
    if(options.numOfTeams.value < 1){
      tempArr.push({"name":0, "score":0});
    }else{
      for (let i = 0; i < options.numOfTeams.value; i++) {
        tempArr.push({"name":i, "score":0});
      }
    }
    this.setState({teams: tempArr});
    let url = getURL(options)
    this.fetchQuestions(url)
      .then(data =>{
        this.setState({
          questions: data.results,
          hasQuestions: true,
        });
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
          <div className="headerContainer"><p className="header">a-lil-trivia-game</p></div>
          {!this.state.hasQuestions ? (
            <QuestionsForm categories={this.state.categoryList} parentCallBack={this.formCallBackFunction} />
          ):(
            <div>
            {this.state.gameOver ?
            <div className="gameTextContainer">
              <p className="gameText">Team(s) {this.getWinner()} answered the most questions correctly !</p>
              {this.state.teams.map((team) => <p key={team.name} className="teamText">Team {team.name} answered {team.score} questions correctly</p>)}
              <Button type="button" className="button" onClick={this.newGame}>New Game</Button>
            </div>
            :<div>
              <Question questionData={this.state.questions[this.state.questionIndex]} parentCallBack={this.nextCallBackFunction} qNum={this.state.questions.length} setShow={this.setScoresCallBackFunction}/>
            {this.state.showScores ? (
              <div>{this.state.teams.map((team) => (<Team key={team.name} teamData={team} parentCallBack={this.addCallBackFunction} />))}</div>
            ):null}
              </div>}
            </div>
          )}
        </div>
      </div>
      <div className="footer">
          <p class="footerText">
          <span><a class="fab fa-github" href="https://github.com/Dami-Lapite/trivia-game"></a></span>&emsp;
          <span><a class="fas fa-external-link-alt project-icon"
                                    href="https://www.damilapite.com/"></a></span>
          &emsp;Designed and Developed by Dami Lapite - 2021</p>
      </div>
    </div>
    );
  }
}

export default App;
