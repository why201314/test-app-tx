import React, { useState } from 'react';
import logo from './logo.svg';
import LoginPage from './LoginPage';
import './css/App.css';
import MuiTest from './MuiTest';
import PrimarySearchAppBar from './component/MyMenu'
import AppRouter from './component/AppRouter';
import SignIn from './component/SignIn';
import StickyFooter from './component/StickyFooter';
import APIClient from './component/utils/APIClient';



function App() {


  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <p>Welcome, {loggedInUser}!</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Render your data table or other components here */}
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
