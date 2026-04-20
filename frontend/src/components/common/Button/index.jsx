const Button = ({disabled, className, type, onClick, children }) => {
  return (
    <button disabled={disabled} className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
