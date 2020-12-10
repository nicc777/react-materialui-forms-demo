import React from 'react';
// MUI Core
import TextField from '@material-ui/core/TextField';


const FormEmailTextFieldNoError = (props) => {

    if(props.current_user){
        return (<TextField
            fullWidth
            inputRef={props.register}
            defaultValue={props.current_user}
            name="email"
            size="small"
            variant="outlined"
        />);
    }

    return (
        <TextField
            fullWidth
            inputRef={props.register}
            label="your-name@example.tld"
            name="email"
            size="small"
            variant="outlined"
        />
    );
};

const FormEmailTextFieldWithError = (props) => {
    return (
        <TextField
            fullWidth
            inputRef={props.register}
            label="your-name@example.tld"
            name="email"
            size="small"
            variant="outlined"
            error
            helperText="Invalid Email Address Format"
        />
    );
};

const FormEmailTextField = (props) => {
    if ( props.error ) {
        return <FormEmailTextFieldWithError {...props} />
    }
    return <FormEmailTextFieldNoError {...props} />
}

export default FormEmailTextField;
