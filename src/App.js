import React, { Component } from 'react';
import Grid from './components/Grid'

class App extends Component {
  render() {
    return (
      <div className="App">
      	<div>
	      	<h1>REACTMAN</h1>
	        <Grid />
        </div>
        <p>Try using keyboard to control! You can use the arrow buttons next to the joystick too. Created by <a href="https://kevinchambers.net">Kevin Chambers</a>. Code available at <a href="https://github.com/kchambers0/pacman" target="_blank" rel="noopener noreferrer">github</a>.</p>
      </div>
    );
  }
}

export default App;
