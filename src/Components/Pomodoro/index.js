// all state is stored here, as well as top-most timer functions and sounds

import React, { Component } from 'react';
import View from './View';

import Bell from './Sounds/bell.mp3';
import Triumph from './Sounds/triumph.mp3';
import LevelUp from './Sounds/levelup.mp3';
import Winning from './Sounds/winning.mp3';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTimer: {
        name: 'work',
        timeRemaining: 1500000,
        duration: 1500000, // so that settings changes does not alter things - freeze timer duration
        paused: true,
        untilTime: 0,
        intervalID: 0,
      },

      showSettings: false,

      // helps with the settings incrementors/decrementors that fire while the mouse is down
      mouseDown: false,

      // pomodoros completed, pomodoro goal, pomodoros between each long break
      pomodoros: 0,
      goal: 8,
      pomodoroSet: 4,

      // sound names to assign to a timer
      sounds: [
        'Bell',
        'Triumph',
        'LevelUp',
        'Winning',
      ],

      // WORK TIMER
      work: {
        name: 'work',
        duration: 1500000, // mseconds - 25 min default - 
        sound: 'Triumph',
      },

      // BREAK TIMER
      break: {
        name: 'break',
        duration: 300000, // mseconds - 5 min default
        sound: 'Bell',
      },

      // LONG BREAK TIMER
      longBreak: {
        name: 'longBreak',
        duration: 900000, // mseconds - 15 min default
        sound: 'Winning'
      },

      // SHIFT TO STYLED COMPONENTS?
      styles: {
        // for the play and pause inner icon and the minutes remaining display
        font: {
          color: 'var(--darkblue)',
        },
        // used for the progress bar background
        background: {
          background: 'var(--lightblue)',
        },
        titles: {
          workTitle: {
            color: 'var(--darkblue)',
            borderBottom: '6px solid var(--darkblue)',
          },
          breakTitle: {
            color: '',
            borderBottom: '',
          },
          longBreakTitle: {
            color: '',
            borderBottom: '',
          }
        },
        settings: {
          maxHeight: 0,
        },
        about: {
          maxHeight: 0,
          margin: 0,
          padding: '0 2em',
        }
      }
    }

  // -----------------------------------------------------------------------------------------
  //                                                                        `this` BINDINGS
  // -----------------------------------------------------------------------------------------

    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);

    this.timerFunc = this.timerFunc.bind(this);
    this.onTimerEnd = this.onTimerEnd.bind(this);

    this.timerStyler = this.timerStyler.bind(this);

    this.changeState = this.changeState.bind(this);

    this.handleSampleSound = this.handleSampleSound.bind(this);
  }

  // -----------------------------------------------------------------------------------------
  //                                                                      LIFE CYCLE EVENTS
  // -----------------------------------------------------------------------------------------
  setMouseDown() {
    this.setState({ mouseDown:true });
  }
  setMouseUp() {
    this.setState({ mouseDown:false });
  }

  // keep track of mouse down and mouse up, and any key press
  componentDidMount() {
    document.addEventListener('mousedown', this.setMouseDown);
    document.addEventListener('mouseup', this.setMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.setMouseDown);
    document.removeEventListener('mouseup', this.setMouseUp);

    // helping ensure there are no memory leaks
    let activeTimer = {...this.state.activeTimer};
    clearInterval(activeTimer.intervalID);
  }


  // -----------------------------------------------------------------------------------------
  //                                                                              FUNCTIONS
  // -----------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  //                                           timer function
  // --------------------------------------------------------------------------

  // timer function called every second while timer is on
  timerFunc() {
    // clone active timer
    const timer = {...this.state.activeTimer};

    // if timer ends
    if (timer.timeRemaining < 250) {
      this.onTimerEnd(timer);
      return;
    }

    timer.timeRemaining = Math.round(timer.untilTime - Date.now());

    // set new state
    this.setState({ activeTimer: timer }) 
  }

  // --------------------------------------------------------------------------
  //                                           timer ends
  // --------------------------------------------------------------------------

  onTimerEnd() {
    let activeTimer = {...this.state.activeTimer};
    clearInterval(activeTimer.intervalID);

    this.refs[this.state[activeTimer.name].sound].play();

    let nextTimer;
    if (activeTimer.name === 'work') {
      const pomodoros = this.state.pomodoros + 1;
      this.setState({pomodoros});
      if (pomodoros % this.state.pomodoroSet === 0) {
        nextTimer = {...this.state.longBreak};
      } else {
        nextTimer = {...this.state.break};
      }
    } else {
      nextTimer = {...this.state.work};
    }

    activeTimer.name = nextTimer.name;
    activeTimer.duration = nextTimer.duration;
    activeTimer.timeRemaining = activeTimer.duration;
    activeTimer.paused = true;

    this.setState({ activeTimer }, this.timerStyler);
  };


  // --------------------------------------------------------------------------
  //       timer styler - does not really belong here - styled components coming
  // --------------------------------------------------------------------------

  timerStyler() {

    const styles = JSON.parse(JSON.stringify(this.state.styles)); // deep clone
    const timerName = this.state.activeTimer.name;

    // empty out styles
    styles.titles = {
      workTitle: { color: '', borderBottom: '' },
      breakTitle: { color: '', borderBottom: '' },
      longBreakTitle: { color: '', borderBottom: '' }
    }

    if (timerName === 'work') { // reflect next work cycle
      styles.titles.workTitle.color = 'var(--darkblue)';
      styles.titles.workTitle.borderBottom = '6px solid var(--darkblue)';

      styles.font.color = 'var(--darkblue)';
      styles.background.background = 'var(--lightblue)';

    } else if (timerName === 'break') {
      styles.titles.breakTitle.color = 'var(--black)';
      styles.titles.breakTitle.borderBottom = '6px solid var(--babyblue)';

      styles.font.color = 'var(--black)';
      styles.background.background = 'var(--grey)';

    } else if (timerName === 'longBreak' ) {
      styles.titles.longBreakTitle.color = 'var(--green)';
      styles.titles.longBreakTitle.borderBottom = '6px solid var(--green)';
      styles.font.color = 'var(--green)';
      styles.background.background = 'var(--white)';

    }  

    // set new styles
    this.setState({ styles });
  }

  handleSampleSound(timer) {
    const sound = this.state[timer].sound;
    this.refs[sound].play();
  }

  changeState(args) {
    this.setState({...args}, () => args.activeTimer ? this.timerStyler() : '');
    // this will also check the styles if the active timer is interacted with...
  }

  // -----------------------------------------------------------------------------------------
  //                                                                              MAIN RENDER
  // -----------------------------------------------------------------------------------------

  render() {
    return (
      <div className="pomodoro">

        <View {...this.state} {...this.props} changeState={this.changeState} onTimerEnd={this.onTimerEnd} timerClone timerFunc={this.timerFunc} onSampleSound={this.handleSampleSound} onDeleteTool={this.props.onDeleteTool} />
        <audio src={Bell} ref="Bell" />
        <audio src={Triumph} ref="Triumph" />
        <audio src={LevelUp} ref="LevelUp" />
        <audio src={Winning} ref="Winning" />

      </div>
    );
  }
}

export default Pomodoro;
