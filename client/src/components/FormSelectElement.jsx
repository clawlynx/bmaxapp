import React from "react";

function FormSelectElement({ name, labelText, list, defaultValue, onChange }) {
  return (
    <div className="form-row mb-0">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={defaultValue}
        className="form-select"
        onChange={onChange}
      >
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelectElement;
