import './ControlPanel.css';
import React from 'react';
import Button from './Button.js';
import ButtonArea from './ButtonArea';

const ControlPanel = ({ handleInput, handlePanelSwitch, base, second, mapping }) => {
  return (
    <div className="controlPanel">
      <div className="panelBar">
        <Button className="menuBtn base" level="base" footnote="" symbol="+/-" handleClick={handlePanelSwitch}/>
        <Button className="menuBtn second" level="secondary" footnote="" symbol="Fn" handleClick={handlePanelSwitch}/>
      </div>
      {base && 
      <ButtonArea 
        panelName="base" 
        show={base}
        handleInput={handleInput}
        keymap={mapping}
      />}
      {second &&
      <ButtonArea 
        panelName="secondary"
        show={second}
        handleInput={handleInput}
        keymap={mapping}
      />}
      
    </div>
  );
};

export default ControlPanel;
