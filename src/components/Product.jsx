import { useEffect, useState } from 'react';
import { useRef } from 'react';
import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from 'axios';

import '/public/style/Product.css';
import Cart from '../data/Cart.js';

function Product() {
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [cartCount, setCount] = useState();

    const product = JSON.parse(localStorage.getItem("product"));

    const { id } = useParams();
    const max = product.quantity;
    

   // checks if the selected quantity is available. updates cart and cartCount cookies.
    async function checkCart() {
        let x = document.querySelector("#tooLarge");
        let y = document.querySelector("#tooSmall");
        let item;
        let itemIndex;
        //console.log(cookies.cart)
        try{
         item = cookies.cart.find(e => e.id == id);
         itemIndex= cookies.cart.findIndex(e => e.id == id);
         //console.log(itemIndex);
        }
        catch(error){
            //console.log("whoops");
            item=undefined;
        }
        
        //console.log(cookies.cart[0])
        let input = document.querySelector("#quantity");
        if (input.value > 0) {
            //console.log(item)
            if (item != undefined) {
                //console.log("item found");
                if((parseInt(input.value) + parseInt(item.quantity)) > parseInt(product.quantity)) {
                    //console.log("too large");
                    
                    x.style.visibility = "visible";
                    
                    y.style.visibility = "hidden";
                }
                else {
                    let cartTemp = cookies.cart;
                    let entry = cartTemp.find(elem => elem.id == item.id);
                    entry.quantity = parseInt(entry.quantity) + parseInt(input.value);
                    setCookie('cart', cartTemp, {
                        path:"/",
                        maxAge: 60*60*24,
                        secure: true,
                        sameSite: "lax",
                        });
                    //cookies.cart[itemIndex].quantity = parseInt(input.value) + parseInt(item.quantity);

                    let totalEntries =0;
                    for (let i = 0; i < cookies.cart.length; ++i) {
                        totalEntries = totalEntries + parseInt(cookies.cart[i].quantity);
                    }
                    setCookie('cartCount', totalEntries, {
                        path:"/",
                        maxAge: 60*60*24,
                        secure: true,
                        sameSite: "lax",
                        });
                    setCount(totalEntries)
                    
                    //Cart[0] = Cart[0] + parseInt(input.value);
                    //console.log("quantity updated");
                
                    x.style.visibility = "hidden";
                    
                    y.style.visibility = "hidden";
                }
            }

            else {
                if(cookies.cart == undefined) {
                    setCookie('cart', [
                        {
                            id: product.id,
                            key:product.key,
                            name:product.name,
                            quantity:input.value,
                            price:product.price,
                            max: product.quantity
                        }
                    ],
                    {
                    path:"/",
                    maxAge: 60*60*24,
                    secure: true,
                    sameSite: "lax",
                    }
                );
                }
                else {
                    
                    let cartTemp = cookies.cart;
                    cartTemp.push({
                        id: product.id,
                        key:product.key,
                        name:product.name,
                        quantity:input.value,
                        price:product.price,
                        max: product.quantity
                    });
                    setCookie('cart', cartTemp,
                    {
                    path:"/",
                    maxAge: 60*60*24,
                    secure: true,
                    sameSite: "lax",
                    }
                );
                

                    /*let res = await axios.post('http://localhost:8080/add2Cart',{
                        id: product.id,
                        name:product.name,
                        quantity:input.value,
                        price:product.price,
                        max: product.quantity
                        });*/
                    
                    //setCatalog(res.data);
                    //console.log(catalog);
                  
                
                //Cart[0] = Cart[0] + parseInt(input.value);
                //console.log("new cart item added")
                }
                try {
                    let totalEntries =0;
                    for (let i = 0; i < cookies.cart.length; ++i) {
                        totalEntries = totalEntries + parseInt(cookies.cart[i].quantity);
                    }
                    //console.log(totalEntries);
                    setCookie('cartCount', totalEntries, {
                        path:"/",
                        maxAge: 60*60*24,
                        secure: true,
                        sameSite: "lax",
                        });
                    setCount(totalEntries);
                    
                } catch(error) {
                    setCookie('cartCount', input.value, {
                        path:"/",
                        maxAge: 60*60*24,
                        secure: true,
                        sameSite: "lax",
                        });
                    setCount(input.value);
                    
                }
                
            }

            
        }
        else {
                    //console.log("oops")
                    y.style.visibility = "visible";
                    x.style.visibility = "hidden";
        }
            

        

          
        //console.log(Cart);
        //console.log(cookies.cart)
        
        //console.log(cart.innerText)
    }

    

// displays the quantity adjustment, but does not save the change
    function modifyQuantity(e) {
        let input = document.querySelector("#quantity");
        if (e.target.name == "left" && input.value != 0) {
            //console.log("hi");
            input.value = input.value - 1;
        }
        else if (e.target.name == "right" && input.value < max){
            //console.log(parseInt(input.value));
            input.value = parseInt(input.value) + 1;
        }
    }

    
return (
    <div className="product">
        <h1 id="title">{product.name}</h1>
        
        <div className="productImages">
            <img src={product.imgs[0]} alt="" />
            <img src={product.imgs[1]} alt="" /> 
            
        </div>
        <img id="bigImg" src={product.imgs[2]} alt="" />
        <h1>${product.price}{"(" + product.quantity + " available)"}</h1>
        <h2>{product.description}</h2>
        
        <div className="cartElem">
            <img src="https://i.imgur.com/jKCyOtw.png" name="left" style={{transform: "scaleX(-1)"}}alt="" onClick={modifyQuantity}/>
            <input type="text" name="quantity" id="quantity" value="0"/>
            <img src="https://i.imgur.com/jKCyOtw.png" name="right" alt="" onClick={modifyQuantity}/>
            <button type="submit" onClick={checkCart}>Add to Cart</button>
         </div>
         <h3 id="tooLarge">Not that many available or already in cart</h3>
         <h3 id="tooSmall">Quantity must be greater than 0</h3>
        {//UPDATE CART.JS AND THEN READ DATA AND ADD TO CART IN NAVBAR
        }
    </div>
)
}

export default Product;
