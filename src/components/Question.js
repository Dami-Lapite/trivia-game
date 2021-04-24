import React, { Component } from 'react';
import styles from '../styles/question.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class Question extends Component {

    decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    render() {
        return (
            <Form className={styles.questionContainer}>
                <div className={styles.questionTextContainer}>
                    <Form.Label className={styles.questionText}>{this.decodeHTMLEntities(this.props.questionData.question)}</Form.Label> 
                </div>
               {this.props.questionData.type === "boolean" ? (
                   <div className={styles.controlContainer}>
                       <Form.Check
                        type="radio"
                        label="True"
                        name="TrueOrFalse"
                        className={styles.radio}
                        />
                        <Form.Check
                        type="radio"
                        label="False"
                        name="TrueOrFalse"
                        className={styles.radio}
                        />
                   </div>
               ):null}
               <Button type="submit" className={styles.button}>See Answer</Button>
            </Form>
        )
    }
}

export default Question
