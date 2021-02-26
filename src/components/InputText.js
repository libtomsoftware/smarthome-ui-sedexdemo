import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

const styles = theme => ({
  textField: {
    padding: "6px 0"
  },
  fieldMessage: {
    color: theme.palette.error.main
  }
});

export const InputText = withStyles(styles)(props => {
  const {
    autoFocus,
    classes,
    fullWidth,
    helperText,
    label,
    value,
    type,
    disabled,
    maxLength,
    variant,
    margin,
    onChange,
    touched,
    error
  } = props;
  const [readOnly, setReadOnly] = useState(true);

  function onFocus() {
    setReadOnly(false);
  }

  return (
    <div>
      <TextField
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        helperText={helperText}
        label={label}
        value={value}
        type={type || "text"}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        className={classes.textField}
        margin={margin}
        variant={variant}
        touched={touched.toString()}
        inputProps={{
          readOnly: readOnly || false,
          maxLength: maxLength || 255
        }}
      />
      {touched && error && (
        <span className={classes.fieldMessage}>{error}</span>
      )}
    </div>
  );
});
