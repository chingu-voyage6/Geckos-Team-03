import React, { Component } from 'react';
import PlayPause from './PlayPause';
import ShowTime from './ShowTime';
import Counters from './Counters';
import Progress from './Progress';
import TimerTitles from './TimerTitles';
import Settings from './Settings';
import './css/view.css';

// view controller for pomodoro component
class View extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.refs.container.style.maxHeight = '14em';
      this.refs.container.style.opacity = 1;
      this.refs.container.style.marginBottom = '2em';
      this.refs.container.style.padding = '1.5em 1em';
    }, 0);
  }

  render() {
    return (
    <div ref='container' className="pomodoro-container">

    {/* ICON BUTTONS */}

    <div className='delete-button' data-id={this.props.thisTool.id} onClick={() => {
      this.refs.container.style.maxHeight = 0;
      this.refs.container.style.opacity = 0;
      this.refs.container.style.marginBottom = 0;
      this.refs.container.style.padding = '0 .5em';
      this.refs.container.style.borderBottom = '0px solid #fff';
      setTimeout(() => this.props.onDeleteTool(this.props.thisTool.id), 300)
    }}>✕</div>

    <div className='options-button' onClick={() => this.props.changeState({ showSettings: !this.props.showSettings })}>
      <i className="fas fa-cog"></i>
    </div>

    {/* CONTENT WHEN SETTINGS ARE NOT SHOWN */}
    {!this.props.showSettings ? (
      <div>
      <div className='flex-line'>
        <PlayPause 
          changeState={this.props.changeState}
          activeTimer={this.props.activeTimer}
          styles={this.props.styles}
          timerFunc={this.props.timerFunc}
          intervalID={this.props.intervalID}
        />

        <ShowTime
          font={this.props.styles.font}
          timeRemaining={this.props.activeTimer.timeRemaining}
        />

        <Counters 
          pomodoros={this.props.pomodoros}
          estimate={this.props.estimate}
        />
      </div>

      <Progress 
        styles={this.props.styles}
        activeTimer={this.props.activeTimer}
      />

      <TimerTitles 
        activeTimer={this.props.activeTimer}
        titleStyles={this.props.styles.titles}
        />

      </div>
    ) :
    ( //SETTINGS DISPLAY
      <Settings
        changeState={this.props.changeState}
        titleStyles={this.props.styles.titles}
        activeTimer={this.props.activeTimer}
        mouseDown={this.props.mouseDown}
        work={this.props.work}
        break={this.props.break}
        longBreak={this.props.longBreak}
        goal={this.props.goal}
        pomodoroSet={this.props.pomodoroSet}
        sounds={this.props.sounds}
        workSound={this.props.work.sound}
        breakSound={this.props.break.sound}
        longBreakSound={this.props.longBreak.sound}
        onSampleSound={this.props.onSampleSound}
        showSettings={this.props.showSettings}
        settingsStyle={this.props.styles.settings}
        onSettingsToggle={this.handleSettingsToggle}
      />
    )}
    </div>
  )}
}
export default View;