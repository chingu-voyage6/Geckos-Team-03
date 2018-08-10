// play/pause button and circular progress bar component
import React, { Component } from 'react';
import './css/progress.css';

class Progress extends Component {

  render() {
      return (
    <div className="progress">  
        <div 
          className="progress-inner" 
          style={{ width: `${this.props.activeTimer.progressPercent}%` }
        }/>
    </div>
    );
  }
}

export default Progress;