import "./ButtonArea.css";
import Button from "./Button.js";

const ButtonArea = ({ panelName, show, handleInput, keymap }) => {
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
  return (
    
      <div className="btnArea">
          {
              btnSyms[panelName].flat().map((sym, i) => {
                return (
                  <Button key={i}
                  footnote={createFootnote(sym)}
                  className={`fnBtn ${sym}`}
                  symbol={sym}
                  handleClick={handleMouseClick}
                  />);
              })
          }
      </div>
  );
};

export default ButtonArea;
