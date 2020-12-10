import React from 'react';
// MUI Core
import TextField from '@material-ui/core/TextField';


const FormPasswordFieldNoError = (props) => {
    return (
        <TextField
            fullWidth
            inputRef={props.register}
            label="Password"
            name="password"
            size="small"
            type="password"
            variant="outlined"
        />
    );
};

const FormPasswordFieldWithError = (props) => {
    return (
        <TextField
            fullWidth
            inputRef={props.register}
            label="Password"
            name="password"
            size="small"
            type="password"
            variant="outlined"
            error
            helperText="Minimum 8 characters required"
        />
    );
};

const FormPasswordField = (props) => {
    if (props.error) {
        return <FormPasswordFieldWithError {...props} />
    }
    return <FormPasswordFieldNoError {...props} />
}

export default FormPasswordField;
