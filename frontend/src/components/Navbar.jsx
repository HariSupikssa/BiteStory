import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../public/style.css';

const Navbar = ({ isAuth, setIsAuth }) => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/');
  };

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='container'>
        <div className="navbar-brand">
          <a
            role='button'
            className={`navbar-burger burger ${isOpen ? 'is-active' : ''}`}
            aria-label='menu'
            aria-expanded='false'
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <NavLink className={({ isActive }) => `navbar-item ${isActive ? 'is-active' : ''}`} to='/'>
              Home
            </NavLink>
            <NavLink className={({ isActive }) => `navbar-item ${isActive ? 'is-active' : ''}`} to='/about'>
              About
            </NavLink>
            {isAuth && (
              <NavLink className={({ isActive }) => `navbar-item ${isActive ? 'is-active' : ''}`} to='/explore'>
                Explore
              </NavLink>
            )}
          </div>
          <div className="navbar-end">
            <div className="buttons">
              {!isAuth ? (
                <NavLink className='button is-glassy' to='/login'>
                  Login
                </NavLink>
              ) : (
                <button className='button is-glassy' onClick={logoutUser}>
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
