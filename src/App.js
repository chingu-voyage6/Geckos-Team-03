import React, { Component } from 'react';

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
            <input className='main-input' placeholder="What do you want to get done?" />

            <h3 className='btn-add-project'>Add Project</h3>

            <h3 className='project-title'>Lucid Chingu Project</h3>
            <ul className='project-tasks'>
              <li className='project-task-completed'>Define our MVP for the project</li>
              <li className='project-selected'>Clear direction for design and workflow</li>
              <li>Define the individual components we will pull together</li>
            </ul>

            <h3 className='project-title'>Another React App</h3>
            <ul className='project-tasks'>
              <li className='project-task-completed'>Get audio working in React</li>
              <li>Implement settings for global and each individual timer</li>
            </ul>


            </div>
          <div className="sidebar">
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          </div>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
