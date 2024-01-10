import React, {useEffect, useState} from 'react';
import './category.css'
import {NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useFetchCategories} from "../hooks/useFetchCategories.jsx";
import {useFetchAchievements} from "../hooks/useFetchAchievements.jsx";


function SearchBar(){

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('s')

    const navigate= useNavigate()
    const [input, setInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
         setInput(e.target.value.trim())
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(input !== search && input){
                    navigate("../category?s=" + input)
        }

    }

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                className="search-bar"
                type="search"
                placeholder="Search for Achievements..."
                onChange={handleChange}
            />
        </form>

    )


}

function CategoryCard({category}) {

    const categoryTitle = category.title
    const categoryId = category.cat_id

    return (
        <NavLink to={"/category/" + categoryId} className="section category">
            <img alt="Category Token" src="/cat1.png" width="26px" height="50%" style={{margin: "0 10px"}}/>
            <div className="cat-text">
                <p className="cat-title">{categoryTitle}</p>
                <p className="cat-percent">100 %</p>
            </div>
        </NavLink>
    )
}

function DisplayedCategories({categories}){

    return(
        categories.map((category) =>
            <CategoryCard key={category.cat_id + 0} category={category}></CategoryCard>
        )
    )

}

function WrapperLeft({categories,dataStatus}) {

    if(dataStatus === 'loading'){
         return (
            <p>Loading..</p>
        )
    }

    if(dataStatus === 'error'){
        return (
            <p>Error!</p>
        )
    }

    return (
        <div id="wrapper-left">
            <SearchBar></SearchBar>
            <div className="categories">
                <DisplayedCategories categories={categories}></DisplayedCategories>
            </div>
        </div>
    )
}


function AchievementCardTitle({achievement, highlight=false, searchString}){

    const title = achievement.name;

     if (highlight) {
        const firstInstance = title.toLowerCase().indexOf(searchString.toLowerCase());

        const leftPart = title.slice(0, firstInstance);
        const middlePart = title.slice(firstInstance, (firstInstance + searchString.length));
        const rightPart = title.slice((firstInstance + searchString.length), title.length);

         return (
             <span className="title">{leftPart}<span style={{color: '#f39816'}}>{middlePart}</span>{rightPart}</span>
         )

     }

     return (
         <span className='title'>{title}</span>
     )

}


function AchievementCard({achievement, highlight = false, searchString, marked, setMarked}) {



    const markAchievement = (e) =>{
        e.preventDefault()
        const achievementObject = JSON.parse(localStorage.getItem("achievements"))
        Object.assign(achievementObject, {[achievement.ach_id]: true});
        localStorage.setItem("achievements", JSON.stringify(achievementObject))

        setMarked(marked+1)
    }

    const unmarkAchievement = (e) => {

    }


    return (
        <div className={"section progress"}>
            <img alt="Achievement Icon" className="left-img" src="/UI_AchievementIcon_1_0.png"/>
            <p className="information">
                <AchievementCardTitle achievement={achievement} highlight={highlight} searchString={searchString}></AchievementCardTitle>
                <span className="description">{achievement.description}</span>
            </p>
            <img alt="Primogems" className="primo" src="/5stprimo.webp"/>
            <div className="completion">
                <button
                    className="claim"
                    type="button"
                    onClick={ markAchievement }
                >
                    Mark
                </button>
            </div>
        </div>
    )
}


function DisplayedAchievements({totalAchievements, categories}){

    const [marked,setMarked] = useState(0)

    let achievementsObject = JSON.parse(localStorage.getItem("achievements"))
    useEffect(() => {
        achievementsObject = JSON.parse(localStorage.getItem("achievements"))
    }, [marked]);



    const {categoryId} = useParams(); //The ID of the category, undefined if no ID was found.

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('s'); //The search query string.


    /*
    Filters all the achievements depending on what needs to be displayed.
    If the category ID was found it will return true for all the achievements that contain such ID.
    If no category ID was found it means that specific achievements are being looked for. Therefore,
    we see if the search query is included in the title of the achievement. If it is, we increment the match count and
    return the respective boolean.
     */
    let matchCount = 0;
    const filteredAchievements = totalAchievements.filter(({category_id, name})=> {
        if (categoryId !== undefined){
            return parseInt(categoryId) === (category_id);
        }else{
            const match = name.toLowerCase().includes(search.toLowerCase());
            if (match) matchCount++;
            return (match)
        }
    })

    /*
    Decides how each achievement should be rendered.
    If the user is looking at a specific category (categoryId exists), simply render them.
    If the above isn't the case, we know the search function is being used. This means that we will also need to render
    the categories of the rendered achievements. For this we check if the previous achievement belongs to the current
    achievement's category, if it doesn't we render the title of the category as to declare a new section of achievements.
    */
    let previousTitle = ""
    const outputAchievements = (currentAchievement) => {
        const currentTitle = categories[currentAchievement.category_id - 1].title;

        if(categoryId !== undefined){
           return <AchievementCard key={currentAchievement.ach_id + 0} achievement={currentAchievement} marked={marked} setMarked={setMarked}></AchievementCard>
        }

        if(previousTitle !== currentTitle){
            previousTitle = currentTitle;
            return(
                <>
                    {/*//FIX KEY ISSUE */}
                    <div className={"section s-title"} key={currentAchievement.category_id - 1}>{currentTitle}</div>
                    <AchievementCard key={currentAchievement.ach_id + 1} achievement={currentAchievement} highlight={true} searchString={search}></AchievementCard>
                </>
            )
        } else {
            return (<AchievementCard key={currentAchievement.ach_id +0} achievement={currentAchievement} highlight={true} searchString={search}></AchievementCard>)
        }
    }



    return(
        <>
            {filteredAchievements.sort((a,b)=>{

                if(achievementsObject[a.ach_id]){
                    return 1
                } else{
                    return -1
                }
            }).map(outputAchievements)}
        </>
    )


}


function WrapperRight({categories}) {

    const {data, status} = useFetchAchievements();

    if (status === 'loading') {
        return (
            <p>Loading</p>
        )
    }

    if(status === 'error'){
         return (
             <p>Error</p>
         )
    }


    return (
        <div id="wrapper-right">
            <div className="canvas">
            </div>
            <div className="paper">
                <div className="scroll-style ">
                    <DisplayedAchievements totalAchievements={data} categories={categories}></DisplayedAchievements>
                </div>
            </div>
        </div>
    )
}

function Category() {

    const {data, status} = useFetchCategories();

    //Initializes the object where the marked achievements will be marked.
    const achievementObject =  localStorage.getItem("achievements");
    if(achievementObject == null || achievementObject === "[object Object]") localStorage.setItem("achievements", "{}");

    return (
        <div id="content">
            <WrapperLeft categories={data} dataStatus={status}></WrapperLeft>
            <WrapperRight categories={data}></WrapperRight>
        </div>
    );
}

export default Category;