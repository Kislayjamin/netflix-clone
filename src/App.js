import './App.css';
import Netflix from './Netflix'
import Navbar from './Navbar'
import React from 'react';
import { Navigate, Route, Routes, Router } from 'react-router';
import Rfc from './Rfc';
import NetflixImg from './Netflix.webp'
function App() {
  const navStyle = {
    "backgroundColor": "black",
    "height": "70px",
    "display": "flex",
    "flex": "right",
    "alignItems": "center",
  };
  //const img = {
  //"margin-top": "15px", 
  //"margin-left": "30px",
  //"height": "49px"
  //};
  return (
    <>
      <nav style={navStyle}>
        <div className="icon">
          <img src={NetflixImg} alt="Netflix-error" className='image' height={40} />
        </div>
        <div className='div'>
          <a href="#">Home</a>
          <a href="#">Popular</a>
          <a href="#">TV Shows</a>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Netflix />} />
        <Route path='/rfc' element={<Rfc />} />
      </Routes>
    </>
  );
}

export default App;
