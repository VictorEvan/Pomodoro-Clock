import React from 'react';
import PropTypes from 'prop-types';

const Toggles = props => (
  <div className="toggles">
    <button 
      id="start_stop"
      onClick={props.toggleCountdown}
    >
      {props.isCountingDown ?
        "Stop" : "Start"
      }
    </button>
    <button 
      id="reset"
      onClick={props.reset}
    >Reset</button>
  </div>
)

Toggles.propTypes = {
  toggleCountdown: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  isCountingDown: PropTypes.bool.isRequired
}

export default Toggles;