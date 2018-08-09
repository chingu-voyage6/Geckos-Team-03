import React, { Component } from 'react';
import GoalSetter from './GoalSetter';
import LongBreakSetter from './LongBreakSetter';
import SoundSetter from './SoundSetter';
import TimeSetter from './TimeSetter';
import './css/settings.css';

// container and title for timers' settings component
class Settings extends Component {
  // --------------------------------------------------------------------------
  //                                           change pomodoro goal
  // --------------------------------------------------------------------------

  render() {
    return (
    <div className="timer-settings">

      <div className="settings-group settings-work">
        <div className="timer-title work-title" style={this.props.titleStyles.workTitle}>Work</div>
        <div className="timer-settings-content" style={this.props.settingsStyle}>
          <TimeSetter 
            className='settings-timer-work' 
            timer={this.props.work}
            changeState={this.props.changeState}
            activeTimer={this.props.activeTimer}
            mouseDown={this.props.mouseDown}
          />
          <SoundSetter 
            changeState={this.props.changeState}
            timer={this.props.work}
            onSampleSound={timer => this.props.onSampleSound(timer)}
            activeTimer={this.props.activeTimer}
            sounds={this.props.sounds}
          />
          <GoalSetter changeState={this.props.changeState} goal={this.props.goal} mouseDown={this.props.mouseDown} />
       
        </div> 
      </div>
      
      <div className="settings-group settings-break">
        <div className="timer-title break-title" style={this.props.titleStyles.breakTitle}>Break</div>
        <div className="timer-settings-content" style={this.props.settingsStyle}>
          <TimeSetter 
            classname='settings-timer-break' 
            timer={this.props.break} 
            changeState={this.props.changeState}
            activeTimer={this.props.activeTimer}
            mouseDown={this.props.mouseDown}
          />
          <SoundSetter 
            changeState={this.props.changeState}
            timer={this.props.break} 
            onSampleSound={timer => this.props.onSampleSound(timer)}
            activeTimer={this.props.activeTimer}
            sounds={this.props.sounds}
          />
        </div>
      </div>

      <div className="settings-group settings-long-break">
        <div className="timer-title long-break-title" style={this.props.titleStyles.longBreakTitle}>Long Break</div>
        <div className="timer-settings-content" style={this.props.settingsStyle}>
          <TimeSetter 
            classname='settings-timer-long-break' 
            timer={this.props.longBreak} 
            changeState={this.props.changeState}
            activeTimer={this.props.activeTimer}
            mouseDown={this.props.mouseDown}
          />
          <SoundSetter 
            changeState={this.props.changeState}
            timer={this.props.longBreak} 
            onSampleSound={timer => this.props.onSampleSound(timer)}
            activeTimer={this.props.activeTimer}
            sounds={this.props.sounds}
          />
          <LongBreakSetter
            changeState={this.props.changeState}
            pomodoroSet={this.props.pomodoroSet}
            mouseDown={this.props.mouseDown}
          />
        </div>
      </div> 


    </div>
  )}
}


export default Settings;