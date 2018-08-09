import React, { Component } from 'react';

// settings component - set a pomodoro estimate
class EstimateSetter extends Component {
  constructor(props) {
    super(props);
    this.handleEstimateChange = this.handleEstimateChange.bind(this);
  }

  handleEstimateChange(change) {
    const estimate = this.props.estimate + change;
    if (estimate < 1) return;
    this.props.changeState({ estimate });

    // continue recursing the function every 0.1 seconds if mouse click is held
    setTimeout(() => {
      if (this.props.mouseDown) this.handleEstimateChange(change);
    }, 100);
  }

  render() {
    return (
      <div className='settings-item settings-estimate'>
          <a className='decrement noselect' onMouseDown={() => this.handleEstimateChange(-1)}>–</a>
          <div className='settings-estimate-show'>Estimate : {this.props.estimate}</div>
          <a className='increment noselect' onMouseDown={() => this.handleEstimateChange(+1)}>+</a>
        </div>
    )
  }
}

export default EstimateSetter;