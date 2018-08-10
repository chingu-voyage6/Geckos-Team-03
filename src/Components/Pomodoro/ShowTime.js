import React, { Component } from 'react';
import './css/showtime.css';

// displays the timer's current time formatted
class ShowTime extends Component {
  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    const activeTimer = {...this.props.activeTimer};
    
    // end any running timer function
    clearInterval(activeTimer.intervalID);
    
    const duration = this.props.work.duration;
    
    // default back to work timer
    activeTimer.name = 'work';
    activeTimer.timeRemaining = duration;
    activeTimer.duration = duration;
    activeTimer.paused = true;

    this.props.changeState({ activeTimer });
  }

  render() {
    const timeRemaining = this.props.timeRemaining;

    let mins = Math.floor((timeRemaining/1000)/60);
    if (mins < 10) mins = `0${mins}`; // prepend 0 if < 10

    let secs = Math.floor((timeRemaining/1000)%60);
    if (secs < 10) secs = `0${secs}`; // prepend 0 if < 10

    let msecs = Math.floor(timeRemaining % 1000);
    if (msecs < 10) {
      msecs = `00${msecs}`;
    } else if (msecs < 100) {
      msecs = `0${msecs}`;
    }
    return (
    <div className="show-time">
      {mins}:{secs}
      <div className="pomodoro-refresh-icon" onClick={this.handleReset}>
        <i className="fas fa-sync"></i>
      </div>
    </div>
  )}
}

export default ShowTime;