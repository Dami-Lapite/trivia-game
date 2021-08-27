import React, { Component } from 'react';
import styles from '../styles/numericInput.module.css';

export default class NumOfQuestions extends Component {

    constructor(props){
        super(props);
        this.state  = {
            invalid: false,
        }
    }

    add = (e)=>{
        e.preventDefault();
        let temp = document.getElementById("NumOfQuestions").value;
        if (temp === ""){
            temp = 0;
        }
        temp = parseInt(temp);
        if (temp < 50) {
            temp++;
            document.getElementById("NumOfQuestions").value = temp;
        }
        this.checkInput();
    }

    subtract = (e)=>{
        e.preventDefault();
        let temp = document.getElementById("NumOfQuestions").value;
        if (temp === ""){
            temp = 1;
            document.getElementById("NumOfQuestions").value = temp;
        }else{
            temp = parseInt(temp);
            if(temp > 1){
                temp--;
                document.getElementById("NumOfQuestions").value = temp;
            }
        }
        this.checkInput();
    }

    checkInput = ()=>{
        let temp = document.getElementById("NumOfQuestions").value;
        if (!isNaN(parseInt(temp)) || (temp==="")){
            if(!isNaN(parseInt(temp)) && ((temp < 1) || (temp > 50))){
                this.setState({invalid: true});
            }else{
                this.setState({invalid: false});
            }
        }else{
            this.setState({invalid: true});
        }
    }

    render() {
        return (
            <div className={styles.InputContainer}>
                <button className={styles.minusButton} onClick={this.subtract}><i className="fas fa-minus"></i></button>
                <input className={styles.input} name="NumOfQuestions" id="NumOfQuestions" onChange={this.checkInput} autoComplete="off"/>
                <button className={styles.plusButton} onClick={this.add}><i className="fas fa-plus"></i></button>
                {this.state.invalid && <p className={styles.error}>Invalid Input</p>}
            </div>
        )
    }
}
