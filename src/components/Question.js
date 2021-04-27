import React, { Component } from 'react';
import styles from '../styles/question.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class Question extends Component {

    constructor(props){
        super(props);
        this.state  = {
            isAnswered: false,
            answers: [],
            isCorrect: false,
            score: 0,
            gameOver: false,
        }
    }

    decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    getAnswers = () =>{
        let allAnswers = [];
        for (const incorrect_answer of this.props.questionData.incorrect_answers) {
            allAnswers.push(this.decodeHTMLEntities(incorrect_answer));
        }
        let randomIndex = this.getRandomInt(allAnswers.length);
        allAnswers.splice(randomIndex , 0, this.decodeHTMLEntities(this.props.questionData.correct_answer));
        return allAnswers;
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        if(event.target.elements.selectAnswer.value !== ""){
            if(event.target.elements.selectAnswer.value === this.decodeHTMLEntities(this.props.questionData.correct_answer)){
                let temp = this.state.score + 1;
                this.setState({isAnswered: true, isCorrect: true, score: temp});
            }else{
                this.setState({isAnswered: true});
            }
        }
    }

    handleNext = ()=>{
        this.setState({isAnswered: false, isCorrect: false, answers: []});
        if(this.props.isLast){
            this.setState({gameOver: true});
        }else{
            this.props.parentCallBack();
        }
    }

    handleNewGame = ()=>{
        this.setState({score: 0, gameOver:false});
        this.props.parentCallBack();
    }

    render() {
        return (
            <div>{this.state.gameOver ?
                <div className={styles.questionTextContainer}>
                    <p className={styles.answeredText}>You answered {this.state.score} out of {this.props.qNum} questions correctly !</p>
                    <Button type="button" className={styles.button} onClick={this.handleNewGame}>New Game</Button>
                </div>
                :<div>{this.state.isAnswered ? <div className={styles.questionTextContainer}>{
                    this.state.isCorrect ? <p className={styles.answeredText} >That's Correct !!</p> 
                    : <p className={styles.answeredText}>That's Incorrect ! The correct answer is {this.decodeHTMLEntities(this.props.questionData.correct_answer)}</p>}
                    <Button type="button" className={styles.button} onClick={this.handleNext}>Next Question</Button>
                </div>:
                <Form className={styles.questionContainer} onSubmit={this.handleSubmit}>
                    <div className={styles.questionTextContainer}>
                        <p className={styles.questionText}>{this.decodeHTMLEntities(this.props.questionData.question)}</p> 
                    </div>
                {this.props.questionData.type === "boolean" ? (
                    <div className={styles.controlContainer}>
                        <Form.Check
                            type="radio"
                            label="True"
                            name="selectAnswer"
                            value="True"
                            className={styles.radio}
                            />
                            <Form.Check
                            type="radio"
                            label="False"
                            name="selectAnswer"
                            value="False"
                            className={styles.radio}
                            />
                    </div>
                ):<div>
                    {this.getAnswers().map((answer) => 
                    <Form.Check
                            key={answer}
                            type="radio"
                            label={answer}
                            name="selectAnswer"
                            value={answer}
                            className={styles.radio}
                            />)}
                    </div>}
                    <div className={styles.buttonContainer}><Button type="submit" className={styles.button}>Submit Answer</Button></div>
                </Form>
                }</div>
            }</div>
        )
    }
}

export default Question
