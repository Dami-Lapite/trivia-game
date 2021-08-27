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
        }
    }

    difficultyToggle = (setting) =>{
        this.setState({difficulty: setting});
        let obj = document.getElementById(setting);
        obj.className = obj.className.replace(" active", "");
        obj.className += " active";
        let arr = ["easy","medium","hard"];
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
        let arr = ["multiple","boolean"];
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
            let qType = this.state.questionType;
            let object = {numOfTeams: numOfTeams.toString(), numOfQuestions: numOfQuestions.toString(), category: categoryTemp, difficulty: difficultyTemp, questionType: qType};
            this.props.parentCallBack(object);
        }
    }

    render() {
        return (
            <div>
                <Form className={styles.form} onSubmit={this.handleSubmit}>
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
                        </div>
                        <Form.Text className={styles.formHint} muted>default: any difficulty</Form.Text>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Question Type</Form.Label>
                        <div className={styles.toggleBlock}>
                            <div className="toggleItem standard" id="multiple" onClick={() => this.questionTypeToggle("multiple")}><p>Multiple Choice</p></div>
                            <div className="toggleItem standard" id="boolean" onClick={() => this.questionTypeToggle("boolean")}><p>True/False</p></div>
                        </div>
                        <Form.Text className={styles.formHint} muted>default: any type</Form.Text>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Questions per Team :</Form.Label>
                        <NumOfQuestions />
                        <Form.Text className={styles.formHint} muted>max: 50, default: 5</Form.Text>
                    </Form.Group>
                    <Form.Text className={styles.formHint} muted><i className="fas fa-exclamation-circle"></i>&emsp;Not all game parameter combinations are available.</Form.Text>
                    <div className="buttonContainer">
                        <Button type="submit" className="button">
                        Let's Play!
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default QuestionsForm
