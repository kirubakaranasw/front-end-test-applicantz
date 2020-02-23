import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    //JOI validation not working for (username === re-type-username and password === re-type-password) - so as a quick fix -- START
    if (name === "repassword" || name === "reusername") {
      const fieldV = name === "repassword" ? "passwordF" : "usernameF";
      const valueStoreV = localStorage.getItem(fieldV);
      if (valueStoreV !== value) {
        return error ? error.details[0].message : null;
      } else return null;
      //JOI validation not working for (username === re-type-username and password === re-type-password) - so as a quick fix -- END
    } else return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    //JOI validation not working for (username === re-type-username and password === re-type-password) - so as a quick fix -- START
    if (input.name === "username")
      localStorage.setItem("username", input.value);
    if (input.name === "passwordF")
      localStorage.setItem("passwordF", input.value);
    if (input.name === "usernameF")
      localStorage.setItem("usernameF", input.value);
    //JOI validation not working for (username === re-type-username and password === re-type-password) - so as a quick fix -- END

    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderButton(label, styleButton = "") {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary form-control"
        style={styleButton}
      >
        {label}
      </button>
    );
  }

  renderInput(
    name,
    label,
    type = "text",
    styleLabel = "",
    styleInput = "",
    styleError = ""
  ) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
        styleLabel={styleLabel}
        styleInput={styleInput}
        styleError={styleError}
      />
    );
  }
}

export default Form;
