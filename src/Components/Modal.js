import React, { Component } from 'react';
import './css/modal.css';

class Modal extends Component {
  componentDidMount() {
    setTimeout(() => this.refs.modalOverlay.style.opacity = 1, 0);
  }

  render() {
    return (
    <div className='modal-overlay' ref='modalOverlay' onClick={
      (e) => e.target.className === 'modal-overlay' ? this.props.onToggle() : ''}
    >
      <div className='modal-content'>
        Are you sure you want to delete the {this.props.taskOrProject} ‘{this.props.target.name}’{
          this.props.taskOrProject === 'project' && ', and all of its tasks'
        }?
        
        <div className='modal-buttons'>
          <span className='btn-modal btn-modal-cancel' onClick={this.props.onToggle}>Cancel</span>
          <span className='btn-modal btn-modal-delete' onClick={() => this.props.onDelete(this.props.taskOrProject, this.props.target)}>Delete</span>
        </div>
      </div>
    </div>
  )}
}

export default Modal;