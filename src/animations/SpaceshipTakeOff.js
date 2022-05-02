import './SpaceshipTakeOff.scss'
import  spaceship  from '../images/spaceship.png';
import React, { useState, useEffect } from 'react';

function SpaceShipTakeOff (props) {
  const [disappear,setDisappear] = useState('')
  const { launch } = props;
  useEffect(()=>{
    if (launch){ 
      setTimeout(function() {
      setDisappear('disappear')
    }, 2700);
    }
  })
  
  return (
    <div class={`spaceshipTakeoff-container ${disappear} ${launch ? 'launch' :''} `}>
      <div class={`spaceship ${launch ? 'launch' :''}`}>
        <img src={spaceship} alt='spaceship' title =' spaceship'></img>
      </div>
    </div>
  )
}

export default SpaceShipTakeOff;
