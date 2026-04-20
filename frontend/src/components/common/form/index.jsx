import React from "react";
import "./styles.scss";

const Form = ({ className, name, text, type, placeholder }) => (
  <div className={`form ${className}`}>
    <label htmlFor={name}><p>{text}</p></label>
    <input type={type} name={name} placeholder={placeholder} />
  </div>
);

export default Form;
