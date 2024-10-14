import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import Card from './Card.jsx';
import '/public/style/Shop.css';
//import Catalog from '../data/Catalog.js';
function Shop() {
  const [catalog, setCatalog] = useState([]);

  useEffect( () => {
    async function getCatalog() {
      let res = await axios.get('https://birdshop-fullstack.onrender.com/getCatalog');
      
      setCatalog(res.data);
      //console.log(catalog);
    }
    getCatalog();


  }, [])

  
  return (
    <>
        <div id="main">
          <h1>Bird Catalog</h1>
          <div id="cards">
          {
          catalog.map((elem, index)=> {
            
            return (
              <Card key={elem.key} id={elem._id} name={elem.name} description={elem.description} imgs={elem.images} price={elem.price} quantity={elem.quantity}></Card>
            )
            
          })}

          </div>
        </div>
        
    </>
  )
}

export default Shop
