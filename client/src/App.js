import React, {Component} from 'react';

import './App.css';
import Photos from './components/Photos';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-title">Gallery</div>
        </div>
        <Photos />
      </div>
    );
  }
}

export default App;
