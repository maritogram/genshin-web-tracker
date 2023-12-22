import React from 'react';
import './home.css';

import {useEffect, useState} from "react";

function Cell(){
    return(
        <div className="cell">
            <img src="/ach_container.png" />
            <img className="ins_image" alt="Wonders of the World" src="/UI_AchievementIcon_A001.png"/>
            <p className="card_title" style={{}}></p>
            <p className="percentage">100%</p>
        </div>
    )

}


function Guts(catalog){
    return(
        <div className="guts">
        </div>
    )
}



function Home() {

    const [achievement, setAchievement]= useState([{}])


    useEffect(() => {
        fetch('/api/catalog').then(
             res => res.json()
        ).then(
            data => {
                setAchievement(data)
            }
        )
    },[])



    return (
        <Guts></Guts>
    );
}

export default Home;