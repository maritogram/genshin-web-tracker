import React from 'react';
import './home.css';

import {Link, ScrollRestoration} from "react-router-dom";

import {useFetchCategories} from '../hooks/useFetchCategories.jsx'


function Cell({param}){

    return (
        <div className="cell-wrapper">
            <Link to = {'category/' + param.cat_id} className="cell">
                <img className="ins_image" alt={param.title} src={"/cat/acat" + param.cat_id + ".webp"}/>
                 <p className={"card_title font" + param.cat_id}>{param.title}</p>
                 <p className="percentage">100%</p>
            </Link>
        </div>


    )

}

function AchievementCategories() {

    const {data, status} = useFetchCategories();

     if(status === 'loading'){
         return (
            <p>Loading..</p>
        )
    }

    if(status === 'error') {
        return (
            <p>Error!</p>
        )
    }


    return (
        <div className="guts">
            {data.map(cat => (
                <Cell key={cat.cat_id + 0} param={cat}></Cell>
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