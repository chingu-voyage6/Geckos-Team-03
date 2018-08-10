import React, { Component } from 'react';
import './css/playpause.css';

class PlayPause extends Component {
  constructor(props) {
    super(props);

    this.handlePlayPause = this.handlePlayPause.bind(this);
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
      <div className='playpause' onClick={this.handlePlayPause}>
          {this.props.activeTimer.paused 
              ? <img src={require('./images/play.svg')} alt="play icon" className="play-icon"/>
              : <img src={require('./images/pause.svg')} alt="pause icon" className="pause-icon"/>}
      </div>
    )
  }
}

export default PlayPause;