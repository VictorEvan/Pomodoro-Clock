import React from 'react';
import PropTypes from 'prop-types';

const Timer = props => (
  <div className="timer-wrap">
    <h2 id="timer-label">
      {props.isOutputtingSession ?
        "Session" : "Break"
      }
    </h2>
    <div id="time-left">
      {props.isOutputtingSession ?
        props.sessionOutput :
        props.breakOutput
      }
    </div>
  </div>
)

Timer.propTypes = {
  isOutputtingSession: PropTypes.bool.isRequired,
  sessionOutput: PropTypes.string,
  breakOutput: PropTypes.string
}

export default Timer;