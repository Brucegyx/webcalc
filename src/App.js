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
  const [history, setHistory] = useState([]);
  const [calc, setCalc] = useReducer(calcReducer, { input: '' });

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
        return { input: state.input.slice(0, -1) };
      case 'clear':
        return { input: '' };
      case 'evaluate':
        try {
          const currentNode = parse(state.input);
          result = currentNode.evaluate();
          setHistory([...history, state.input + action.value + result]);
          return { input: '' };
        } catch (err) {
          setInvalidIn(true);
          console.log(err.message);
          setTimeout(() => setInvalidIn(false), 500);
          return { input: state.input };
        }
        // result = handleExprEval(state.input);
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
      <Display content={calc.input} invalidExpr={invalidIn} history={history}/>
      </Wrapper>
    </div>
  );
};

export default App;
