import React, { Component } from 'react';
import './css/App.css';

import LengthDisplay from './components/LengthDisplay';
import Timer from './components/Timer';
import Toggles from './components/Toggles';

class App extends Component {

  state = {
    breakLength: 5,
    breakMillis: 300000,
    sessionLength: 25,
    sessionMillis: 1500000,
    breakOutput: null,
    sessionOutput: null,
    isCountingDown: false,
    isOutputtingSession: true
  }

  toggleCountdown = () => {
    this.setState({
      isCountingDown: !this.state.isCountingDown,
    });
    if (!this.state.isCountingDown) {
      // implement accurate timer 
      let start = new Date().getTime(), elapsed = '0.0';
      this.interval = setInterval(()=>{
        let time = new Date().getTime() - start;
        elapsed = Math.floor(time / 100) / 10;
        // everytime rounded elapsed is equal to elapsed - 1 second has passed
        if (Math.round(elapsed) === elapsed) {
          elapsed += '.0';
          this.sessionInterval();
        }
      },100);
    } else if (this.state.isCountingDown) {
      clearInterval(this.interval);
    }
  }

  sessionInterval = () => {
    this.setState({
      sessionOutput: this.getTime(this.state.sessionMillis, 1000),
      sessionMillis: this.state.sessionMillis - 1000
    }, () => {
      if (this.state.sessionMillis === 0) {
        clearInterval(this.interval);
        this.sound.currentTime = 0;
        this.sound.play();
        document.querySelector('#beep').play();
        this.setState({
          isOutputtingSession: false,
          sessionMillis: this.getMillis(this.state.sessionLength)
        },() => {
          this.interval = setInterval(this.breakInterval,1000);
        });
      }
    });
  }

  breakInterval = () => {
    this.setState({
      breakOutput: this.getTime(this.state.breakMillis, 1000),
      breakMillis: this.state.breakMillis - 1000
    }, () => {
      if (this.state.breakMillis === 0) {
        clearInterval(this.interval);
        this.sound.currentTime = 0;
        this.sound.play();
        this.setState({
          isOutputtingSession: true,
          breakMillis: this.getMillis(this.state.sessionLength)
        }, () => {
          this.interval = setInterval(this.sessionInterval,1000);
        });
      }
    });
  }

  componentDidMount = () => {
    this.sound = document.querySelector('#beep');
    this.setState({
      sessionOutput: this.getTime(this.state.sessionMillis),
      breakOutput: this.getTime(this.state.breakMillis)
    });
  }

  getMillis = (input) => input * 60000;

  getTime = (millis, decrement = 0) => {
    let totalMillis = millis - decrement;
    console.log("totalMillis: ", totalMillis);
    let totalSeconds = totalMillis / 1000;
    console.log("totalSeconds: ", totalSeconds);
    let minutes = Math.floor(totalSeconds / 60);
    console.log("minutes: ", minutes);
    let seconds = totalSeconds % 60;
    console.log("seconds: ", seconds);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  reset = () => {
    this.sound.pause();
    this.sound.currentTime = 0;
    if (this.state.isCountingDown) {
      clearInterval(this.interval);
    }
    this.setState({
      breakLength: 5,
      breakMillis: 300000,
      sessionLength: 25,
      sessionMillis: 1500000,
      isCountingDown: false,
      isOutputtingSession: true
    },() => {
      this.setState({
        sessionOutput: this.getTime(this.state.sessionMillis),
        breakOutput: this.getTime(this.state.breakMillis),
      });
    });
  }

  handleIncrement = type => {
    if (!this.state.isCountingDown) {
      this.setState( state => {
        if (state[`${type}Length`] !== 60) {
          return {
            [`${type}Length`]: this.state[`${type}Length`] + 1,
            [`${type}Output`]: this.getTime(this.state[`${type}Millis`] + 60000),
            [`${type}Millis`]: this.state[`${type}Millis`] + 60000
          }
        } else {
          return null;
        }
      });
    }
  }

  handleDecrement = type => {
    if (!this.state.isCountingDown) {
      this.setState( state => {
        if (state[`${type}Length`] !== 1) {
          return {
            [`${type}Length`]: this.state[`${type}Length`] - 1,
            [`${type}Output`]: this.getTime(this.state[`${type}Millis`] - 60000),
            [`${type}Millis`]: this.state[`${type}Millis`] - 60000
          }
        } else {
          return null;
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Pomodoro Clock</h1>
        <div className="options">
          <LengthDisplay
            title="Break Length"
            type="break"
            length={this.state.breakLength}
            increment={this.handleIncrement} 
            decrement={this.handleDecrement}
          />
          <LengthDisplay
            title="Session Length"
            type="session"
            length={this.state.sessionLength}
            increment={this.handleIncrement} 
            decrement={this.handleDecrement}
          />
        </div>
        <Timer 
          isOutputtingSession={this.state.isOutputtingSession}
          sessionOutput={this.state.sessionOutput}
          breakOutput={this.state.breakOutput}
        />
        <Toggles
          toggleCountdown={this.toggleCountdown}
          reset={this.reset}
        />
        <audio id="beep">
        <source src="https://freesound.org/data/previews/182/182351_1405956-lq.ogg" type="audio/ogg"/>
          <source src="https://freesound.org/data/previews/182/182351_1405956-lq.mp3" type="audio/mpeg"/>
        </audio>
      </div>
    );
  }
}

export default App;
