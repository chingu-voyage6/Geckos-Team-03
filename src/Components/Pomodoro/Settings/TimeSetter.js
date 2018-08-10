import React, { Component } from 'react';

// settings component - set a time
class TimeSetter extends Component {
  constructor(props) {
    super(props);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }
  handleDurationChange(change) {

    // clone timer and return if new duration is inappropriate
    const timer = {...this.props.timer}
    timer.duration += change * 60 * 1000; // from minutes to milliseconds
    if (timer.duration < 0 || timer.duration > 5940000) return; // 0 < timer < 99 minutes

    // set state
    this.props.changeState({ [timer.name]: timer })

    // set current timer if it is the one being changed and it has not started
    const activeTimer = this.props.activeTimer;
    if (timer.name === activeTimer.name && activeTimer.duration === activeTimer.timeRemaining) {
      activeTimer.duration = timer.duration;
      activeTimer.timeRemaining = timer.duration;
      this.setState({ activeTimer });
    }

    // recurse the function if mouse click is held
    setTimeout(() => {
      if (this.props.mouseDown) this.handleDurationChange(change);
    }, 100);
  }

  render() {
    let timerName;
    this.props.timer.name === 'longBreak'
      ? timerName = 'long-break'
      : timerName = this.props.timer.name;
    return (
      <div className={`settings-item settings-timer-${timerName}`} >
        <a className='decrement noselect' onMouseDown={() => this.handleDurationChange(-1)}>–</a>
        <div className='settings-timer-show'>{Math.floor(this.props.timer.duration / 60 / 1000)} min</div>
        <a className='increment noselect' onMouseDown={() => this.handleDurationChange(+1)}>+</a>
      </div>
    );
  }
}

export default TimeSetter;