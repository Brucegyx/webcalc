/* eslint-disable indent */
import './Display.css';

const Display = ({ content, invalidExpr, history }) => {
    return (
        <div className="display">
            <div className="inputHistory">
                {history.map((evaluatedExpr, index) => {
                    return <div key={index}>{evaluatedExpr}</div>;
                })}
            </div>
            <div className={`${invalidExpr ? 'invalid' : 'valid'}`}>
                {content}
            </div>
        </div>
    );
};

export default Display;
