import React, { Component } from 'react';
import ButtonProgress from './ButtonProgress';
import ShowTime from './ShowTime';
import Counters from './Counters';
import Settings from './Settings';
import './css/view.css';

// view controller for pomodoro component
class View extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.refs.container.style.maxHeight = '14em';
      this.refs.container.style.opacity = 1;
      this.refs.container.style.marginBottom = '2em';
      this.refs.container.style.padding = '1em .5em';
    }, 0);
  }

  render() {
    return (
    <div ref='container' className="pomodoro-container">
    <div className='delete-button' data-id={this.props.thisTool.id} onClick={() => {
      this.refs.container.style.maxHeight = 0;
      this.refs.container.style.opacity = 0;
      this.refs.container.style.marginBottom = 0;
      this.refs.container.style.padding = '0 .5em';
      this.refs.container.style.borderBottom = '0px solid #fff';
      setTimeout(() => this.props.onDeleteTool(this.props.thisTool.id), 300)
    }}>✕</div>
      <ButtonProgress 
        changeState={this.props.changeState}
        styles={this.props.styles}
        activeTimer={this.props.activeTimer}
        timerFunc={this.props.timerFunc}
        work={this.props.work}
        break={this.props.break}
        longBreak={this.props.longBreak}
        intervalID={this.props.intervalID}
      />
      <div className="pomodoro-details">
        <ShowTime
          font={this.props.styles.font}
          timeRemaining={this.props.activeTimer.timeRemaining}
        />
        <Settings
          changeState={this.props.changeState}
          activeTimer={this.props.activeTimer}
          mouseDown={this.props.mouseDown}
          titleStyles={this.props.styles.titles}
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
        <Counters 
          pomodoros={this.props.pomodoros}
          goal={this.props.goal}
        />
        


      </div>
      
    </div>
  )}
}
export default View;