import { useState } from 'react';
import { useEffect } from 'react';
import {useCookies} from 'react-cookie';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import '/public/style/NavBar.css';
import Cart from '../data/Cart.js';


function NavBar(props) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [cartCount, setCount] = useState(0);
  if (cookies.cartCount == undefined) {
    setCookie('cartCount', 0, {
      path:"/",
      maxAge: 60*60*24,
      secure: true,
      sameSite: "lax",
      });
  }
  else if (cookies.cartCount != cartCount){
  setCount(cookies.cartCount);
  }
  //console.log(cartCount);
  /*if(cookies.cartCount == undefined) {
    */
  //

  return (
    <div className="navBar">
        <Link to="/">
        <img id="logo"src="https://i.imgur.com/QgDLTbh.png" alt="" />
        </Link>
        <Link to="/shop" id="shopLink">Shop</Link>
        <div >
          <Link to="/checkout"className="cart">
          <img id="cartImg" src="https://i.imgur.com/t6hCcAb.png" alt="" />
          <p className="cartCount">{cartCount}</p>
          </Link>
        </div>
    </div>
  )
}

export default NavBar
