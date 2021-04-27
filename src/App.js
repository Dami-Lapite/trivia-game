import React, { Component } from 'react';
import QuestionsForm from './components/QuestionsForm';
import Question from './components/Question';
import getURL from './functions/getURL';
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

  isLastQuestion = ()=>{
    return ((this.state.questionIndex + 1) === this.state.questions.length);
  }

  nextCallBackFunction = ()=>{
    let newIndex = this.state.questionIndex + 1;
    if(newIndex < this.state.questions.length){
      this.setState({questionIndex: newIndex});
    }else{
      this.setState({hasQuestions: false, questionIndex: 0, questions:[]})
    }
  }

  formCallBackFunction = (options) =>{
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
            <Question questionData={this.state.questions[this.state.questionIndex]} parentCallBack={this.nextCallBackFunction} isLast={this.isLastQuestion()} qNum={this.state.questions.length}/>
          )}
        </div>
      </div>
    </div>
    );
  }
}

export default App;
