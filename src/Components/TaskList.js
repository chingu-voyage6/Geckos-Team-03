import React, { Component } from 'react';
import Dragula from 'react-dragula';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectAddTaskInput: '',
    }
    this.setMaxHeights = this.setMaxHeights.bind(this);
    this.handleProjectAddTaskChange = this.handleProjectAddTaskChange.bind(this);
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

  handleProjectAddTaskChange(e) {
    this.setState({ projectAddTaskInput: e.target.value });
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
            onBlur={() => this.refs[`${project.id}-form`].style.maxHeight = 0} 
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

export default TaskList;