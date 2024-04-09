import { useState } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavBar from './NavBar.jsx'
import '/public/style/App.css';
import Cart from '../data/Cart.js';

function App() {
  

  return (
    <>
    <NavBar></NavBar>
      
    <Outlet></Outlet>
      
    </>
  )
}

export default App

//<Link to="/shop">Click here to go to Shop</Link>
//<Outlet />
     