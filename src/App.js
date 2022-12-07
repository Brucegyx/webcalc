/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import Display from './components/Display';
import ButtonArea from './components/ButtonArea';
import Button from './components/Button';
import { evaluate } from 'mathjs';
import config from './configuration/config.json';

const btnSyms = [
  ['1', '2', '3', '+', 'dl'],
  ['4', '5', '6', '-', '('],
  ['7', '8', '9', '*', ')'],
  ['.', '0', 'C', '/', '=']
];

const KEYMAP = config.keymap;
const App = () => {
  const [calc, setCalc] = useReducer(calcReducer, { input: '' });
  const [whichKey, pressed] = useKeyPress(KEYMAP);
  // reducer for the state
  function calcReducer (state, action) {
    let result = '';
    switch (action.type) {
      case 'delete':
        return { input: state.input.slice(0, -1) };
      case 'clear':
        return { input: '' };
      case 'evaluate':
        result = evaluate(state.input);
        return { input: state.input + action.value + result };
      default:
        return { input: state.input + action.value };
    }
  }

  const handleInput = (value) => {
    switch (value) {
      case 'dl':
        setCalc({ value, type: 'delete' });
        break;
      case 'C':
        setCalc({ value, type: 'clear' });
        break;
      case '=':
        setCalc({ value, type: 'evaluate' });
        break;
      default:
        setCalc({ value, type: '' });
    }
  };
  const handleMouseClick = (e) => {
    const value = e.target.innerHTML;
    handleInput(value);
  };
  /*
    listen to keydown events, update state if mapped key is pressed
  */
  function useKeyPress (keymap) {
    const [pressed, setPressed] = useState(false);
    const [input, setInput] = useState('');
    useEffect(() => {
      const handleKeyDown = ({ key }) => {
        if (Object.hasOwn(keymap, key)) {
          setInput(key);
          setPressed(true);
          handleInput(keymap[key]);
        }
      };
      const handleKeyUp = ({ key }) => {
        if (Object.hasOwn(keymap, key)) {
          setInput('');
          setPressed(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, [keymap, input, pressed]);
    return [input, pressed];
  }
  function createFootnote (symbol) {
    const ind = Object.values(KEYMAP).findIndex((val) => val === symbol);
    let ftnote = Object.keys(KEYMAP)[ind];
    if (ftnote === 'Backspace') ftnote = '<';
    return ftnote;
  }
  const footnoteArr = btnSyms.flat().map((sym) => createFootnote(sym));
  return (
    <div className="App">
      <Wrapper>
        <ButtonArea>
          {
            btnSyms.flat().map((sym, i) => {
              return (
                <Button key={i}
                  footnote={footnoteArr[i]}
                  className={sym}
                  symbol={sym}
                  handleClick={handleMouseClick}
                />);
            })
          }
        </ButtonArea>
        <Display content={calc.input}/>
      </Wrapper>
    </div>
  );
};

export default App;
