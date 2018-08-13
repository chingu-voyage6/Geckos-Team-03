import React, { Component } from 'react';

// settings component - set a pomodoro goal
class LongBreakSetter extends Component {
  constructor(props) {
    super(props);
    this.handleSetChange = this.handleSetChange.bind(this);
  }

  handleSetChange(change) {
    const pomodoroSet = this.props.pomodoroSet + change;
    if (pomodoroSet < 1) return;
    this.props.changeState({ pomodoroSet });

    // continue recursing the function every 0.1 seconds if mouse click is held
    setTimeout(() => {
      if (this.props.mouseDown) this.handleSetChange(change);
    }, 100);
  }

  // settings component - set the number of pomodoros until a long break
  render() {
    return (
    <div className='settings-item settings-lb-set' >
        <a className='decrement noselect' onMouseDown={() => this.handleSetChange(-1)}>–</a>
        <div className='settings-goal-show'>Every {this.props.pomodoroSet}</div>
        <a className='increment noselect' onMouseDown={() => this.handleSetChange(+1)}>+</a>
      </div>
  )}
}

export default LongBreakSetter;