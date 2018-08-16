import React, { Component } from 'react';
import './css/tools.css';

class TodoTool extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.refs.container.style.maxHeight = '14em';
      this.refs.container.style.opacity = 1;
      this.refs.container.style.marginBottom = '2em';
      this.refs.container.style.padding = '1.5em 1em';
    }, 0);
  }

  render() {
    return (
      <div ref='container' className='tool-container'>

        <div className='delete-button' data-id={this.props.thisTool.id} onClick={() => {
          this.refs.container.style.maxHeight = 0;
          this.refs.container.style.opacity = 0;
          this.refs.container.style.marginBottom = 0;
          this.refs.container.style.padding = '0 .5em';
          this.refs.container.style.borderBottom = '0px solid #fff';
          setTimeout(() => this.props.onDeleteTool(this.props.thisTool.id), 300)
        }}>✕</div>

        This will be a todo tool.
      </div>
    )
  }
}

export default TodoTool;