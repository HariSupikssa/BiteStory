import React, { useState } from 'react';
import './Login.css'; // Your custom styles

const Login = ({ onSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="login-card p-4 shadow-lg rounded">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Log In</button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{' '}
          <span 
            onClick={onSignUpClick} 
            className="text-primary" 
            style={{ cursor: 'pointer' }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
