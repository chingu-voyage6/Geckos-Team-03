import React, { Component } from 'react';
import './css/modal.css';

class Modal extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        Are you sure you want to delete the {this.props.taskOrProject} ‘{this.props.name}’{
          this.props.taskOrProject === 'project' && ', and all of its tasks'
        }?
        
        <div className='modal-buttons'>
          <span className='btn-modal btn-modal-cancel'>Cancel</span>
          <span className='btn-modal btn-modal-delete'>Delete</span>
        </div>
      </div>
    </div>
  )}
}

export default Modal;