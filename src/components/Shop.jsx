import { useState } from 'react'
import { Link } from "react-router-dom";
import Card from './Card.jsx';
import '/public/style/Shop.css';
import Catalog from '../data/Catalog.js';
function Shop() {


  
  return (
    <>
        <div id="main">
          <h1>Bird Catalog</h1>
          <div id="cards">
          {
          Catalog.map((elem, index)=> {
            
            return (
              <Card key={Catalog[index].key} index={Catalog[index].key} name={Catalog[index].name} img={Catalog[index].images[0]} price={Catalog[index].price}></Card>
            )
            
          })}

          </div>
        </div>
        
    </>
  )
}

export default Shop
