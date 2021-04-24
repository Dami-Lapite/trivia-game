import React, { Component } from 'react';
import QuestionsForm from './components/QuestionsForm';
import Question from './components/Question';
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
    }
  }

  async fetchQuestions(options) {
    let response = await fetch(`https://opentdb.com/api.php?amount=10&type=boolean`);
    if (response.status === 200) {
        let data = await response.json();
        return data;
    }else{
      return "Error";
    }
  }

  callBackFunction = (options) =>{
    this.fetchQuestions(options)
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
          {!this.state.hasQuestions ? (
            <QuestionsForm categories={this.state.categoryList} parentCallBack={this.callBackFunction} />
          ):(
            <Question questionData={this.state.questions[this.state.questionIndex]}/>
          )}
        </div>
      </div>
    </div>
    );
  }
}

export default App;
