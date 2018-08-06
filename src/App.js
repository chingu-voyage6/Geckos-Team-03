import React, { Component } from 'react';
import Pomodoro from './Components/Pomodoro';
import Dragula from 'react-dragula';

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
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleBlur() {
    this.setState({ inputValue: '' });
  }

  render() { return (
    <div>
      <form onSubmit={e => {
        this.props.onAddProject(e, this.state.inputValue);
        this.refs.projectInput.blur();
        this.setState({ inputValue: '' });
      }}>
        <div className='btn-add-project-contain'><input onBlur={this.handleBlur} ref='projectInput' className='btn-add-project' placeholder='Add Project' value={this.state.inputValue} onChange={ this.handleInputChange } /></div>
      </form>
    </div>
  )}
}

// to split into sub-components...
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.setMaxHeights = this.setMaxHeights.bind(this);
  }
  
  componentDidMount() {
    this.setMaxHeights();
  }

  componentDidUpdate() {
    this.setMaxHeights();
  }

  setMaxHeights() {
    if (this.refs.unsortedTasksGroup){
      this.refs.unsortedTasksList.style.maxHeight = 
          `${this.refs.unsortedTasksList.scrollHeight}px`;
      this.refs.unsortedTasksGroup.style.maxHeight = 
          `${this.refs.unsortedTasksList.scrollHeight + 70}px`;
          // this does not work, it doesn't compute the actual value - so just add 70px
          // `${this.refs.unsortedTasksGroup.scrollHeight}px`;
    }

    this.props.projects.forEach(project => {
      this.refs[`${project.id}-list`].style.maxHeight = 
          `${this.refs[`${project.id}-list`].scrollHeight}px`;
      this.refs[project.id].style.maxHeight = 
          `${this.refs[`${project.id}-list`].scrollHeight + 120}px`;
          // `${this.refs[project.id].scrollHeight}px`;
    })
  }

  dragulaDecorator = () => {
    const projects = [...this.props.projects];
    const containers = [this.refs.unsortedTasksList];
    projects.forEach(project => containers.push(this.refs[`${project.id}-list`]));

    if (containers.length > 0) {
      let options = { containers };
      Dragula(options)
        .on('drag', () => {
          this.setMaxHeights();
        })
        .on('drop', (el) => {
          this.setMaxHeights();
          if (!el) return;
          const taskId = el.dataset.id;
          let projectId;
          el.dataset.id === 'unsortedTasksList' 
            ? projectId = '' 
            : projectId = el.parentNode.dataset.id;

          this.props.onMoveTask(taskId, projectId);
        })
        .on('over', () => {
          this.setMaxHeights();
        })
        .on('shadow', () => {
          this.setMaxHeights();
        })
        .on('out', () => {
          this.setMaxHeights();
        });
    }
  }
  
  render() {

    return (
    <div ref={this.dragulaDecorator}>

        <div ref='unsortedTasksGroup' className='project-group'>
            <input type="checkbox" className='toggle-collapse' name='toggle-collapse' />
            <h3>
              Unsorted tasks
            </h3>
        <ul ref='unsortedTasksList' data-id='unsortedTasksList' className='project-tasks'>

          {this.props.tasks.map(task => {
            if (task.project === '') { 
              return (
              <li ref={task.id} key={task.id} data-id={task.id}>
                <input type="checkbox" /> <span className="checkTask" />
                <span className="task-item" onClick={this.props.onSelectTask} data-id={task.id}>
                  {task.name}
                </span>

                {/* <div className='drag-button'><i class="fas fa-grip-vertical"></i></div> */}

                <div className='delete-button' onClick={() => {
                  this.refs[task.id].style.opacity = 0;
                  setTimeout(() => this.props.onDeleteTask(task.id), 300);
                }}>✕</div>

                {task.selected ? <div className='task-border mwidth-100' /> : <div className='task-border' />}
              </li>
            )} else {
              return '';
            }
          })}

        </ul>
      </div>

    {this.props.projects.map(project => {
      return (
        <div ref={project.id} key={project.id} className='project-group'>
        <input ref={`toggle-${project.id}`} type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3 onClick={() => this.refs[`toggle-${project.id}`].checked = !this.refs[`toggle-${project.id}`].checked}>
          {project.name}
        </h3>

        <div className='project-add-task-button' onClick={() => {
          this.refs[`${project.id}-form`].style.maxHeight = this.refs[`${project.id}-list`].scrollHeight + 'px';
          this.refs[`${project.id}-form`].querySelector('input').focus();
        }}>
          ✕
        </div>

        <div className='delete-button' onClick={() => {
          this.refs[project.id].style.maxHeight = 0;
          this.refs[project.id].style.margin = '0 0 0 -1em';
          this.refs[project.id].style.opacity = 0;
            
          setTimeout(() => this.props.onDeleteProject(project.id), 300);
          }}>✕</div>

          <form ref={`${project.id}-form`}><input type="text" className='project-add-task' placeholder="Enter a task name" /></form>

        <ul ref={`${project.id}-list`} data-id={project.id} className='project-tasks'>
          {this.props.tasks.map(task => {
            if (task.project === project.id) { 
              return (
              <li ref={task.id} key={task.id} data-id={task.id}>
                <input type="checkbox" /> <span className="checkTask" />
                <span className="task-item" onClick={this.props.onSelectTask} data-id={task.id}>
                  {task.name}
                </span>

                <div className='delete-button' onClick={() => {
                  this.refs[task.id].style.opacity = 0;
                  setTimeout(() => this.props.onDeleteTask(task.id), 300);
                }}>✕</div>

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

  componentWillUnmount() {
    console.log('sidebar-gone');
  }

  render() { 
    return (
    <div className="sidebar">
      <div ref="sidebarContent" className="sidebar-content">
        {!this.props.selectedTask && <h3 className='side-info'>Click a task to reveal tools</h3>}
        {this.props.selectedTask && this.props.selectedTask.tools && this.props.selectedTask.tools.map(tool => <Pomodoro key={tool.id} thisTool={tool} onDeleteTool={this.props.onDeleteTool} />)}
        {/* And any other tools for this timer... */}
        {this.props.selectedTask &&
          (<div onClick={() => this.props.onAddTool(this.props.selectedTask.id)} className='btn-add-tool'>Add Tool</div>)
        }
      </div>
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
    this.handleMoveTask = this.handleMoveTask.bind(this);
    this.handleProjectAddTask = this.handleProjectAddTask.bind(this);
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

  handleAddTask(e, taskName) {
    e.preventDefault();
    if (taskName === "") {
      return;
    }
    const tasks = [...this.state.tasks];
    // add a task to the top of the array
    tasks.unshift({
      name: taskName,
      id: this.uuidv4(),
      project: '',
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

  handleProjectAddTask(projectId) {
    this.setState({ projectAddTask: projectId});
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
            <TaskList {...this.state} onSelectTask={this.handleSelectTask} onDeleteProject={this.handleDeleteProject} onDeleteTask={this.handleDeleteTask} onMoveTask={this.handleMoveTask} onProjectAddTask={this.handleProjectAddTask}/>
            <AddProject onAddProject={this.handleAddProject} />

          </div>

          {/* sidebar get passed whichever task is selected as a prop */}
          <Sidebar selectedTask={this.state.tasks.filter(task => task.selected)[0]} onAddTool={this.handleAddTool} onDeleteTool={this.handleDeleteTool}/>

        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
