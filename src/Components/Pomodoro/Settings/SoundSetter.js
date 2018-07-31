import React, { Component } from 'react';
import './css/soundSetter.css';

//  settings component - select a sound
class SoundSetter extends Component {
  constructor(props) {
    super(props);
    this.handleSoundSelect = this.handleSoundSelect.bind(this);
  }

  handleSoundSelect(sound) {

    // clone timer
    const timer = {...this.props.timer};
    timer.sound = sound;
    
    this.props.changeState({ [timer.name]: timer })
  }
  
  render() {
    return (
      <div className={`settings-item settings-sound settings-sound-${this.props.timer.name}`} >
        <a className='sound-prev-arrow noselect' onMouseDown={() => {
          let newIndex = this.props.sounds.indexOf(this.props.timer.sound);
  
          if (newIndex < 1 ) { newIndex = this.props.sounds.length-1; }
          else { newIndex-- }
  
          this.handleSoundSelect(this.props.sounds[newIndex]);
        }}>◀</a>
          <ul className='sound-list'>
            {this.props.sounds.map(sound => {
              return <li key={`${sound}`} className={sound === this.props.timer.sound ? 'sound-active' : 'sound-hidden'}><span className='sound-icon' onClick={() => this.props.onSampleSound(this.props.timer.name)}><i className="fas fa-volume-up"></i></span> {sound}</li>
            })}
          </ul>
        <a className='sound-next-arrow noselect' onMouseDown={() => {
          let newIndex = this.props.sounds.indexOf(this.props.timer.sound);
  
          if (newIndex === this.props.sounds.length - 1 ) { newIndex = 0; }
          else { newIndex++ }
  
          this.handleSoundSelect(this.props.sounds[newIndex]);
        }}>►</a>
        <div className='sound-progress'>
          {this.props.sounds.map((sound, index) => {
            return <div onClick={() => this.handleSoundSelect(this.props.sounds[index])} key={`${sound}`} className={sound === this.props.timer.sound ? 'sound-progress-tab sound-progress-tab-active' : 'sound-progress-tab'}></div>
          })}
        </div>
      </div>
    )
  }
}

export default SoundSetter;