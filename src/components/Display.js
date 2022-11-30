import "./Display.css";

const Display = ({content}) => {
    return (
        <div className="display">
            <div>{content}</div>
        </div>
    );
};

export default Display;