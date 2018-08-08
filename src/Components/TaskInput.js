import React, { Component } from 'react';
import './css/taskinput.css';

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  } 

  componentDidMount() {
    this.refs.input.focus();
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() { return (
      <form onSubmit={(e) => {
        this.setState({ inputValue: '' })
        this.props.onAddTask(e, this.state.inputValue);
      }}>
        <input onChange={this.handleInputChange} value={this.state.inputValue} ref='input' className='main-input' autoFocus placeholder="What do you want to get done?" />
      </form>
    )}
}

export default TaskInput;