/* eslint-disable indent */
import './Display.css';
import Term from './Term.js';

export const moveCursorLeft = (currPos) => {
    if (currPos === 0) {
        return 0;
    }
    return currPos - 1;
};

export const moveCursorRight = (currPos, lengthOfInput) => {
    if (currPos === lengthOfInput - 1) {
        return currPos;
    }
    return currPos + 1;
};

export const Display = ({ content, cursor, invalidExpr, history }) => {
    return (
        <div className="display">
            <div className="inputHistory">
                {history.map((evaluatedExpr, index) => {
                    return <div className="previousInput" key={index}>{evaluatedExpr}</div>;
                })}
            </div>
            <div className={`${invalidExpr ? 'invalid' : 'valid'}`}>
                {content.map((term, index) => <Term key={index} value={term} selected={index === cursor}/>)}
            </div>
            <div>

            </div>
        </div>
    );
};
