import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './public/Home';
import Login from './public/Login';
import Register from './public/Register';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); // track current page (login/register)

  const handleSignUpClick = () => {
    setCurrentPage('register'); // Show Register page
  };

  const handleLoginClick = () => {
    setCurrentPage('login'); // Show Login page
  };

  return (
    <div>
      <Navbar />
      <Home />
      {currentPage === 'login' ? (
        <Login onSignUpClick={handleSignUpClick} />
      ) : (
        <Register onLoginClick={handleLoginClick} />
      )}
    </div>
  );
};

export default App;
