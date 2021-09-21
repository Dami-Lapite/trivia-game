import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../styles/questionsForm.module.css';
import '../styles/App.css'
import NumOfQuestions from './NumericInput';
import NumOfTeams from './NumericInput2';

export class QuestionsForm extends Component {

    constructor(props){
        super(props);
        this.state  = {
            difficulty: "",
            questionType: "",
            getNames: false,
            dataObject: {},
            teamNames:[1],
            timer: false,
        }
    }

    difficultyToggle = (setting) =>{
        this.setState({difficulty: setting});
        let obj = document.getElementById(setting);
        obj.className = obj.className.replace(" active", "");
        obj.className += " active";
        let arr = ["easy","medium","hard","any-difficulty"];
        arr.forEach((item) =>{
            if(item !== setting){
                let temp = document.getElementById(item);
                temp.className = temp.className.replace(" active", "");
            }
        })
    }

    questionTypeToggle = (setting)=>{
        this.setState({questionType: setting});
        let obj = document.getElementById(setting);
        obj.className = obj.className.replace(" active", "");
        obj.className += " active";
        let arr = ["multiple","boolean","any-type"];
        arr.forEach((item) =>{
            if(item !== setting){
                let temp = document.getElementById(item);
                temp.className = temp.className.replace(" active", "");
            }
        })
    }

    timerToggle = (setting)=>{
        if(setting === "on-switch"){
            this.setState({timer: true});
        }else{
            this.setState({timer: false});
        }
        let obj = document.getElementById(setting);
        obj.className = obj.className.replace(" active", "");
        obj.className += " active";
        let arr = ["on-switch","off-switch"];
        arr.forEach((item) =>{
            if(item !== setting){
                let temp = document.getElementById(item);
                temp.className = temp.className.replace(" active", "");
            }
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        let numOfTeams= event.target.elements.NumOfTeams.value;
        if(numOfTeams === "" || isNaN(parseInt(numOfTeams))){
            numOfTeams = 1;
        }
        let numOfQuestions= event.target.elements.NumOfQuestions.value;
        if(numOfQuestions === "" || isNaN(parseInt(numOfQuestions))){
            numOfQuestions = 5;
        }
        if(numOfTeams <= 10 && numOfQuestions <= 50){
            let categoryTemp = event.target.elements.category.value;
            let difficultyTemp = this.state.difficulty;
            if(difficultyTemp === "any-difficulty"){
                difficultyTemp = "";
            };
            let qType = this.state.questionType;
            if(qType === "any-type"){
                qType = "";
            };
            let timerTemp = this.state.timer;
            let object = {numOfTeams: numOfTeams.toString(), numOfQuestions: numOfQuestions.toString(), 
                category: categoryTemp, difficulty: difficultyTemp, questionType: qType, timer: timerTemp};
            let teamNamesTemp = [];
            for(let i = 1 ; i <= numOfTeams; i++){
                teamNamesTemp.push(i);
            }
            this.setState({getNames: true, dataObject: object, teamNames: teamNamesTemp});
        }
    }

    finalSubmit = (event)=>{
        event.preventDefault();
        let object = this.state.dataObject;
        let teamNamesTemp = [];
        for(let i = 0 ; i < object.numOfTeams; i++){
            let name = event.target.elements[i].value;
            if (name !== ""){
                teamNamesTemp.push(name);
            }else{
                teamNamesTemp.push("Team "+(i+1));
            }
        }
        object.teamNames = teamNamesTemp;
        this.props.parentCallBack(object);
    }

    render() {
        return (
            <div>{!this.state.getNames ? 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Number of teams :</Form.Label>
                        <NumOfTeams />
                        <Form.Text className={styles.formHint} muted>max: 10, default: 1</Form.Text>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Category</Form.Label>
                        <Form.Control as="select" className={styles.formDropdown} name="category">
                            {this.props.categories.map((category) => (<option key={category.value} value={category.value}>{category.name}</option>))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Difficulty</Form.Label>
                        <div className={styles.toggleBlock}>
                            <div className="toggleItem easy" id="easy" onClick={() => this.difficultyToggle("easy")}><p>Easy</p></div>
                            <div className="toggleItem medium" id="medium" onClick={() => this.difficultyToggle("medium")}><p>Medium</p></div>
                            <div className="toggleItem hard" id="hard" onClick={() => this.difficultyToggle("hard")}><p>Hard</p></div>
                            <div className="toggleItem standard active" id="any-difficulty" onClick={() => this.difficultyToggle("any-difficulty")}><p>Any</p></div>
                        </div>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Question Type</Form.Label>
                        <div className={styles.toggleBlock}>
                            <div className="toggleItem standard" id="multiple" onClick={() => this.questionTypeToggle("multiple")}><p>Multiple Choice</p></div>
                            <div className="toggleItem standard" id="boolean" onClick={() => this.questionTypeToggle("boolean")}><p>True/False</p></div>
                            <div className="toggleItem standard active" id="any-type" onClick={() => this.questionTypeToggle("any-type")}><p>Any</p></div>
                        </div>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Questions per Team :</Form.Label>
                        <NumOfQuestions />
                        <Form.Text className={styles.formHint} muted>max: 50, default: 5</Form.Text>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.inlineFormLabel}>Timer (30 seconds) :</Form.Label>
                        <div className={styles.switchBlock}>
                            <div className="switchItem left" id="on-switch" onClick={() => this.timerToggle("on-switch")}><p>ON</p></div>
                            <div className="switchItem right active" id="off-switch" onClick={() => this.timerToggle("off-switch")}><p>OFF</p></div>
                        </div>
                    </Form.Group>
                    <Form.Text className={styles.formHint} muted><i className="fas fa-exclamation-circle"></i>&emsp;Not all game parameter combinations are available.</Form.Text>
                    <div className="buttonContainer">
                        <Button type="submit" className="button">
                        Let's Play!
                        </Button>
                    </div>
                </Form>:(
                    <Form className={styles.nameForm} onSubmit={this.finalSubmit}>
                        {this.state.teamNames.map((i) =>(
                            <Form.Group key={i} className={styles.nameFormGroup}>
                                <Form.Label className={styles.nameFormLabel}>Team {i} Name:</Form.Label>
                                <input className={styles.nameInput} autoComplete="off" />
                            </Form.Group>
                        ))}
                        <div className="buttonContainer">
                            <Button type="submit" className="button">
                                Start Game !
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        )
    }
}

export default QuestionsForm
