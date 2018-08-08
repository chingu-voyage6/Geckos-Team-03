import React, { Component } from 'react';

class ProjectInput extends Component {
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

export default ProjectInput;