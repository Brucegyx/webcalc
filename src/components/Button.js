import './Button.css';

const Button = ({ className, level, footnote, symbol, handleClick }) => {
  return (
    <div id="buttonWrapper">
        <button className={className} id={level} onClick={handleClick}>
            {symbol}
        </button>
        <div id="footnote">
            {footnote}
        </div>
    </div>
  );
};

export default Button;
