import React, { Component } from 'react';
import './css/playpause.css';

class PlayPause extends Component {
  constructor(props) {
    super(props);

    this.handlePlayPause = this.handlePlayPause.bind(this);
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

  handlePlayPause() {
    let timer = this.props.activeTimer;

    // pause or play the timer depending on current state
    if (timer.paused) {
      timer.untilTime = Date.now() + this.props.activeTimer.timeRemaining;
      timer.intervalID = setInterval(() => this.props.timerFunc(), 50);
      this.props.changeState({ activeTimer: timer });
    } else {
      clearInterval(timer.intervalID);
    }

    timer.paused = !timer.paused;

    this.props.changeState({ activeTimer: timer })
  }

  render() {
    return (
      <div className='playpause'>
        <img src={require('./images/play.svg')} alt="play icon"/>
      </div>
    )
  }
}

export default PlayPause;