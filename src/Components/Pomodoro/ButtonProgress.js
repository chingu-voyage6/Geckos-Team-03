// this could be split into some sub-components
// play/pause button and circular progress bar component

import React, { Component } from 'react';
import './css/buttonProgress.css';

class ButtonProgress extends Component {
  constructor(props) {
    super(props);
    
    this.progressCircle = this.progressCircle.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === ' ') {
      this.handlePlayPause();
    } else if (e.key === 'Escape') {
      this.handleReset();
    }
  }

  componentDidMount() {
    this.circle = this.refs.circle.getContext('2d');

    this.startPoint = 4.72;

    this.cw = this.circle.canvas.width;
    this.ch = this.circle.canvas.height;
    console.log(this.cw, this.ch);

    // optimised animation
    requestAnimationFrame(this.progressCircle);

    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  componentDidUpdate(){
    requestAnimationFrame(this.progressCircle);
  }

  // --------------------------------------------------------------------------
  //                                           play/pause timer
  // --------------------------------------------------------------------------

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

    this.props.changeState({activeTimer: timer})
  }

  // --------------------------------------------------------------------------
  //                                           handle reset
  // --------------------------------------------------------------------------

  // default back to work timer
  handleReset() {
    const activeTimer = {...this.props.activeTimer};

    // end any running timer function
    clearInterval(activeTimer.intervalID);

    const duration = this.props.work.duration;
    
    activeTimer.name = 'work';
    activeTimer.timeRemaining = duration;
    activeTimer.duration = duration;
    activeTimer.paused = true;

    this.props.changeState({ activeTimer });
  }

  // --------------------------------------------------------------------------
  //                                           progress circle
  // --------------------------------------------------------------------------

  progressCircle() {
    const timerName = this.props.activeTimer.name;
    const duration = this.props.activeTimer.duration;
    const timeRemaining = this.props.activeTimer.timeRemaining;
    const progress = (duration - timeRemaining) / duration;

    let endPoint = ((progress) * Math.PI * 2);
    this.circle.clearRect(0,0,this.cw,this.ch); // clear canvas every time function is called

    this.circle.lineWidth = 10; // stroke size
    if (timerName === 'work') {
      this.circle.strokeStyle = '#1179a5'; // var(--darkblue)
    } else if (timerName === 'break') {
      this.circle.strokeStyle = '#70cce0'; // var(--babyblue)
    } else if (timerName === 'longBreak') {
      this.circle.strokeStyle = '#62ba6c'; // var(--green)
    }

    this.circle.beginPath();
    this.circle.arc(60,60,55,this.startPoint,endPoint+this.startPoint); // x, y, radius, start, end

    this.circle.stroke(); // fill stroke
  }

  render() {
      return (
    <div className="buttons-container">  
      <div className="reset-button noselect" onClick={this.handleReset}>✕</div>
      <div 
        className="button-progress"
        style={this.props.styles.background}
      >
        <div className="button-progress-inner">
          <i className={this.props.activeTimer.paused ? 'fas fa-play' : 'fas fa-pause'} style={this.props.styles.font}></i>
        </div>
      </div>
      <canvas width='120' height='120' ref="circle" className="progress-canvas" onClick={this.handlePlayPause}/>
    </div>
    );
  }
}

export default ButtonProgress;