import React from 'react';
import './css/counters.css';

// displays pomodoros completed and pomodoro goal
function Counters(props) {
  return (
    <div className="counters">
      <div className="counter-pomodoros">{props.pomodoros}</div>
        <div className="counter-goal"> /<span editable="true">{props.goal}</span></div>
        <div className="counter-text">completed</div>
    </div>
  )
}

export default Counters;