import React, { Component } from 'react';

// settings component - set a pomodoro goal
class GoalSetter extends Component {
  constructor(props) {
    super(props);
    this.handleGoalChange = this.handleGoalChange.bind(this);
  }

  handleGoalChange(change) {
    const goal = this.props.goal + change;
    if (goal < 1) return;
    this.props.changeState({ goal });

    // continue recursing the function every 0.1 seconds if mouse click is held
    setTimeout(() => {
      if (this.props.mouseDown) this.handleGoalChange(change);
    }, 100);
  }

  render() {
    return (
      <div className='settings-item settings-goal'>
          <a className='decrement noselect' onMouseDown={() => this.handleGoalChange(-1)}>–</a>
          <div className='settings-goal-show'>Goal : {this.props.goal}</div>
          <a className='increment noselect' onMouseDown={() => this.handleGoalChange(+1)}>+</a>
        </div>
    )
  }
}

export default GoalSetter;