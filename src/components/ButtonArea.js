import "./ButtonArea.css";

const ButtonArea = ({children}) => {
    return (
        <div className="btnArea">
            {children}
        </div>
    );
};

export default ButtonArea;