import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../public/style.css';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

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
            <NavLink
              className={({ isActive }) => `navbar-item ${isActive ? 'is-active' : ''}`}
              to='/'
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => `navbar-item ${isActive ? 'is-active' : ''}`}
              to='/about'
            >
              About
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="">
              <div className="buttons ">
                <button className='button is-glassy'>
                  Login
                </button>
                {/* {!isAuth? (
                  <button className='button is-white' onClick={loginUser}>
                    Login
                  </button>
                ):
                (
                  <button className='button is-white' onClick={logoutUser}>
                    Log Out
                  </button>
                )

                }
                <a >Login</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;