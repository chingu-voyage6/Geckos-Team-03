import React, { Component } from 'react';
import Pomodoro from './Components/Pomodoro';

class TaskInput extends Component {
  componentDidMount() {
    this.refs.input.focus();
  }
  render() { return (
      <input ref='input' className='main-input' autoFocus placeholder="What do you want to get done?" />
    )}
}
class AddProject extends Component {
  render() { return (
    <h3 className='btn-add-project'>Add Project</h3>
  )}
}

// to split into sub-components...
class TaskList extends Component {
  
  render() { 
    return (
    <div>

    {this.props.projects.map(project => {
      return (
        <div key={project.id} className='project-group'>
        <input ref={`toggle-${project.id}`} type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3 onClick={() => this.refs[`toggle-${project.id}`].checked = !this.refs[`toggle-${project.id}`].checked}>
          {project.name}
        </h3>
        <ul className='project-tasks'>
          {this.props.tasks.map(task => {
            if (task.project === project.id) { 
              return (
              <li key={task.id}>
                <input type="checkbox" /> <span className="checkTask" />
                <span className="task-item" onClick={this.props.onSelectTask} data-id={task.id}>
                  {task.name}
                </span>
                {task.selected ? <div className='task-border mwidth-100' /> : <div className='task-border' />}
              </li>
            )} else {
              return '';
            }
          })}
        </ul>
        </div>
      )
    })}

    </div>
  )}
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.uuidv4 = require('uuid/v4');
  }
  render() { 
    return (
    <div className="sidebar">
      {this.props.selectedTask && this.props.selectedTask.tools && this.props.selectedTask.tools.map(tool => <Pomodoro key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)}
      {/* And any other tools for this timer... */}
      {this.props.selectedTask &&
        (<h3 onClick={() => this.props.onAddTool(this.props.selectedTask.id)} className='add-tool'>+ Add Tool</h3>)
      }

    </div>
  )}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.uuidv4 = require('uuid/v4');
    this.chinguId = this.uuidv4();
    this.anotherId = this.uuidv4();
    this.state = {
      projects: [
        {
          name: 'Lucid Chingu project',
          id: this.chinguId,
        },
        {
          name: 'Another React app',
          id: this.anotherId,
        },
      ],
      tasks: [
        {
          name: 'Define our mvp for the project',
          id: this.uuidv4(),
          project: this.chinguId,
          selected: false,
          tools: [],
        },
        {
          name: 'Clear direction for design and workflow',
          id: this.uuidv4(),
          project: this.chinguId,
          selected: false,
          tools: [],
        },
        {
          name: 'Define the components we will pull together',
          id: this.uuidv4(),
          project: this.chinguId,
          selected: false,
          tools: [],
        },
        {
          name: 'Get audio working in React',
          id: this.uuidv4(),
          project: this.anotherId,
          selected: false,
          tools: [],
        },
        {
          name: 'Implement settings for global and each individual timer',
          id: this.uuidv4(),
          project: this.anotherId,
          selected: false,
          tools: [],
        },
      ]
    }
    this.handleSelectTask = this.handleSelectTask.bind(this);
    this.handleAddTool = this.handleAddTool.bind(this);
    this.handleDeleteTool = this.handleDeleteTool.bind(this);
  }

  handleSelectTask(e) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      task.id === e.target.dataset.id
        ? task.selected = !task.selected
        : task.selected = false;
    });
    this.setState({ tasks });
  }

  // for now it can just add a pomdoro component
  handleAddTool(taskID) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskID) task.tools.push({
        name: Pomodoro,
        id: this.uuidv4(),
      });
    });
    this.setState({ tasks });
  }

  handleDeleteTool(e) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.selected) {
        task.tools.forEach(tool => {
          if (tool.id === e.target.dataset.id) {
            const index = task.tools.indexOf(tool);
            task.tools.splice(index, 1);
          }
        })
      }
    });
    this.setState({ tasks });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <div className="header-group">
            <img alt="Lucid infinity logo" className="logo" src={require('./images/lucid-logo.png')} />
            <h1 className="header-title">Lucid</h1>
          </div>
        </div>
        <div className="app">
          <div className="main-content">

            <TaskInput />
            <AddProject />
            <TaskList {...this.state} onSelectTask={this.handleSelectTask}/>

          </div>

          {/* sidebar get passed whichever task is selected as a prop */}
          <Sidebar selectedTask={this.state.tasks.filter(task => task.selected)[0]} onAddTool={this.handleAddTool} onDeleteTool={this.handleDeleteTool} />

        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
