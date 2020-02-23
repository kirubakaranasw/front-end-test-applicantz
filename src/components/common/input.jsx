import React from "react";

const Input = ({
  name,
  label,
  error,
  styleLabel,
  styleInput,
  styleError,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={styleLabel}>
        {label}
      </label>
      <input
        {...rest}
        style={error ? { border: "1px solid #ee4444" } : styleInput}
        name={name}
        id={name}
        className="form-control"
      />
      {error && (
        <div className="alert alert-danger" style={styleError}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
