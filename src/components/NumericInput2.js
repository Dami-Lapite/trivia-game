import React, { Component } from 'react';
import styles from '../styles/numericInput.module.css';

export default class NumOfTeams extends Component {

    constructor(props){
        super(props);
        this.state  = {
            invalid: false,
        }
    }

    add = (e)=>{
        e.preventDefault();
        let temp = document.getElementById("NumOfTeams").value;
        if (temp === ""){
            temp = 0;
        }
        temp = parseInt(temp);
        if (temp < 10) {
            temp++;
            document.getElementById("NumOfTeams").value = temp;
        }
        this.checkInput();
    }

    subtract = (e)=>{
        e.preventDefault();
        let temp = document.getElementById("NumOfTeams").value;
        if (temp === ""){
            temp = 1;
            document.getElementById("NumOfTeams").value = temp;
        }else{
            temp = parseInt(temp);
            if(temp > 1){
                temp--;
                document.getElementById("NumOfTeams").value = temp;
            }
        }
        this.checkInput();
    }

    checkInput = ()=>{
        let temp = document.getElementById("NumOfTeams").value;
        if (!isNaN(parseInt(temp)) || (temp==="")){
            if(!isNaN(parseInt(temp)) && ((temp < 1) || (temp > 10))){
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
                <input className={styles.input} name="NumOfTeams" id="NumOfTeams" onChange={this.checkInput} autocomplete="off"/>
                <button className={styles.plusButton} onClick={this.add}><i className="fas fa-plus"></i></button>
                {this.state.invalid && <p className={styles.error}>Invalid Input</p>}
            </div>
        )
    }
}
