import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../styles/questionsForm.module.css';

export class QuestionsForm extends Component {

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.parentCallBack(event.target.elements);
    }

    render() {
        return (
            <div>
                <Form className={styles.form} onSubmit={this.handleSubmit}>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>No. of questions :</Form.Label>
                        <Form.Control className={styles.formControl} name="NumOfQuestions"/>
                        <Form.Text className={styles.formHint} muted>minimum : 1, maximum : 50, default: 10</Form.Text>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Category</Form.Label>
                        <Form.Control as="select" className={styles.formDropdown} name="category">
                            {this.props.categories.map((category) => (<option key={category.value} value={category.value}>{category.name}</option>))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Difficulty</Form.Label>
                        <Form.Control as="select" className={styles.formDropdown} name="difficulty">
                            <option value="0">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Question Type</Form.Label>
                        <Form.Control as="select" className={styles.formDropdown} name="questionType">
                            <option value="0">Any Type</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True/False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>No. of teams :</Form.Label>
                        <Form.Control className={styles.formControl} name="numOfTeams"/>
                        <Form.Text className={styles.formHint} muted>Enter 1 for single player , default: 1</Form.Text>
                    </Form.Group>
                    <div className={styles.buttonContainer}>
                        <Button type="submit" className={styles.button}>
                        Let's Play!
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default QuestionsForm
