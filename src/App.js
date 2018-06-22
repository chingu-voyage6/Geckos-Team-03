import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="logo-text">LUCID</h1>
        <img alt="Lucid infinity logo" className="logo" src={require('./images/lucid-logo.png')} />
      </div>
    );
  }
}

export default App;
