import { React } from 'react';
import './Term.css';

const Term = ({ value, selected }) => {
  return (
    <div className={`term ${selected ? 'selected' : ''}`}>
      {value}
    </div>
  );
};

export default Term;
