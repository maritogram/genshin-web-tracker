import React from 'react';
import './home.css';

import {Link, ScrollRestoration} from "react-router-dom";

import {useFetchCategories} from '../hooks/useFetchCategories.jsx'
import {useFetchAchievements} from "../hooks/useFetchAchievements.jsx";



function ProgressBar({percentage}){

    return (
        <div className="progress-outer">
            <div className="progress-bar" style={{width: percentage + "%"}}></div>
        </div>


    )

}


function Cell({category, achievements}){


    const categoryId = category.cat_id


    const achievementsFromCategory = achievements.filter(({category_id})=> {
            return parseInt(categoryId) === (category_id);
    })
    const firstAchievementFromCategory =  achievementsFromCategory[0].ach_id;
    const lastAchievementFromCategory =  achievementsFromCategory[achievementsFromCategory.length - 1].ach_id;

    const achievementsObject = JSON.parse(localStorage.getItem("achievements"))


    /*
    First gets all the keys (achievement ids) from the local storage object. If they are between the valid achievements
    and their value is true, add it to the filtered array.
     */
    let percentage = 0;
    const completedAchievementsFromCategory = Object.keys(achievementsObject).filter((element)=>{
        if (element >= firstAchievementFromCategory && element <= lastAchievementFromCategory){
            if(achievementsObject[element]) return true;
        }
        return false
    })

    percentage = ((completedAchievementsFromCategory.length / (lastAchievementFromCategory - firstAchievementFromCategory + 1)) * 100).toFixed()


    return (
        <div className="cell-wrapper">
            <Link to = {'category/' + category.cat_id} className="cell">
                <img className="ins_image" alt={category.title} src={"/cat/acat" + category.cat_id + ".webp"}/>
                <p className={"card_title font" + category.cat_id}>{category.title}</p>
                <p className="percentage">{percentage}%</p>
                <ProgressBar percentage={percentage}></ProgressBar>
            </Link>
        </div>


    )

}

function AchievementCategories() {


    const {data:categoryData, status:categoryStatus} = useFetchCategories();
    const {data:achievementData, status:achievementStatus} = useFetchAchievements();

    if (achievementStatus  === 'loading') {
        return (
            <p>Loading</p>
        )
    }

    if(achievementStatus === 'error'){
         return (
             <p>Error</p>
         )
    }


    return (
        <div className="guts">
            {categoryData.map(cat => (
                <Cell key={cat.cat_id + 0} category={cat} achievements={achievementData}></Cell>
            ))}
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