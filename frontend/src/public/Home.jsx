import React from 'react';
import Login from '../public/Login'; // Import Login popup component

const Home = ({ openPopup }) => {
  return (
    <div>
      <h1>Home page</h1>

      {/* Conditionally render Login component based on openPopup state */}
      {openPopup && <Login />}
    </div>
  );
};

export default Home;
