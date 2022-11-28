import React, {useState} from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import Display from './components/Display';
import ButtonArea from './components/ButtonArea';
import Button from './components/Button';

const btnSyms = [
  ["+", "-", "/", "x"],
  [7, 8, 9,"C"],
  [4, 5, 6, "("],
  [1,2,3,"="],
  [0,".","+/-","("]
];
const App = () => {
  let [calc, setCalc] = useState(
    {
      input: ""
    }
  );
  const handleInput = (e)=>{
    var value = e.target.innerHTML;
    setCalc(
      {
        input: String(calc.input + value)
      }
    );
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
