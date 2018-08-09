import React, { Component } from 'react';
import Dragula from 'react-dragula';
import './css/tasklist.css';

// controls rendering and animation for list of projects and tasks
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectAddTaskInput: '',
    }
    this.setMaxHeights = this.setMaxHeights.bind(this);
    this.handleProjectAddTaskChange = this.handleProjectAddTaskChange.bind(this);
    this.handleProjectAddTaskBlur = this.handleProjectAddTaskBlur.bind(this);
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
          `${this.refs.unsortedTasksList.scrollHeight + 120}px`;
    }

    this.props.projects.forEach(project => {
      this.refs[`${project.id}-list`].style.maxHeight = 
          `${this.refs[`${project.id}-list`].scrollHeight}px`;
      this.refs[project.id].style.maxHeight = 
          `${this.refs[`${project.id}-list`].scrollHeight + 120}px`;
    });
  }

  // dragula drag and drop - passed as a ref to containing div
  dragulaDecorator = () => {
    const projects = [...this.props.projects];
    const containers = [this.refs.unsortedTasksList];
    projects.forEach(project => containers.push(this.refs[`${project.id}-list`]));

    if (containers.length) {
      let options = { containers };
      // execute dragula and reset max height animations whenever a task is dragged around
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
    }
  }

  // controlled form input for adding task directly to a project
  handleProjectAddTaskChange(e) {
    this.setState({ projectAddTaskInput: e.target.value });
  }

  // if user clicks away from task input, it animates away and resets - smoothly
  handleProjectAddTaskBlur(projectId) {
    this.refs[`${projectId}-form`].style.maxHeight = 0;
    this.setState({ projectAddTaskInput: '' });
  }
  
  render() {

    return (
    <div ref={this.dragulaDecorator}>

      {/* Unsorted tasks list */}
      <div ref='unsortedTasksGroup' className='project-group'>
        <input ref="toggle-unsorted" type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3 onClick={() => this.refs['toggle-unsorted'].checked = !this.refs['toggle-unsorted'].checked}>
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

    {/* task lists for each project */}
    {this.props.projects.map(project => {
      return (
        <div ref={project.id} key={project.id} className='project-group'>
        <input ref={`toggle-${project.id}`} type="checkbox" className='toggle-collapse' name='toggle-collapse' />
        <h3 onClick={() => this.refs[`toggle-${project.id}`].checked = !this.refs[`toggle-${project.id}`].checked}>
          {project.name}
        </h3>

        <div className='project-add-task-button' onClick={() => {
          this.refs[`${project.id}-form`].style.maxHeight = this.refs[`${project.id}-form`].scrollHeight + 'px';
          this.setMaxHeights();
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

          <form ref={`${project.id}-form`} onSubmit={(e) => {
            this.props.onProjectAddTask(e, this.state.projectAddTaskInput, project.id);
            this.setState({ projectAddTaskInput: '' });
          }}><input value={this.state.projectAddTaskInput} onChange={this.handleProjectAddTaskChange} 
            onBlur={() => this.handleProjectAddTaskBlur(project.id)} 
            type="text" className='project-add-task' placeholder="Enter a task name" /></form>

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
                  this.refs[task.id].style.maxHeight = 0;
                  this.refs[task.id].style.marginBottom = 0;
                  this.refs[task.id].style.opacity = 0;
                  this.refs[task.id].style.overflow = 'hidden';
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

export default TaskList;