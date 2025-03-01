import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './public/Home';
import About from './public/About';
import Login from './public/Login';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
