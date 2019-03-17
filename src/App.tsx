import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tables from './components/tables';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
            <Tables/>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
