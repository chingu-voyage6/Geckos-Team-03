import React, { Component } from 'react';
import Pomodoro from './Components/Pomodoro';

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
    <div className='project-group'>
        <input type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3>
          Lucid Chingu Project
          <div className='options-icon'>
            <img src={require('./images/options-icon.svg')} alt='options' />
          </div>
        </h3>

      <ul className='project-tasks'>
        <li>
          <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Define our MVP for the project
          </span>
          <div className='task-border' />
        </li>
        <li>
          <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Clear direction for design and workflow
          </span>
          <div className='task-border' />
        </li>
        <li onClick={e => [...e.target.parentElement.children].filter(el=> el.classList.contains('task-border'))[0].classList.add('mwidth-100')}>
        <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Define the components we will pull together
          </span>
          {/* Here would go 'if project task is selected then add in this div' */}
          <div className='task-border' />
        </li>
      </ul>
  </div>

  <div className='project-group'>
        <input type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3>
          Another React App
          <div className='options-icon'>
            <img src={require('./images/options-icon.svg')} alt='options' />
          </div>
        </h3>

      <ul className='project-tasks'>
        <li>
          <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Get audio working in React
          </span>
          <div className='task-border' />
        </li>
        <li>
        <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Implement settings for global and each individual timer
          </span>
          <div className='task-border' />
        </li>
      </ul>
    </div>
    </div>
  )}
}

class Sidebar extends Component {
  render() { return (
    <div className="sidebar">
      <h2 className='sidebar-main-title'>Clear direction for design and workflow</h2>
      <Pomodoro />
      {/* And any other tools for this timer... */}
      <h3 className='add-tool'>Add Tool</h3>

    </div>
  )}
}

class App extends Component {
  render() {
    return (
      // most of these divs will turn into actual components
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
            <TaskList />

          </div>

          <Sidebar />

        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
