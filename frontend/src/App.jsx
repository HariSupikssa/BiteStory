import React from 'react'
import Navbar from './components/Navbar'
import Home from './public/Home'
import About from './public/About'
// import Pages from './public/Pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
