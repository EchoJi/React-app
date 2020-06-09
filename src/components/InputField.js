import React, { forwardRef, useImperativeHandle } from "react";

const InputField = forwardRef((props, ref) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value)
    setError("");
    props.onChange(event.target.name, event.target.value)
  }

  const validate = () => {
    //return true if is valid 
    //else return false

    if (props.validation === "required") {
        if (!value) {
            setError("This field is required");
            return false
        }
    }

    return true;
  }

  useImperativeHandle(ref, () => {
    return {
      validate: () => validate()
    }
  })

  return (
    <div className="input-wrapper">
      {props.label && (
        <label>{props.label}</label>
      )}
      <input
        placeholder={props.placeholder}
        name={props.name}
        onChange={(event) => handleChange(event)}
        type={props.type}
        value={props.value ? props.value : value}
        autoComplete={props.autoComplete}
      />
      {error && (
        <p className="error">{error}</p>
      )}
    </div>
  )
})

InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
  autoComplete: "off",
  validation: ""
}


export default InputField;