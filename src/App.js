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
  render() { return (
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
        <li className='project-task'>
          <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Define our MVP for the project
          </span>
        </li>
        <li className='project-task project-task-selected'>
          <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Clear direction for design and workflow
          </span>
        </li>
        <li>
        <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Define the components we will pull together
          </span>
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
        <li className='project-task'>
          <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Get audio working in React
          </span>
        </li>
        <li>
        <input type="checkbox" /> <span className="checkTask" />
          <span className="task-item">
            Implement settings for global and each individual timer
          </span>
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
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
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
