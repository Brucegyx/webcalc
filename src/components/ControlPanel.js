import './ControlPanel.css';
import React from 'react';
import Button from './Button.js';
import ButtonArea from './ButtonArea';

const ControlPanel = 
({ 
  handleClick, 
  handlePanelSwitch, 
  inputKey, 
  base, 
  second, 
  mapping 
}) => {
  return (
    <div className="controlPanel">
      <div className="panelBar">
        <Button className={`base`} role={`menuBtn ${base ? 'active' : ''}`} footnote="" level="base" symbol="+/-" userIn="" handleClick={handlePanelSwitch}/>
        <Button className={`secondary`} role ={`menuBtn ${second ? 'active' : ''}`} footnote="" level="secondary" symbol="Fn" userIn="" handleClick={handlePanelSwitch}/>
      </div>
      {base && 
      <ButtonArea 
        panelName="base" 
        show={base}
        handleInput={handleClick}
        pressedKey={inputKey}
        keymap={mapping} 
      />}
      {second &&
      <ButtonArea 
        panelName="secondary"
        show={second}
        handleInput={handleClick}
        pressedKey={inputKey}
        keymap={mapping}
      />}
      
    </div>
  );
};

export default ControlPanel;
