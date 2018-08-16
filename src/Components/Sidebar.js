import React, { Component } from 'react';
import PomodoroTool from './PomodoroTool';
import NoteTool from './NoteTool';
import TodoTool from './TodoTool';
import './css/sidebar.css';

// sidebar to display tools for a selected timer
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToolOptions: false,
    }
  }

  render() { 
    return (
    <div className="sidebar">
      <div ref="sidebarContent" className="sidebar-content">
        {!this.props.selectedTask && <h3 className='side-info'>Click a task to reveal tools</h3>}
        {this.props.selectedTask && this.props.selectedTask.tools && this.props.selectedTask.tools.map(tool => {
          if (tool.name === 'PomodoroTool') {
            return (<PomodoroTool key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)
          } else if (tool.name === 'NoteTool') {
            return (<NoteTool key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)
          } else if (tool.name === 'TodoTool') {
            return (<TodoTool key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)
          }
          return '';
        })}
        {this.props.selectedTask &&
          (<div onClick={() => this.setState({ showToolOptions: !this.state.showToolOptions })} className={this.state.showToolOptions ? 'add-tool-field add-tool-open' : 'add-tool-field'}>
            <div className='add-tool-title'>Add Tool</div>
            <div className='add-tool-option' onClick={() => this.props.onAddTool(this.props.selectedTask.id, 'PomodoroTool')}>Pomodoro Timer</div>
            <div className='add-tool-option' onClick={() => this.props.onAddTool(this.props.selectedTask.id, 'NoteTool')}>Note</div>
            <div className='add-tool-option' onClick={() => this.props.onAddTool(this.props.selectedTask.id, 'TodoTool')}>Todo</div>
          </div>)
        }
        {/* () => this.props.onAddTool(this.props.selectedTask.id) */}
      </div>
    </div>
  )}
}

export default Sidebar;