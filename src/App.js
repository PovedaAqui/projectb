import React, { useEffect } from 'react';
import { useMoralis } from "react-moralis";
import console from "console-browserify";
import { ConnectButton } from '@web3uikit/web3';
import { Route, Router, Routes } from 'react-router-dom';
import MyBooks from './pages/MyBooks';

function App() {

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(() => {
  if (isAuthenticated) {
    // add your logic here
    console.log(user.get("ethAddress"));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated]);

  return (
      <Routes>
        <Route path='/' element={<MyBooks />} />
      </Routes>
  );
}

export default App;
