import React from 'react';
import './home.css';

import {useEffect, useState} from "react";



function Cell({param}){
    return (
        <div className="cell-wrapper">
            <a href="" className="cell">

                <img className="ins_image" alt={param.title} src={"/cat/acat" + param.cat_id + ".webp"}/>
                 <p className="card_title">{param.title}</p>
                 <p className="percentage">100%</p>



            </a>
        </div>


    )

}

function AchievementCategories() {

    const [achievement, setAchievement] = useState([{}])

    useEffect(() => {
        fetch('/api/catalog').then(
            res => res.json()
        ).then(
            data => {
                setAchievement(data)
            }
        )
    },[])

   const cats=achievement.map((category) =>
       // I don't know why the key error won't disappear with the original id's of my data, just add 0 for now
       <Cell key={category.cat_id + 0} param={category}></Cell>
    )

    return(
        <div className="guts">
            {cats}
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