/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import { Display, moveCursorLeft, moveCursorRight } from './components/Display';
import ControlPanel from './components/ControlPanel';
import { parse, evaluate } from 'mathjs';
import config from './configuration/config.json';

const KEYMAP = config.keymap;

const App = () => {
  const [invalidIn, setInvalidIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [calc, setCalc] = useReducer(calcReducer, { input: [] });

  const [activeBase, setActiveBase] = useState(true);
  const [activeSecondary, setActiveSecondary] = useState(false);
  const whichKey = useKeyPress();
  /*
    handlePanelSwitch
    params: Event
    effect:
      switch to the next panel.
  */
  const handlePanelSwitch = (e) => {
    const currPanelId = e.target.id;
    switch (currPanelId) {
      case "base":
        if (activeBase === false) {
          setActiveBase(true);
          setActiveSecondary(false);
        }
        break;
      case "secondary":
        if (activeSecondary === false) {
          setActiveSecondary(true);
          setActiveBase(false);
        }
        break;
    }
  };

  /* 
    calcReducer:
      Reducer for handling inputs
      params: state: component state; action: tuple (value, type)
      effect:
        Depending on what action.type is, perform certain actions.
        - Delete input on Display
        - Clear all input on Display
        - Evaluate all inputs as an expression on Display and give results
        - Add user input to Display
  */
  function calcReducer (state, action) {
    let result = '';
    switch (action.type) {
      case 'delete':
        try {   
          const inputBefore = state.input.slice(0, cursorPosition);
          const inputAfter = state.input.slice(cursorPosition + 1, state.input.length);     
          const trimmedInput = inputBefore.concat(inputAfter);
          setCursorPosition(cursorPosition - 1);
          return { input: trimmedInput };
        } catch (err) {
          return { input: state.input };
        }
      case 'clear':
        setHistory([]);
        setCursorPosition(0);
        return { input: [] };
      case 'evaluate':
        try {
          const currentNode = parse(state.input.join('')); // need to change its param from array to string
          result = currentNode.evaluate();
          setHistory([...history, state.input.concat([action.value, result])]);
          setCursorPosition(0);
          return { input: [] };
        } catch (err) {
          setInvalidIn(true);
          console.log(err.message);
          setTimeout(() => setInvalidIn(false), 500);
          return { input: state.input };
        }
        // result = handleExprEval(state.input);
      case 'insert': {
        const inputBefore = state.input.slice(0, cursorPosition + 1);
        const inputAfter = state.input.slice(cursorPosition + 1, state.input.length);
        const insertedInput = inputBefore.concat([action.value], inputAfter);
        setCursorPosition(moveCursorRight(cursorPosition, insertedInput.length));
        return { input: insertedInput };
      }
    }
  }

  const dispatch = (value) => {
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
        setCalc({ value, type: 'insert' });
    }
  };

  /* 
  handleClickInput:
    Param: html value clicked
    Effect:
      process direct operation by clicking
  */
  const handleClickInput = (clickValue) => {
    dispatch(clickValue);
  };

  /*
  handleKeyboardInput:
    Param: keyboard input value
    Effect:
      look up corresponding operation by pressed key in the KEYMAP 
  */
  const handleKeyboardInput = (keyInput) => {
    switch (keyInput) {
      case "ArrowLeft":
        setCursorPosition(moveCursorLeft(cursorPosition));    
        break;
      case "ArrowRight":
        setCursorPosition(moveCursorRight(cursorPosition, calc.input.length));
        break;
      case "`":
        setActiveBase(!activeBase);
        setActiveSecondary(!activeSecondary);
        break;
      default: {
        const panelKeyMap = activeBase ? KEYMAP.base : KEYMAP.secondary;
        if (Object.hasOwn(panelKeyMap, keyInput)) {
          const value = panelKeyMap[keyInput];
          dispatch(value);
        }  
      }
    }
  };
  
  /*
    useKeyPress:
      Custom hook
      Params: A keybind map imported from config file
      Effects:
        Set up keyup keydown events listeners for keyboard input,
        sync with 'base' and 'secondary' panel states and key input states
        Will call 'handleInput()' for further processing input values.
  */
  function useKeyPress () {
    const [pressed, setPressed] = useState(false);
    const [input, setInput] = useState('');
    // const panelKeyMap = activeBase ? keymap.base : keymap.secondary;
    useEffect(() => {
      const handleKeyDown = (event) => {
        event.preventDefault();
        const key = event.key;
        setInput(key);
        setPressed(true);
        handleKeyboardInput(key);
      };
      const handleKeyUp = ({ key }) => {
        setInput('');
        setPressed(false);
      };
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, [activeBase, activeSecondary, input, pressed]);
    return input;
  }

  // render page
  return (
    <div className="App">
      <Wrapper>
      <ControlPanel 
        handleClick={handleClickInput} 
        handlePanelSwitch={handlePanelSwitch} 
        base={activeBase} 
        second={activeSecondary} 
        inputKey={whichKey}
        mapping={KEYMAP}
      />
      <Display content={calc.input} cursor={cursorPosition} invalidExpr={invalidIn} history={history}/>
      </Wrapper>
    </div>
  );
};

export default App;
