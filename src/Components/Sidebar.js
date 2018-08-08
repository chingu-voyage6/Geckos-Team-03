import React, { Component } from 'react';
import Pomodoro from './Pomodoro';

// sidebar to display tools for a selected timer
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.uuidv4 = require('uuid/v4');
  }

  render() { 
    return (
    <div className="sidebar">
      <div ref="sidebarContent" className="sidebar-content">
        {!this.props.selectedTask && <h3 className='side-info'>Click a task to reveal tools</h3>}
        {this.props.selectedTask && this.props.selectedTask.tools && this.props.selectedTask.tools.map(tool => <Pomodoro key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)}
        {this.props.selectedTask &&
          (<div onClick={() => this.props.onAddTool(this.props.selectedTask.id)} className='btn-add-tool'>Add Tool</div>)
        }
      </div>
    </div>
  )}
}

export default Sidebar;