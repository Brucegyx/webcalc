import React, {useState, useReducer} from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import Display from './components/Display';
import ButtonArea from './components/ButtonArea';
import Button from './components/Button';
import 'mathjs';
import {evaluate} from 'mathjs';

const btnSyms = [
  ["+", "-", "/", "*"],
  [7, 8, 9,"dl"],
  [4, 5, 6, "("],
  [1,2,3,")"],
  [0,".","C","="]
];
const App = () => {
  function calcReducer(state, action) {
    switch (action.type) {
      case "delete":
        return {input: ""}
      case "concat":
        //return {input: state["input"] + action.value}  

      default:
        return {input : state["input"] + action.value}
    }
    

  }
  const [calc, setCalc] = useReducer(calcReducer,
    {
      input: ""
    }
  );
  const handleInput = (e)=>{
    var value = e.target.innerHTML;
    console.log(typeof value);
    let clear = false;
    let result =0;
    switch (value) {
      case "dl":
        setCalc({value, type: "delete"});
      default:
        setCalc({value, type: ""});
    }
    
      
        
      
    
    
    
  }
  return (
    <div className="App">
      <Wrapper>
        <ButtonArea>
          {
            btnSyms.flat().map((sym, i) => {
              return(
                <Button key={i} className={sym} symbol={sym} handleClick={handleInput}/>);
            })
          } 
        </ButtonArea>
        <Display content={calc.input}/>
      </Wrapper>
    </div>
  );
}

export default App;
