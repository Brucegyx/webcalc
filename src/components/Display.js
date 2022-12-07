/* eslint-disable indent */
import './Display.css';

const Display = ({ content, invalidExpr }) => {
    return (
        <div className="display">
            <div className={`${invalidExpr ? 'invalid' : 'valid'}`}>{content}</div>
        </div>
    );
};

export default Display;
