import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from 'react-live-clock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{padding:"20px"}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Selamat datang di Website saya</h1>
          <h1 className="App-title">Alhamdulillah</h1>
        </header>
        <p className="App-intro">
          To get started, edit dsgit<code>src/App.js</code> and save to reload.
        </p>
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
          <p>hallo</p>
      </div>
    );
  }
}

export default App;
