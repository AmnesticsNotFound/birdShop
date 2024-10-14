import { useState } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavBar from './NavBar.jsx'
import '/public/style/Homepage.css';

function Homepage() {



    return (
      <div id="shell">
        <div id="mainHome">
          <h1 id="homeTitle">Welcome to our corner<br></br>&emsp;&emsp;&nbsp;of the internet!</h1>
          <img src="https://i.imgur.com/MqFrLzL.png" id="bannerImg" alt="" />
          <div id="imgBanner">
            <img src="https://i.imgur.com/Wzf6kJO.png" id="leftBird" alt="" />
            <img src="https://i.imgur.com/G4ljJqz.jpeg" id="mainImg" alt="" />
            <img src="https://i.imgur.com/Wzf6kJO.png" id="rightBird" alt="" />
          </div>
          <p id="intro">Here at Avian Avenue we have a variety of species and morphs, but we still value quality over quantity.
            Our selection may not be as diverse as some breeders out there, but their variety often comes at the cost
            of quality! Their avian friends are often kept in confined locations with many other birds of varying species.
            <br /><br />
            How can they stretch their wings? Or be happy? Do they have the time/enough people to socialize or entertain them?
            Some do, some don't and it is often impossible to verify their claims if they live far away(which is often the case).
            Our small team does not peck off more than they can chew and providle ample time for each of our feathered friends as well
            as time for answering questions! Feel free to also schedule an in person appointment with us, just be sure to do it weeks in advance.
            <br /><br />
            Check out our selection up top!
          </p>
        </div>
        <div id="contactDiv">
          <h2>Contact Info</h2>
          <div id="contactInfo">
          <h3>Email:<span> avianavenue1983@gmail.com</span></h3>
          <h3>Phone Number:<span> +1 (210) 333-4657</span></h3>
          <h3>Address:<span> 9407 Augustus Avenue</span></h3>
          </div>
        </div>
    </div>
    )
}

export default Homepage;