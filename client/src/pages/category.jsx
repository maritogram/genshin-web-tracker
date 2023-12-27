import React, {useEffect, useState} from 'react';
import './category.css'
import {useParams} from "react-router-dom";


function SectionCat({param}){

    return (
        <button className="section category">
            <img src="/cat1.png" width="auto" height="50%" style={{padding: 0}}/>
            <div className="cat-text">
                <p className="cat-title">{param.title}</p>
                <p className="cat-percent">100 %</p>
            </div>
        </button>
    )
}


function WrapperLeft() {

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

   const sections=achievement.map((section) =>
       // I don't know why the key error won't disappear with the original id's of my data, just add 0 for now
       <SectionCat key={section.cat_id + 0} param={section}></SectionCat>
    )



    return (
        <div id="wrapper-left">
            {sections}
        </div>

    )
}

function WrapperRight({param}) {

    let catId = useParams()
    console.log(catId)

    return (
        <div id="wrapper-right">
            <div className="canvas">
            </div>
            <div className="paper">

                <div className="scroll-style ">
                <div className="section progress">
                        <img className="left-img" src="/UI_AchievementIcon_1_0.png"/>
                        <p className="information">
                            <span className="title">"Hi</span>
                            <span className="description">A single stone births a thousand ripples. It seems like Ningguang's day off is not to be.</span>
                        </p>
                        <img className="primo" src="/5stprimo.webp"/>
                        <div className="completion">
                            <button className="claim" type="button">Mark</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Category(props) {

    return (
        <div id="content">
            <WrapperLeft></WrapperLeft>
            <WrapperRight></WrapperRight>

        </div>
    );
}

export default Category;