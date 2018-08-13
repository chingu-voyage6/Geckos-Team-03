import React, { Component } from 'react';
import './css/tools.css';
import './css/notetool.css';

class NoteTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.container.style.maxHeight = '14em';
      this.refs.container.style.opacity = 1;
      this.refs.container.style.marginBottom = '2em';
      this.refs.container.style.padding = '1.5em 1em';
    }, 0);

    // save settings for this particular note in local storage
    if (localStorage[this.props.thisTool.id]) {
      this.setState(JSON.parse(localStorage.getItem(this.props.thisTool.id)));
    }
  }

  componentDidUpdate() {
    // update local storage state when component is updated
    localStorage.setItem(this.props.thisTool.id, JSON.stringify(this.state));
  }

  handleInputChange() {
    this.setState({ input: this.refs.noteInput.value });
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

        <textarea placeholder='Enter a note for this task...' className='note-input' ref='noteInput' onChange={this.handleInputChange} value={this.state.input} />
      </div>
    )
  }
}

export default NoteTool;