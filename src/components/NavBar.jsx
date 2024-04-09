import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import '/public/style/NavBar.css';
import Cart from '../data/Cart.js';


function NavBar(props) {

  

  return (
    <div className="navBar">
        <Link to="/">
        <img id="logo"src="https://i.imgur.com/QgDLTbh.png" alt="" />
        </Link>
        <Link to="/shop" id="shopLink">Available Birds</Link>
        <div >
          <Link to="/checkout"className="cart">
          <img id="cartImg" src="https://i.imgur.com/t6hCcAb.png" alt="" />
          <p className="cartCount">{Cart[0]}</p>
          </Link>
        </div>
    </div>
  )
}

export default NavBar
