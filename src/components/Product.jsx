import { useState } from 'react';
import { useRef } from 'react';
import React from "react";
import { useParams } from "react-router-dom";
import '/public/style/Product.css';
import Catalog from '../data/Catalog.js';
import Cart from '../data/Cart.js';

function Product() {
    
    const { id } = useParams();
    const max = Catalog[id].quantity;
    
    function add2Cart() {
        let x = document.querySelector("#tooLarge");
        let y = document.querySelector("#tooSmall");
        let item = Cart.find(e => e.key == id);
        //console.log(item)
        let input = document.querySelector("#quantity");
        if (input.value > 0) {
            //console.log("entered")
            if (Cart.find(e => e.key == id)) {
                //console.log("item found");
                if((parseInt(input.value) + parseInt(item.quantity)) > Catalog[id].quantity) {
                    //console.log("too large");
                    
                    x.style.visibility = "visible";
                    
                    y.style.visibility = "hidden";
                }
                else {
                    item.quantity = parseInt(input.value) + parseInt(item.quantity);
                    Cart[0] = Cart[0] + parseInt(input.value);
                    //console.log("quantity updated");
                
                    x.style.visibility = "hidden";
                    
                    y.style.visibility = "hidden";
                }
            }

            else {
                
                Cart.push({
                key:Catalog[id].key,
                name:Catalog[id].name,
                quantity:input.value,
                price:Catalog[id].price,
                max: Catalog[id].quantity
                })
                Cart[0] = Cart[0] + parseInt(input.value);
                //console.log("new cart item added")
            }
        }
        else {
                    console.log("oops")
                    y.style.visibility = "visible";
                    x.style.visibility = "hidden";
        }
            

        

          
        //console.log(Cart);
        let cart = document.querySelector(".cartCount");
        cart.innerText = Cart[0];
        //console.log(cart.innerText)
    }

    


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
        <h1 id="title">{Catalog[id].name}</h1>
        
        <div className="productImages">
            <img src={Catalog[id].images[0]} alt="" />
            <img src={Catalog[id].images[1]} alt="" /> 
            
        </div>
        <img id="bigImg" src={Catalog[id].images[2]} alt="" />
        <h1>${Catalog[id].price}{"(" + Catalog[id].quantity + " available)"}</h1>
        <h2>{Catalog[id].description}</h2>
        
        <div className="cartElem">
            <img src="https://i.imgur.com/jKCyOtw.png" name="left" style={{transform: "scaleX(-1)"}}alt="" onClick={modifyQuantity}/>
            <input type="text" name="quantity" id="quantity" value="0"/>
            <img src="https://i.imgur.com/jKCyOtw.png" name="right" alt="" onClick={modifyQuantity}/>
            <button type="submit" onClick={add2Cart}>Add to Cart</button>
         </div>
         <h3 id="tooLarge">Not that many available or already in cart</h3>
         <h3 id="tooSmall">Quantity must be greater than 0</h3>
        {//UPDATE CART.JS AND THEN READ DATA AND ADD TO CART IN NAVBAR
        }
    </div>
)
}

export default Product;
