/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import Display from './components/Display';
import ControlPanel from './components/ControlPanel';
import { parse, evaluate } from 'mathjs';
import config from './configuration/config.json';

const KEYMAP = config.keymap;

const App = () => {
  const [invalidIn, setInvalidIn] = useState(false);
  const [calc, setCalc] = useReducer(calcReducer, { input: '' });
  const [activeBase, setActiveBase] = useState(true);
  const [activeSecondary, setActiveSecondary] = useState(false);
  const whichKey = useKeyPress();

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
  // reducer for the state
  function calcReducer (state, action) {
    let result = '';
    switch (action.type) {
      case 'delete':
        return { input: state.input.slice(0, -1) };
      case 'clear':
        return { input: '' };
      case 'evaluate':
        try {
          result = evaluate(state.input);
        } catch (err) {
          setInvalidIn(true);
          console.log(err.message);
          setTimeout(() => setInvalidIn(false), 500);
        }
        // result = handleExprEval(state.input);
        return { input: state.input + action.value + result };
      default:
        return { input: state.input + action.value };
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
        setCalc({ value, type: '' });
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
    if (keyInput === "`") {
      setActiveBase(!activeBase);
      setActiveSecondary(!activeSecondary);
    } else {
      const panelKeyMap = activeBase ? KEYMAP.base : KEYMAP.secondary;
      if (Object.hasOwn(panelKeyMap, keyInput)) {
        const value = panelKeyMap[keyInput];
        dispatch(value);
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
      const handleKeyDown = ({ key }) => {
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
      <Display content={calc.input} invalidExpr={invalidIn}/>
      </Wrapper>
    </div>
  );
};

export default App;
