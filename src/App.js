import React, { Component } from 'react';
import TaskInput from './Components/TaskInput';
import ProjectInput from './Components/ProjectInput';
import TaskList from './Components/TaskList';
import Sidebar from './Components/Sidebar';

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
    this.handleMoveTask = this.handleMoveTask.bind(this);
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

  // for now it can just add a pomodoro component
  handleAddTool(taskID) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskID) task.tools.push({
        name: 'Pomodoro',
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
    const projects = [...this.state.projects];
    const selectedProject = projects.filter(project => project.id === projectId);
    const index = projects.indexOf(selectedProject[0]);
    projects.splice(index, 1);

    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.project === projectId) {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
      }
    });

    this.setState({ projects, tasks });
  }

  handleDeleteTask(taskId) {
    const tasks = [...this.state.tasks];
    const selectedTask = tasks.filter(task => task.id === taskId);
    const index = tasks.indexOf(selectedTask[0]);
    tasks.splice(index, 1);
    this.setState({ tasks });
  }

  handleAddTask(e, taskName, projectId = '') {
    e.preventDefault();
    if (taskName === "") {
      return;
    }
    const tasks = [...this.state.tasks];
    // add a task to the top of the array
    tasks.unshift({
      name: taskName,
      id: this.uuidv4(),
      project: projectId,
      selected: false,
      tools: [],
    });
    this.setState({ tasks });
  }

  // want to get this working, so that *project lists* reflect *state*
  handleMoveTask(taskId, projectId) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskId) task.project = projectId;
    });
    // this.setState({ tasks });
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
            <TaskList {...this.state} onSelectTask={this.handleSelectTask} onDeleteProject={this.handleDeleteProject} onDeleteTask={this.handleDeleteTask} onMoveTask={this.handleMoveTask} onProjectAddTask={this.handleAddTask}/>
            <ProjectInput onAddProject={this.handleAddProject} />

          </div>

          {/* sidebar gets passed whichever task is selected as a prop */}
          <Sidebar selectedTask={this.state.tasks.filter(task => task.selected)[0]} onAddTool={this.handleAddTool} onDeleteTool={this.handleDeleteTool}/>

        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
