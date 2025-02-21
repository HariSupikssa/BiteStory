import React from 'react';

const Navbar = ({ onHomeClick }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Recipe App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={onHomeClick}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Explore</a>
              </li>
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search recipes" aria-label="Search" />
                  <button className="btn" type="submit"><img src="" alt="search-icon" /></button>
                </form>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
