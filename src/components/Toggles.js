import React from 'react';
import PropTypes from 'prop-types';

const Toggles = props => (
  <div className="toggles">
    <button 
      id="start_stop"
      onClick={props.toggleCountdown}
    >+||</button>
    <button 
      id="reset"
      onClick={props.reset}
    >Reset</button>
  </div>
)

Toggles.propTypes = {
  toggleCountdown: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default Toggles;