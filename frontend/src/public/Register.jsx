import React, { useState } from 'react';
import './Register.css'; // Your custom styles

const Register = ({ onLoginClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Registering with:', username, password);
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="register-card p-4 shadow-lg rounded">
        <h2 className="text-center mb-4">Register</h2>
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
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{' '}
          <span 
            onClick={onLoginClick} 
            className="text-primary" 
            style={{ cursor: 'pointer' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
