import React from 'react';
import './home.css';

import {useEffect, useState} from "react";

function AchievementCategories(){

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
    // console.log(achievement)

    const categories = achievement.map(category =>
        <div className="cell" key={category.cat_id}>
            <img src="/ach_container.png"/>
            <img className="ins_image" alt="Wonders of the World" src="/UI_AchievementIcon_A001.png"/>
            <p className="card_title">{category.title}</p>
            <p className="percentage">100%</p>
        </div>
    )

    return (
        <div className="guts">
            {categories}
        </div>

    )

}


function Home() {
    return (
        <AchievementCategories>
        </AchievementCategories>
    );
}

export default Home;