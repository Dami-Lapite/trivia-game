import React, { Component } from 'react';
import styles from '../styles/question.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import decodeHtmlEntities from '../functions/decodeHtmlEntities';

export class Question extends Component {

    constructor(props){
        super(props);
        this.state  = {
            isAnswered: false,
            answer: "",
            isCorrect: false,
        }
    }

    setAnswer = (answer)=>{
        this.setState({answer:answer});
        var answerList= document.querySelectorAll("div.option");
        answerList.forEach((option) =>{
            option.className = option.className.replace(" optionActive", "");
            if(option.childNodes[0].innerText ===  answer){
                option.className += " optionActive";
            };
        });
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        let answer = this.state.answer;
        let tempScore = this.props.team.score;
        if( answer !== ""){
            if(answer === decodeHtmlEntities(this.props.questionData.correct_answer)){
                tempScore += 1;
                this.setState({isAnswered: true, isCorrect: true});
            }else{
                this.setState({isAnswered: true});
            }
            this.props.setShow(tempScore);
        }
    }

    handleNext = ()=>{
        this.setState({isAnswered: false, isCorrect: false, answer:""});
        this.props.parentCallBack();
    }

    handleNewGame = ()=>{
        this.props.parentCallBack();
    }

    render() {
        return (
            <div>
                {this.state.isAnswered ? <div className={styles.questionTextContainer}>{
                this.state.isCorrect ? <div>
                    <p className="gameText" >That's Correct !!</p>
                    <p className={styles.correct}>{decodeHtmlEntities(this.props.questionData.correct_answer)}
                    &emsp;<i className="far fa-check-circle"></i></p>
                    </div> 
                : <div>
                    <p className="gameText">That's Incorrect ! </p>
                    <p className={styles.correct}>{decodeHtmlEntities(this.props.questionData.correct_answer)}
                    &emsp;<i className="far fa-check-circle"></i></p>
                    <p className={styles.incorrect}>{this.state.answer}
                    &emsp;<i className="far fa-times-circle"></i></p>
                </div>}
                <Button type="button" className="button" onClick={this.handleNext}>Next Question</Button>
            </div>:
            <Form className={styles.questionContainer} onSubmit={this.handleSubmit}>
                <div className={styles.questionTextContainer}>
                    <h3>Team {this.props.team.name}</h3>
                    <p className="gameText">{decodeHtmlEntities(this.props.questionData.question)}</p> 
                </div>
                {this.props.answers.map((answer, i) => 
                <div className="option" onClick={() => this.setAnswer(answer)} key={i}>
                <p>{answer}</p>
                </div>)}
                <div className="buttonContainer"><Button type="submit" className="button">Submit Answer</Button></div>
            </Form>
            }</div>
        )
    }
}

export default Question
