import React from 'react';
import PropTypes from 'prop-types';

const LengthDisplay = props => (
  <div className="option-wrap">
    <h2 id={`${props.type}-label`}>{props.title}</h2>
    <div className="adjust-wrap">
      <button 
        onClick={()=>{props.decrement(props.type)}}
        id={`${props.type}-decrement`}
      ></button>
      <h3 id={`${props.type}-length`}>{props.length}</h3>
      <button 
        onClick={()=>{props.increment(props.type)}}
        id={`${props.type}-increment`}
      ></button>
    </div>
  </div>
)

LengthDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
}

export default LengthDisplay;