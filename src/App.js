import React, { Component } from 'react';
import Pomodoro from './Components/Pomodoro';

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  } 

  componentDidMount() {
    this.refs.input.focus();
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() { return (
      <form onSubmit={(e) => {
        this.setState({ inputValue: '' })
        this.props.onAddTask(e, this.state.inputValue);
      }}>
        <input onChange={this.handleInputChange} value={this.state.inputValue} ref='input' className='main-input' autoFocus placeholder="What do you want to get done?" />
      </form>
    )}
}

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() { return (
    <div>
      <form onSubmit={e => {
        this.props.onAddProject(e, this.state.inputValue);
        this.setState({ inputValue: '' });
      }}>
        <div className='btn-add-project-contain'><input className='btn-add-project' placeholder='Add Project' value={this.state.inputValue} onChange={ this.handleInputChange } /></div>
      </form>
    </div>
  )}
}

// to split into sub-components...
class TaskList extends Component {
  
  render() {
    this.unsortedTasks = false;
    console.log('rerender!');
    this.props.tasks.forEach(task => {
      if (task.project === '') this.unsortedTasks = true;
    });
    return (
    <div>
    


      {this.unsortedTasks &&
        <div className='project-group'>
            <input type="checkbox" className='toggle-collapse' name='toggle-collapse' />
            <h3>
              Unsorted tasks
            </h3>
        <ul className='project-tasks'>

          {this.props.tasks.map(task => {
            if (task.project === '') { 
              return (
              <li key={task.id}>
                <input type="checkbox" /> <span className="checkTask" />
                <span className="task-item" onClick={this.props.onSelectTask} data-id={task.id}>
                  {task.name}
                </span>

                <div className='delete-button' onClick={() => this.props.onDeleteTask(task.id)}>✕</div>

                {task.selected ? <div className='task-border mwidth-100' /> : <div className='task-border' />}
              </li>
            )} else {
              return '';
            }
          })}

        </ul>
      </div>
      }

    {this.props.projects.map(project => {
      return (
        <div ref={project.id} key={project.id} className='project-group'>
        <input ref={`toggle-${project.id}`} type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3 onClick={() => this.refs[`toggle-${project.id}`].checked = !this.refs[`toggle-${project.id}`].checked}>
          {project.name}
        </h3>
        <div className='delete-button' onClick={() => {
          this.refs[project.id].style.maxHeight = 0;
          this.refs[project.id].style.margin = '0 0 0 -1em';
          this.refs[project.id].style.opacity = 0;

            
          setTimeout(() => this.props.onDeleteProject(project.id), 500);
          }}>✕</div>
        <ul className='project-tasks'>
          {this.props.tasks.map(task => {
            if (task.project === project.id) { 
              return (
              <li key={task.id}>
                <input type="checkbox" /> <span className="checkTask" />
                <span className="task-item" onClick={this.props.onSelectTask} data-id={task.id}>
                  {task.name}
                </span>

                <div className='delete-button' onClick={() => this.props.onDeleteTask(task.id)}>✕</div>

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
      {!this.props.selectedTask && <h3 className='side-info'>Click a task to reveal tools</h3>}
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
          name: 'Task without a project',
          id: this.uuidv4(),
          project: '',
          selected: false,
          tools: [],
        },
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
        {
          name: 'Added another task',
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
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
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

  handleDeleteTool(toolId) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.selected) {
        task.tools.forEach(tool => {
          if (tool.id === toolId) {
            const index = task.tools.indexOf(tool);
            task.tools.splice(index, 1);
          }
        })
      }
    });
    this.setState({ tasks });
  }

  handleAddProject(e, input) {
    e.preventDefault();
    if (input === "") {
      return;
    }
    const projects = [...this.state.projects];
    projects.push({
      name: input,
      id: this.uuidv4(),
    });
    this.setState({projects})
  }

  handleDeleteProject(projectId) {
    console.log('deleting project');
    const projects = [...this.state.projects];
    const selectedProject = projects.filter(project => project.id === projectId);
    const index = projects.indexOf(selectedProject[0]);
    projects.splice(index, 1);
    this.setState({ projects });
  }

  handleDeleteTask(taskId) {
    const tasks = [...this.state.tasks];
    const selectedTask = tasks.filter(task => task.id === taskId);
    const index = tasks.indexOf(selectedTask[0]);
    tasks.splice(index, 1);
    this.setState({ tasks });
  }

  handleAddTask(e, taskName) {
    e.preventDefault();
    if (taskName === "") {
      return;
    }
    const tasks = [...this.state.tasks];
    tasks.push({
      name: taskName,
      id: this.uuidv4(),
      project: '',
      selected: false,
      tools: [],
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

            <TaskInput onAddTask={this.handleAddTask} />
            <TaskList {...this.state} onSelectTask={this.handleSelectTask} onDeleteProject={this.handleDeleteProject} onDeleteTask={this.handleDeleteTask}/>
            <AddProject onAddProject={this.handleAddProject} />

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
