import React, { useState, useEffect, useContext } from 'react';
// Modules
import { useForm } from 'react-hook-form';
// MUI Core
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
// Customized MUI Components
import FromEmailTextField from './FormEmailTextField';
import FromPasswordField from './FormPasswordField';
// Context
import { UserContext } from '../context/user-context';


const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3)
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginPage = (props) => {

  // Set our local state
  const [emailValidationError, setEmailValidationError] = useState(null);
  const [passwordValidationError, setPasswordValidationError] = useState(null);
  const [loginServerError, setLoginServerError] = useState(false);

  // Load the user context
  const user_context = useContext(UserContext);
  const { dispatch } = user_context;
  const [loginState, setLoginState] = useState(user_context.state.loggedIn);
  const [rememberMeChecked, setRememberMeChecked] = useState(user_context.state.rememberMe);

  // Consume react-hook-form
  const { register, errors, handleSubmit } = useForm();

  // Create validation ref for the email field
  let email_text_Field_ref = register({
    required: true,
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  });

  // Create a validation ref for the password field
  let password_text_field_ref = register({ required: true, maxLength: 1024, minLength: 8 });

  const classes = useStyles();

  // This function emulates submission to a remote server. To simulate incorrect credentials us the password "thisiswrong"
  const onSubmit = (data, e) => {
    if (data.password === "thisiswrong") {
      // Handle simulated incorrect password
      setLoginServerError(true);
    } else {
      // Setup our action. The JWT data is what you would expect as the end result from the authentication process.
      const action = {
        type: "login",
        username: data.email,
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBldGVyIFBhbiIsImlhdCI6MTUxNjIzOTAyMn0.oMnchyzE4rZOIbJElIDR_rs8ogDSXa8aOpmL1FAmYCc",
        rememberMe: rememberMeChecked,
      }
      dispatch(action);
      setLoginState(user_context.state.loggedIn);
    }
  };

  // Handle validation errors - set the violating component error state to true, while resetting fields that no longer has validation errors
  const onError = (errors, e) => {
    if (errors.password) {
      setPasswordValidationError(true);
    } else {
      if (passwordValidationError) {
        setPasswordValidationError(null);
      }
    }
    if (errors.email) {
      setEmailValidationError(true);
    } else {
      if (emailValidationError) {
        setEmailValidationError(null);
      }
    }
  };

  // If we are logged in, force a page refresh.
  if (loginState) {
    return window.location.href = "/";
  }

  // Remember me selection handler
  const rememberMeToggle = (event) => {
    setRememberMeChecked(event.target.checked);
  };

  return (
    <Container className={classes.container} maxWidth="xs">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FromEmailTextField
                error={emailValidationError}
                register={email_text_Field_ref}
                current_user={user_context.state.userName}
                {...props}
              />
            </Grid>
            <Grid item xs={12}>
              <FromPasswordField
                error={passwordValidationError}
                register={password_text_field_ref}
                {...props}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMeChecked}
                onChange={rememberMeToggle}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Remember me"
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" fullWidth type="submit" variant="contained" onClick={handleSubmit(onSubmit, onError)}>
            Log in
            </Button>
        </Grid>
        <Grid item xs={12}>
          {loginServerError ? <Alert severity="error">Login failed... Please check your credentials and try again</Alert> : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
