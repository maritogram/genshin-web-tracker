import React, {useEffect, useState, useRef} from 'react';
import './category.css'
import {Link, NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useQuery} from "react-query";


function SearchBar(){

    const navigate= useNavigate()

    const [input, setInput] = useState("")

     const handleChange = (e) => {
        e.preventDefault()
         setInput(e.target.value)
    }

    const handleSubmit = (e) => {
            e.preventDefault()
        console.log(input)
        navigate("../category?s=" + input)

    }


    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                className="search-bar"
                type="search"
                placeholder="Search for Achievements..."
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </form>

    )


}


function SectionCat({param}) {
    return (
        <NavLink to={"/category/" + param.cat_id} className="section category">
            <img src="/cat1.png" width="auto" height="50%" style={{padding: 0}}/>
            <div className="cat-text">
                <p className="cat-title">{param.title}</p>
                <p className="cat-percent">100 %</p>
            </div>
        </NavLink>
    )
}


function WrapperLeft({achievements}) {


    //FIX THIS WHY IT MOUNTS EVERYTIME CLICKED
    console.log("Mounts ")


    //need to refactor this as it is repeated two times
    const fetchCategories = async () => {
        const res = await fetch('/api/catalog')
        if (!res.ok){
            throw new Error('Network response was not ok.')
        }
        return res.json()
    }

    const {data,status} = useQuery("categories", fetchCategories)

    if(status === 'loading'){
         return (
        <div id="wrapper-left">
            <p>Loading..</p>
        </div>
        )
    }
    if(status === 'error'){
        return (
        <div id="wrapper-left">
            <p>Error!</p>
        </div>
        )
    }

    return (
        <div id="wrapper-left">
            <SearchBar></SearchBar>
            <div className="categories">
                {data.map((section) =>
                    <SectionCat key={section.cat_id + 0} param={section}></SectionCat>
                )}
            </div>

        </div>


    )
}


function Info({param}) {


    return (
        <div className="section progress">

            <img className="left-img" src="/UI_AchievementIcon_1_0.png"/>
                <p className="information">
                    <span className="title">{param.name}</span>
                    <span className="description">{param.description}</span>
                </p>
                <img className="primo" src="/5stprimo.webp"/>
                <div className="completion">
                    <button className="claim" type="button">Mark</button>
                </div>
            </div>
    )
}

function WrapperRight() {

    const fetchAchievements = async () => {
        const res = await fetch('/api/achievements')
        if(!res.ok){
            throw new Error('Network response was not ok.')
        }
        return res.json()
    }

    const {categoryId} = useParams()

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('s')





    const {data, status} = useQuery('achievements', fetchAchievements)

    if(status === 'loading'){
         return (
        <div id="wrapper-right">
            <div className="canvas">
            </div>
            <div className="paper">
                <div className="scroll-style ">
                    <p>Loading...</p>
                </div>
            </div>
        </div>
    )
    }
    if(status === 'error'){
         return (
        <div id="wrapper-right">
            <div className="canvas">
            </div>
            <div className="paper">
                <div className="scroll-style ">
                <p>Error!</p>
                </div>
            </div>
        </div>
    )
    }


    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    //I don't think this might be that efficient, but it's better than have a lot of people doing multiple api calls considering each search is one api call.
    const filtered = data.filter(({category_id, name})=>
    {
        if (categoryId !== undefined){
           return parseInt(categoryId) === (category_id)
        }else{
            return (name.toLowerCase().includes(search.toLowerCase()))
        }
    }
    )


    return (
        <div id="wrapper-right">
            <div className="canvas">
            </div>
            <div className="paper">
                <div className="scroll-style ">
                    {filtered.map((ach)=>
                        <Info key={ach.ach_id+0} param={ach}></Info>
                    )}
                </div>
            </div>
        </div>
    )
}

function Category() {

    return (
        <div id="content">
            <WrapperLeft></WrapperLeft>
            <WrapperRight></WrapperRight>
        </div>
    );
}

export default Category;