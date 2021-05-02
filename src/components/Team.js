import React, { Component } from 'react';
import styles from '../styles/team.module.css';
import Button from 'react-bootstrap/Button';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

export class Team extends Component {

    handleAdd = ()=>{
        this.props.parentCallBack(this.props.teamData.name);
    }

    render() {
        return (
            <div className={styles.teamContainer}>
                <p className={styles.teamText}>Team {this.props.teamData.name} : {this.props.teamData.score}</p>
                <Button type="button" className={styles.addButton} onClick={this.handleAdd}>
                    <AddOutlinedIcon className={styles.add}/>
                </Button>
            </div>
        )
    }
}

export default Team
