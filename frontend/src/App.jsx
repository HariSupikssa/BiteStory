import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './public/Home';
import About from './public/About';
import Login from './public/Login';
// import Register from './public/Register';
import WithAuth from './public/WithAuth';// Import the HOC

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/register' element={<Register />} /> */}
          {/* <Route path='/profile' element={withAuth(Profile)} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;