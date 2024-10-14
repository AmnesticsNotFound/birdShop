import { useState, useEffect} from 'react';
import { useRef } from 'react';
import {useCookies} from 'react-cookie';
import React from "react";
import { useParams } from "react-router-dom";
import Catalog from '../data/Catalog.js';
import Cart from '../data/Cart.js';
import '/public/style/Checkout.css';

//THE USEEFFECTS COULD HAVE BEEN AVOIDED BY USING USING INLINE JS IN JSX
function Checkout() {
    
    const [cookies, setCookie, removeCookie] = useCookies();
    const [cartS, setCart] = useState(cookies.cart);
    
    let totalCost = 0;
    
   function lowerQuantity(item) {
    
        if ( item.quantity > 1) {
            ////console.log("lowered");
            return -1;
            
        }
        else {
            //if the current amount is too small, reveal error msg
            let x = document.querySelector("#tooSmall");
            x.style.visibility = "visible";
            
           
            return 0;
        }
   }
//used for increasing the quantity of selected product
   function increaseQuantity(item) {
    
    if ( item.quantity < item.max) {
        ////console.log("lowered");
        return 1;
        
    }
    else {
        //if the current amount is too large, reveal error msg
        let y = document.querySelector("#tooLarge");
        y.style.visibility = "visible";
        return 0;
    }
}

//called when attempting to modify quantity. determines if decrease or increase function is to be called. 
// if quantity of a product changes(countModifier), it will also update the count and cart cookies
    function updateQuantity(e) {
        //
        let x = document.querySelector("#tooLarge");
        x.style.visibility = "hidden";
        x = document.querySelector("#tooSmall");
        x.style.visibility = "hidden";
        let tmpCart = cartS;
        let item = cartS.find(elem => elem.name == e.target.name);
        //console.log(item)
        //let cart = document.querySelector(".cartCount");
        let quantityElement = document.getElementsByName(item.name);
        let countModifier = 0;
        //console.log(quantityElement)
        if (e.target.id == "left") {
             countModifier = lowerQuantity(item);
            
        }
        else if (e.target.id == "right"){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            countModifier = increaseQuantity(item);
        }
        if (countModifier != 0) {
        //console.log(cookies.cartCount)
        setCookie('cartCount', cookies.cartCount + parseInt(countModifier) , {
            path:"/",
            maxAge: 60*60*24,
            secure: true,
            sameSite: "lax",
            });
            tmpCart = cartS.map((elem, index) => {
            
                if (elem.name == item.name) {
                    ////console.log(elem);
                    elem.quantity = parseInt(elem.quantity) + parseInt(countModifier);
                    
                }
                //cart.innerText = cartS[0] - 1;
                return elem;
            })
        setCookie('cart', tmpCart, {
            path:"/",
            maxAge: 60*60*24,
            secure: true,
            sameSite: "lax",
            });

            setCart(tmpCart);
        
        
        //console.log(cartS);
        }
        
        
        
    }
    // removes item if the user chooses
    function removeItem(e) {
        let x = document.querySelector("#tooLarge");
        x.style.visibility = "hidden";
        x = document.querySelector("#tooSmall");
        x.style.visibility = "hidden";
        let itemIndex = cartS.findIndex((elem) => elem.name == e.target.name);
        let tmpCart = cartS.map((elem) => {
            return elem;
        })
        tmpCart.splice(itemIndex,1);
        setCookie('cartCount', cookies.cartCount - parseInt(cookies.cart[itemIndex].quantity) , {
            path:"/",
            maxAge: 60*60*24,
            secure: true,
            sameSite: "lax",
            });
        setCookie('cart', tmpCart, {
            path:"/",
            maxAge: 60*60*24,
            secure: true,
            sameSite: "lax",
            });
        setCart(tmpCart);
        
    }


return (
    <div id="page">
    <div className="main">
    <div id="column1">
        <h1>Name</h1>
        {
            cartS ? cartS.map((elem, index)=> {
                //console.log(cartS);
                
                    return (
                        <h2 key={elem.key}>{elem.name}</h2>
                    )
                
            }):console.log("Empty Cart")
        }
    </div>
    <div id="column2">
        <h1>Quantity</h1>
        {
            
            cartS ? cartS.map((elem, index)=> {
                
                    return (
                        <div key={elem.key} id="quantityModifiers">
                            <img  id="left" name={elem.name} onClick = {updateQuantity}/>
                            <h2>{elem.quantity}</h2>
                            <img  id="right" name={elem.name} onClick = {updateQuantity}/>
                            <img  name={elem.name} id = "xImg" onClick={removeItem}/>
                        </div>
                    )
                
            }): null
        }
    </div>
    <div id="column3">
        <h1>Price</h1>
        {
            cartS ? cartS.map((elem, index)=> {
                
                    totalCost = totalCost + (elem.quantity * elem.price);
                    return (
                        <h2 key={elem.key}>{elem.price}</h2>
                    )
                
                   
            }) : null
        }
        <h1 id="totalElem">${totalCost}</h1>
        <button>Proceed to Payment</button>
    </div>
   
    </div>
    <h3 id="tooLarge">Not that many available</h3>
    <h3 id="tooSmall">Use the X icon to remove from cart</h3>
    </div>
    
)
}
export default Checkout;