import "./Button.css";

const Button = ({className, symbol, handleClick}) => {
    return (
        <button id="button" className={className} onClick={handleClick}>
            {symbol}
        </button>
    );
};

export default Button;