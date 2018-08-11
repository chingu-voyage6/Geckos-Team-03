import React, { Component } from 'react';
import './app.css';
import TaskInput from './Components/TaskInput';
import ProjectInput from './Components/ProjectInput';
import TaskList from './Components/TaskList';
import Sidebar from './Components/Sidebar';

// main App component contains all state and overarching functions

class App extends Component {
  constructor(props) {
    super(props);

    this.uuidv4 = require('uuid/v4');
    // demo project id
    this.chinguDemoId = this.uuidv4();

    this.state = {
      projects: [
        {
          name: 'Lucid Chingu project',
          id: this.chinguDemoId,
        }
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
          project: this.chinguDemoId,
          selected: false,
          tools: [],
        },
        {
          name: 'Clear direction for design and workflow',
          id: this.uuidv4(),
          project: this.chinguDemoId,
          selected: false,
          tools: [],
        },
        {
          name: 'Define the components we will pull together',
          id: this.uuidv4(),
          project: this.chinguDemoId,
          selected: false,
          tools: [],
        },
      ]
    }

    // THIS BINDINGS
    this.handleSelectTask = this.handleSelectTask.bind(this);
    this.handleAddTool = this.handleAddTool.bind(this);
    this.handleDeleteTool = this.handleDeleteTool.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleMoveTask = this.handleMoveTask.bind(this);
  }

  // LIFE CYCLE EVENTS

  // load local storage state, if any
  componentDidMount() {
    if (localStorage.lucidState) this.setState(JSON.parse(localStorage.getItem('lucidState')));
  }

  componentDidUpdate() {
    localStorage.setItem('lucidState', JSON.stringify(this.state));
  }

  // toggles whether the task passed in is selected, and deselects all other tasks
  handleSelectTask(e) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      task.id === e.target.dataset.id
        ? task.selected = !task.selected
        : task.selected = false;
    });
    this.setState({ tasks });
  }

  // adds a tool to selected task (for now just a pomodoro timer)
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

  // deletes the tool with the id passed in from the selected task
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

  // adds a new empty project to the list
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

  // removes a project and all of its contained tasks from the list
  handleDeleteProject(projectId) {
    // remove project
    const projects = [...this.state.projects];
    const selectedProject = projects.filter(project => project.id === projectId);
    const index = projects.indexOf(selectedProject[0]);
    projects.splice(index, 1);

    // remove all contained tasks
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.project === projectId) {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
      }
    });

    this.setState({ projects, tasks });
  }

  // deletes a task from the list
  handleDeleteTask(taskId) {
    const tasks = [...this.state.tasks];
    const selectedTask = tasks.filter(task => task.id === taskId);
    const index = tasks.indexOf(selectedTask[0]);
    tasks.splice(index, 1);
    this.setState({ tasks });
  }

  // adds a new task to the top of the list
  handleAddTask(e, taskName, projectId = '') {
    e.preventDefault();
    if (taskName === "") {
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.unshift({
      name: taskName,
      id: this.uuidv4(),
      project: projectId,
      selected: false,
      tools: [],
    });

    this.setState({ tasks });
  }

  // CURRENTLY DISCONNECTED
  // when a task is moved (dragged), state should reflect this
  handleMoveTask(taskId, projectId) {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskId) task.project = projectId;
    });
    // this.setState({ tasks });
  }

  render() {
    return (
        <div className="app">
          <div className="main-content">
            <TaskInput 
              onAddTask={this.handleAddTask} 
            />
            <TaskList {...this.state} 
              onSelectTask={this.handleSelectTask} 
              onDeleteProject={this.handleDeleteProject} 
              onDeleteTask={this.handleDeleteTask} 
              onMoveTask={this.handleMoveTask} 
              onProjectAddTask={this.handleAddTask}
            />
            <ProjectInput 
              onAddProject={this.handleAddProject} 
            />
          </div>
          <Sidebar 
            selectedTask={this.state.tasks.filter(task => task.selected)[0]} 
            onAddTool={this.handleAddTool} 
            onDeleteTool={this.handleDeleteTool}
          />
        </div>
    );
  }
}

export default App;