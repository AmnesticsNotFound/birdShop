import { useState } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import '/public/style/Card.css';


function Card(props) {

    const id = props.index;


    return (
        <div className="card">
        <Link to={`/product/${id}`}>
            <img src={props.img} alt="" />
        </Link>
        <Link to={`/product/${id}`}>
            <h2>{props.name}</h2>
        </Link>
        <h3>${props.price}</h3>
        </div>
    )

}


export default Card;