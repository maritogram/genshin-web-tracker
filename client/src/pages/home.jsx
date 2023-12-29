import React from 'react';
import './home.css';

import {useEffect, useState} from "react";

import {Link} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";


function Cell({param}){

    return (
        <div className="cell-wrapper">
            <Link to = {'category/' + param.cat_id} className="cell">
                <img className="ins_image" alt={param.title} src={"/cat/acat" + param.cat_id + ".webp"}/>
                 <p className="card_title">{param.title}</p>
                 <p className="percentage">100%</p>
            </Link>
        </div>


    )

}

function AchievementCategories() {

    const fetchCategories = async () => {
        const res = await fetch('/api/catalog')
        if (!res.ok){
            throw new Error('Network response was not ok.')
        }
        return res.json()
    }

    const {data,status} = useQuery("categories", fetchCategories)

    if(status === 'loading'){
        return <p> Loading...</p>
    }

    if(status === 'error'){
        return <p> Error</p>
    }
    return(
        <div className="guts">
            {data.map(cat=>(
              <Cell key={cat.cat_id +0} param={cat}></Cell>
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