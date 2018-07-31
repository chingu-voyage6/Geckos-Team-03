import React, { Component } from 'react';

class TaskInput extends Component {
  render() { return (
      <input className='main-input' placeholder="What do you want to get done?" />
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
        <input type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3>
          {project.name}
        </h3>
        <ul className='project-tasks'>
          {this.props.tasks.map(task => {
            if (task.project === project.id) return (
              <li key={task.id}>
                <input type="checkbox" /> <span className="checkTask" />
                <span className="task-item" onClick={this.props.onSelectTask} data-id={task.id}>
                  {task.name}
                </span>
                {task.selected ? <div className='task-border mwidth-100' /> : <div className='task-border' />}
              </li>
            )
          })}
        </ul>
        </div>
      )
    })}

    </div>
  )}
}

class Sidebar extends Component {
  render() { return (
    <div className="sidebar">
      <h2 className='sidebar-main-title'>Clear direction for design and workflow</h2>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
    </div>
  )}
}

class App extends Component {
  constructor(props) {
    super(props);
    const uuidv4 = require('uuid/v4');
    this.chinguId = uuidv4();
    this.anotherId = uuidv4();
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
          id: uuidv4(),
          project: this.chinguId,
          selected: false,
        },
        {
          name: 'Clear direction for design and workflow',
          id: uuidv4(),
          project: this.chinguId,
          selected: false,
        },
        {
          name: 'Define the components we will pull together',
          id: uuidv4(),
          project: this.chinguId,
          selected: false,
        },
        {
          name: 'Get audio working in React',
          id: uuidv4(),
          project: this.anotherId,
          selected: false,
        },
        {
          name: 'Implement settings for global and each individual timer',
          id: uuidv4(),
          project: this.anotherId,
          selected: false,
        },
      ]
    }
    this.handleSelectTask = this.handleSelectTask.bind(this);
  }

  handleSelectTask(e) {
    console.log(e.target.dataset.id);
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      task.id === e.target.dataset.id
        ? task.selected = !task.selected
        : task.selected = false;
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

          <Sidebar />

        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
