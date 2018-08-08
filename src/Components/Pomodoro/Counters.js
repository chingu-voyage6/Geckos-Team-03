import React from 'react';
import './css/counters.css';

// displays 
function Counters(props) {
  return (
    <div className="counters">
      <div className="counter-pomodoros">{props.pomodoros}</div>
        <div className="counter-goal"> /<span editable="true">{props.goal}</span></div>
        <div className="counter-text">estimated</div>
    </div>
  )
}

export default Counters;