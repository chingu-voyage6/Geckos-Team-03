import React, { Component } from 'react';
import EstimateSetter from './EstimateSetter';
import LongBreakSetter from './LongBreakSetter';
import SoundSetter from './SoundSetter';
import TimeSetter from './TimeSetter';
import './css/settings.css';

// container and title for timers' settings component
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimer: this.props.activeTimer.name
    }
  }

  render() {
    return (
    <div className="timer-settings">

      <div className="timertitles">
        <div className="timertitle work-title"
          onClick={() => this.setState({ selectedTimer: 'work' })}>Work</div>
        <div className="timertitle break-title"
          onClick={() => this.setState({ selectedTimer: 'break' })}>Break</div>
        <div className="timertitle long-break-title"
          onClick={() => this.setState({ selectedTimer: 'longBreak' })}>Long Break</div>
      </div>

        {this.state.selectedTimer === 'work' &&
        <div>
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
          <EstimateSetter changeState={this.props.changeState} estimate={this.props.estimate} mouseDown={this.props.mouseDown} />
       
        </div> 
        }

        {this.state.selectedTimer === 'break' &&
        <div>

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
        }

        {this.state.selectedTimer === 'longBreak' &&
          <div>
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
        }
   
    </div>
  )}
}


export default Settings;