import React from 'react';
import { TextField } from '@mui/material';
import clsx from 'clsx';

import styles from './TextField.module.scss';

//input
const InputBaseClasses = {
  root: styles.InputBaseRoot,
  focused: styles.InputBaseFocused,
  disabled: styles.InputBaseDisabled,
  error: styles.InputBaseError,
};

//label
const InputLabelClasses = {
  root: styles.LabelRoot,
  focused: styles.LabelFocused,
  disabled: styles.LabelDisabled,
  error: styles.LabelError,
  required: styles.LabelRequired,
};

//error
const FormHelperTextClasses = {
  root: styles.HelperTextRoot,
  error: styles.HelperTextError,
};

const BaseInputField = React.forwardRef((props, ref) => {
  const { variant, iconStart, iconEnd, InputPropClasses, ...others } = props;

  return (
    <TextField
      {...others}
      variant={variant}
      ref={ref}
      InputLabelProps={{ shrink: true, classes: InputLabelClasses }}
      FormHelperTextProps={{ classes: FormHelperTextClasses }}
    />
  );
});

export const LineTextField = React.forwardRef((props, ref) => {
  const { error, InputProps, helperText, className, ...others } = props;

  return (
    <BaseInputField
      {...others}
      ref={ref}
      variant="standard"
      className={clsx(styles.InputField, styles.LineTextField, className)}
      InputProps={{
        classes: {
          ...InputBaseClasses,
        },

        //ben ngoai truyen them "InputProps" => phai rai ...InputProps
        ...InputProps,
      }}
      error={error}
      helperText={error ? helperText : ''}
    />
  );
});
export const ContainedTextField = React.forwardRef((props, ref) => {
  const { error, InputProps, helperText, className, ...others } = props;

  return (
    <BaseInputField
      {...others}
      ref={ref}
      variant="outlined"
      className={clsx(styles.InputField, styles.ContainedTextField, className)}
      InputProps={{
        classes: {
          ...InputBaseClasses,
          notchedOutline: styles.NoutchedOutline,
        },
        ...InputProps,
      }}
      error={error}
      helperText={error ? helperText : ''}
    />
  );
});
