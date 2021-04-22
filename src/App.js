import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';

class App extends Component { 

  constructor(props) {
    super(props);
    this.state  = {
      error: null,
      isLoaded: false,
      categories: [],
    }
  }

  componentDidMount(){
    fetch("./options.json")
      .then(res => res.json())
      .then( json => {
          this.setState({
            isLoaded: true,
            categories: json.categories,
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
          <Form className="form">
            <Form.Group className="form-group">
              <Form.Label className="form-label">No. of questions :</Form.Label>
              <Form.Control className="form-control" placeholder="min : 1, max : 50"/>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Category</Form.Label>
              <Form.Control as="select" className="form-dropdown">
                  {this.state.categories.map((category) => (<option key={category.value} value={category.value}>{category.name}</option>))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Difficulty</Form.Label>
              <Form.Control as="select" className="form-dropdown">
                <option value="0">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Question Type</Form.Label>
              <Form.Control as="select" className="form-dropdown">
                <option value="0">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit" className="button">
              Let's Play!
            </Button>
          </Form>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
