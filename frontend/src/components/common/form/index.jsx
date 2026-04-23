import React from "react";
import "./styles.scss";

const Form = ({ className, name, text, type, placeholder, value, onChange }) => (
  <div className={`form ${className}`}>
    <label htmlFor={name}><p>{text}</p></label>
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
  </div>
);

export default Form;
