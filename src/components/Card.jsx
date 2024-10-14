import { useState } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import '/public/style/Card.css';


function Card(props) {

    const id = props.id;

    //stores product in local storage so I don't have to pull the data from back end every time its needed
    function saveProduct(){
        localStorage.setItem("product", JSON.stringify({id: id,
            key:props.key,
            name:props.name,
            description: props.description,
            imgs:props.imgs,
            price:props.price,
            quantity:props.quantity,
        }));
    }
    
/*
state={{id_: id,
            key:props.key,
            name:props.name,
            img:props.img,
            price:props.price,
            quantity:props.quantity,
        }}
*/
    return (
        <div className="card">
        <Link to={`/product/${id}`} onClick={saveProduct}>
            <img src={props.imgs[0]} alt="" />
        </Link>
        <Link to={`/product/${id}`}>
            <h2>{props.name}</h2>
        </Link>
        <h3>${props.price}</h3>
        </div>
    )

}


export default Card;