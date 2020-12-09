/* 

    Implementation is based from the blog entry at:
    https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

*/

import React, { createContext, useReducer } from 'react';
import jwt_decode from "jwt-decode";


// The default user context is a user that is not logged in
var default_user_context = {
    loggedIn: false,
    userName: null,
    jwtAccessToken: null,
    decodedJwt: null,
}

// Below is a valid user for testing purposes. The JWT is the example from https://jwt.io
var dummy_user = {
    loggedIn: true,
    userName: "john.doe@example.com",
    jwtAccessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    decodedJwt: null,
}


/* 

    Extract the expiry from the JWT and see it it is still valid 

    Note on JWT validation: the front-end is considered "un-trusted" and 
    therefore we will rely on the backend services to do proper JWT validation 
    with each request. For the UI, only the data in the JWT is relevant, so as 
    long as it is a properly formatted JWT, we are good.

*/
const is_jwt_expired = (jwt_token) => {
    let decoded_token = jwt_decode(jwt_token);
    console.log("Decoded Token: ", { decoded_token });
    let current_date = new Date();
    console.log("current_date.getTime(): ", current_date.getTime())
    if (decoded_token.exp) {
        if (decoded_token.exp * 1000 < current_date.getTime()) {
            console.log("Token expired.");
        } else {
            console.log("Valid token");
            return true;
        }
    } else {
        console.warn("No exp field in JWT. Assuming it is valid");
        return true;
    }
    return false;
}


// Retrieve the cached user login session from localStorage and checks if it is still valid
const is_user_session_valid = (current_user_context) => {
    current_user_context.userName = localStorage.getItem('username') || null;
    current_user_context.jwtAccessToken = localStorage.getItem('accessToken') || null;
    if (current_user_context.jwtAccessToken) {
        current_user_context.loggedIn = is_jwt_expired(current_user_context.jwtAccessToken);
        if (current_user_context.loggedIn) {
            current_user_context.decodedJwt = jwt_decode(current_user_context.jwtAccessToken)
        }
    } else {
        current_user_context.loggedIn = false
    }
    console.log("current_user_context: ", { current_user_context });
    return current_user_context;
}


// Create Context Object - for local testing you could pass in the dummy_user in stead of the default_user_context
export const UserContext = createContext(is_user_session_valid(default_user_context));
const { Provider } = UserContext;


// Create a provider for components to consume and subscribe to changes
export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        console.log("UserContextProvider(): state=", {state})
        console.log("UserContextProvider(): action=", {action})
        var newState = state;
        switch (action.type) {
            case 'login':
                newState = {
                    loggedIn: true,
                    userName: action.username,
                    jwtAccessToken: action.jwt,
                    decodedJwt: null,
                }
                localStorage.setItem('username', action.username);
                localStorage.setItem('accessToken', action.jwt);
                return is_user_session_valid(newState);
            case 'logout':
                newState = default_user_context;
                localStorage.removeItem('accessToken');
                return is_user_session_valid(newState);
            default:
                return newState;
        };
    }, is_user_session_valid(default_user_context));
    console.log("UserContextProvider(): [POST-PROCESSING] state=", {state})
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};


