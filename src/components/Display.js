import "./Display.css";

const Display = ({content}) => {
    return (
        <div className="display">
            <p>{content}</p>
        </div>
    );
};

export default Display;