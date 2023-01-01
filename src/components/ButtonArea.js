import "./ButtonArea.css";
import Button from "./Button.js";
import { useEffect, useState } from "react";
const btnSyms = {
  base: [
    ['1', '2', '3', '+', 'dl'],
    ['4', '5', '6', '-', '('],
    ['7', '8', '9', '*', ')'],
    ['.', '0', 'C', '/', '=']
  ],
  secondary: [
    ['sqrt', '^', 'ln(', 'e^', 'dl']
  ]
};

const ButtonArea = ({ panelName, show, handleInput, pressedKey, keymap }) => {
  const [buttonName, setButtonName] = useState("");
  useEffect(() => {
    if (pressedKey.length > 0 && pressedKey in keymap[panelName]) {
      setButtonName(keymap[panelName][pressedKey]);
    }
    return () => {
      setButtonName("");
    };
  }, [pressedKey]);
  
  function createFootnote (symbol) {
    let panelKeyMap = {};
    if (panelName === "base") {
      panelKeyMap = keymap.base;
    } else if (panelName === "secondary") {
      panelKeyMap = keymap.secondary;
    }
    const ind = Object.values(panelKeyMap).findIndex((val) => val === symbol);
    let ftnote = Object.keys(panelKeyMap)[ind];
    if (ftnote === 'Backspace') ftnote = '<';
    return ftnote;
  }  
  const handleMouseClick = (e) => {
    const value = e.target.innerHTML;
    handleInput(value);
  }; 
  
  const buttonList = btnSyms[panelName].flat().map((sym, i) => 
    <Button key={i}
    footnote={createFootnote(sym)}
    role="fnBtn"
    symbol={sym}
    userIn={buttonName}
    handleClick={handleMouseClick}
    />
  );
  return (
      <div className="btnArea">
          { buttonList }
      </div>
  );
};

export default ButtonArea;
