import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './public/Home';
import About from './public/About';
import Login from './public/Login';
import Explore from './components/Explore';
import Recipe from "./components/Recipe";

const PrivateRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

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
        {/* Public Routes */}
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Route>


        {/* Fallback Route (Optional) */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirects to Home if route doesn't exist */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;