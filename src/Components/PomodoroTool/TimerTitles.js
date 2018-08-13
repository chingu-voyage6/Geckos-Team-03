import React, { Component } from 'react';
import './css/timertitles.css';

class TimerTitles extends Component {
  render() {
    return (
    <div className="timertitles">
      <div className="timertitle work-title" style={this.props.titleStyles.workTitle}>Work</div>
      <div className="timertitle break-title" style={this.props.titleStyles.breakTitle}>Break</div>
      <div className="timertitle long-break-title" style={this.props.titleStyles.longBreakTitle}>Long Break</div>
    </div>
    )
  }
}

export default TimerTitles;