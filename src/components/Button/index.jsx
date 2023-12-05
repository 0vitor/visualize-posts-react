import "./style.css";

export const Button = ({ text, onClick, disabled }) => {
  return (
    <button 
    className="button-3"
    onClick={onClick}
    disabled={disabled}
    >
      {text}
    </button>
  );
};
