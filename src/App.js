import React, { useContext } from 'react';
import LoginPage from './components/LoginPage';
import UserLandingPage from './components/UserLandingPage';
import {UserContext} from './context/user-context';


function App() {

  const user = useContext(UserContext);
  console.log("user: ", {user})

  return (
    user.state.loggedIn ? <UserLandingPage /> : <LoginPage />
  );
}

export default App;
