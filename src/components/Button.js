import "./Button.css";

const Button = ({className, footnote, symbol, handleClick}) => {
    return (
        <div id="buttonWrapper">
            <button className={className} onClick={handleClick}>
                {symbol}
            </button>
            <div id="footnote">
                {footnote}
            </div>
        </div>
    );
};

export default Button;