import logo from './logo.svg';
import './catalog.css';
import card from './images/ach_container.png'
import icon from './images/UI_AchievementIcon_A001.png'
import {useEffect, useState} from "react";

function Cell(title){




    return(
        <div className="cell">
                    <img src={card} />
                    <img className="ins_image" alt="Wonders of the World" src={icon}/>
                    <p className="card_title" style={{}}>title</p>
                    <p className="percentage">100%</p>
        </div>
    )

}


function Guts(){
    return(
        <div className="guts">
            <Cell></Cell>
        </div>
    )
}



export default function Catalog() {
  return (
    <div className="catalog">
        <Guts></Guts>
    </div>
  );
}


