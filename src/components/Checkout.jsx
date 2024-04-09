import { useState, useEffect} from 'react';
import { useRef } from 'react';
import React from "react";
import { useParams } from "react-router-dom";
import Catalog from '../data/Catalog.js';
import Cart from '../data/Cart.js';
import '/public/style/Checkout.css';

//THE USEEFFECTS COULD HAVE BEEN AVOIDED BY USING USING INLINE JS IN JSX
function Checkout() {
    const isInitialMount = useRef(true);
    const [cartS, setCart] = useState(Cart);
    let totalCost = 0;
    
/*
    useEffect(() => {
        let col = document.querySelector("#column1");
        let col2 = document.querySelector("#column2");
        let col3 = document.querySelector("#column3");
        let total = document.createElement("h1");
        total.id = "totalCost";
        cartS.map((elem, index)=> {
            
            if (index > 0 ) {
                
                
                console.log(col3);
    
                let name = document.createElement("h2");
                
                let div = document.createElement("div");
                div.classList.add("quantityDiv");
                let quantity = document.createElement("h2");
                console.log(cartS)
                quantity.setAttribute("name", elem.name);

                let left = document.createElement("img");
                let right = document.createElement("img");
                left.id = "left";
                left.setAttribute("name", elem.key);
                left.addEventListener("click", updateQuantity)

                right.id = "right";
                right.setAttribute("name", elem.key);
                right.addEventListener("click", updateQuantity)

                let x = document.createElement("img");
                x.classList.add("removeItem");
                x.id = elem.key;
                x.addEventListener("click", removeItem);

                div.appendChild(left);
                div.appendChild(quantity);
                div.appendChild(right);
                div.appendChild(x);
                

                let price = document.createElement("h2");

                name.innerText = elem.name;

                quantity.innerText = elem.quantity;
                


                price.innerText = elem.price * elem.quantity;

                //console.log(col);
                col.appendChild(name);
                col2.appendChild(div);
                col3.appendChild(price);
                totalCost = totalCost + (elem.price * elem.quantity);
                //console.log(totalCost);
                return elem;
            }
        })
        total.innerText = "$" + totalCost;
        col3.append(total);
    }, []);
    //possible fix to recreating elements

    useEffect(() => {
        if(isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            let total = 0;
        cartS.map((elem, index)=> {
            if (index > 0 ) {
                if (elem.quantity != 0) {
                    //console.log(elem.name)
                    let quantity = document.getElementsByName(elem.name);
                    //console.log(quantity[0].innerText);
                    quantity[0].innerText = elem.quantity;
                    return elem;
                }
                else {
                    let elemElement = document.querySelec
                }
                
            }

            
        })

        let totalElem = document.querySelector("#totalCost");
        //totalElem.innerText
        }
    
  }, [cartS]);
    
    */
    function updateQuantity(e) {
        //console.log("hi")
        let item = cartS.find(elem => elem.key == e.target.name);
        let cart = document.querySelector(".cartCount");
        let quantityElement = document.getElementsByName(item.name);
        if (e.target.id == "left" && item.quantity > 1) {
            //console.log("lowered");
            setCart(cartS.map((elem, index) => {
                if (index == 0) {
                    elem = elem - 1;
                    return elem;
                }
                if (elem.key == item.key) {
                    //console.log(elem);
                    elem.quantity = elem.quantity - 1;
                    
                }
                cart.innerText = cartS[0] - 1;
                return elem;
            }))
        }
        else if (e.target.id == "right" && item.quantity < item.max){
            setCart(cartS.map((elem, index) => {
                if (index == 0) {
                    elem = elem + 1;
                    return elem;
                }
                if (elem.key == item.key) {
                    //console.log(elem);
                    elem.quantity = parseInt(elem.quantity) + 1;
                    
                }
                cart.innerText = cartS[0] + 1;
                return elem;
            }))
        }
        
        
        console.log(cartS);
        
        
    }
    
    function removeItem(e) {
        let itemIndex = cartS.findIndex((elem) => elem.key == e.target.name);
        let tmpArray = cartS.map((elem) => {
            return elem;
        })
        tmpArray[0] = tmpArray[0] - tmpArray[itemIndex].quantity;
        tmpArray.splice(itemIndex,1);
        
        setCart(tmpArray);
        let cart = document.querySelector(".cartCount");
        cart.innerText = tmpArray[0];
        /*setCart(cartS.map((elem, index) => {
            
            if (index > 0) {
                if( elem.key == e.target.name) {
                    console.log(elem.key + " has been removed");
                    cartS.splice(index,1);
                    
                    
                }
                else {
                    return elem;
                }
                
  
            }
            
            
        }))*/
    }


return (
    <div className="main">
    <div id="column1">
        <h1>Name</h1>
        {
            cartS.map((elem, index)=> {
                console.log(cartS);
                if (index > 0 && elem != null) {
                    return (
                        <h2>{elem.name}</h2>
                    )
                }
            })
        }
    </div>
    <div id="column2">
        <h1>Quantity</h1>
        {
            
            cartS.map((elem, index)=> {
                if (index > 0) {
                    return (
                        <div id="quantityModifiers">
                            <img  id="left" name={elem.key} onClick = {updateQuantity}/>
                            <h2>{elem.quantity}</h2>
                            <img  id="right" name={elem.key} onClick = {updateQuantity}/>
                            <img  name={elem.key} id = "xImg" onClick={removeItem}/>
                        </div>
                    )
                }
            })
        }
    </div>
    <div id="column3">
        <h1>Price</h1>
        {
            cartS.map((elem, index)=> {
                if (index > 0) {
                    totalCost = totalCost + (elem.quantity * elem.price);
                    return (
                        <h2>{elem.price}</h2>
                    )
                }
                   
            })
        }
        <h1 id="totalElem">${totalCost}</h1>
        <button>Proceed to Payment</button>
    </div>
    </div>
    
)
}
export default Checkout;