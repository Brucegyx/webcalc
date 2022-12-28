/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import Display from './components/Display';
import ButtonArea from './components/ButtonArea';
import Button from './components/Button';
import MenuBar from './components/MenuBar';
import { parse, evaluate } from 'mathjs';
import config from './configuration/config.json';

const KEYMAP = config.keymap;

const App = () => {
  const [invalidIn, setInvalidIn] = useState(false);
  const [calc, setCalc] = useReducer(calcReducer, { input: '' });
  const [activeBase, setActiveBase] = useState(true);
  const [activeSecondary, setActiveSecondary] = useState(false);
  const [whichKey, pressed] = useKeyPress(KEYMAP);

  const handlePanelSwitch = (e) => {
    const currPanelId = e.target.id;
    console.log(currPanelId);
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
  const handleInput = (keyInput, keymap) => {
    if (keyInput === "`") {
      setActiveBase(!activeBase);
      setActiveSecondary(!activeSecondary);
    } else {
      const panelKeyMap = activeBase ? keymap.base : keymap.secondary;
      if (Object.hasOwn(panelKeyMap, keyInput)) {
        const value = panelKeyMap[keyInput];
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
      }
    }
  };
  /*
    listen to keydown events, update state if mapped key is pressed
  */
  function useKeyPress (keymap) {
    const [pressed, setPressed] = useState(false);
    const [input, setInput] = useState('');
    // const panelKeyMap = activeBase ? keymap.base : keymap.secondary;
    useEffect(() => {
      const handleKeyDown = ({ key }) => {
        setInput(key);
        setPressed(true);
        handleInput(key, keymap);
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
    }, [keymap, activeBase, activeSecondary, input, pressed]);
    return [input, pressed];
  }

  return (
    <div className="App">
      <Wrapper>
      <MenuBar 
        handleInput={handleInput} 
        handlePanelSwitch={handlePanelSwitch} 
        base={activeBase} 
        second={activeSecondary} 
        mapping={KEYMAP}
      />
      <Display content={calc.input} invalidExpr={invalidIn}/>
      </Wrapper>
    </div>
  );
};

export default App;
