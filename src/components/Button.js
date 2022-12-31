import './Button.css';
import { useState } from 'react';

const Button = ({ role, footnote, level, symbol, userIn, handleClick }) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleMouseDown = (e) => {
    if (role.includes('menuBtn')) {
      handleClick(e);
    } else {
      setIsActive(true);
      handleClick(e);
    }
  };

  const handleMouseUp = (e) => {
    if (role === 'fnBtn') {
      setIsActive(false);
    }
  };
  return (
    <div className={` ${role} ${isActive ? 'active' : ''}`} >
        <button tabIndex="-1" className="btn" id={level} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {symbol}
        </button>
        <div id="footnote">
            {footnote}
        </div>
    </div>
  );
};

export default Button;
