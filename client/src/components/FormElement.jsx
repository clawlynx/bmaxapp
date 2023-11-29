import React from "react";

function FormElement({ type, name, labelText, defaultValue, onChange }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        value={defaultValue}
        onChange={onChange}
        required
      ></input>
    </div>
  );
}

export default FormElement;
