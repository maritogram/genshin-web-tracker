import React, {useState} from 'react';
import {Route, Routes, BrowserRouter, RouterProvider, createBrowserRouter, Outlet} from "react-router-dom";

import Home from "./pages/home.jsx";
import MyHeader from "./components/header.jsx";
import MyFooter from "./components/footer.jsx";
import Category from "./pages/category.jsx";
import Footer from "./components/footer.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:
            [
                {
                    path: "/",
                    element: <Home />

                },
                {
                    path: "category/",
                    element:    <Category/>
                },
                {
                     path: "category/:categoryId",
                    element:    <Category/>

                }




        ]
    },
    {path: "*", Component: Root,},

])

export default function App(){
    return <RouterProvider router={router}/>;

};

function Root(){


    return (
            <Routes>
                {/*<Route element={<Layout/>}>*/}
                {/*    <Route path="/" element={<Home marked={marked} setMarked={setMarked} />} />*/}
                {/*<Route path="/category/:categoryId" element={<Category marked={marked} setMarked={setMarked} />} />*/}
                {/*<Route path="/category" element={<Category marked={marked} setMarked={setMarked} />} />*/}
                {/*</Route>*/}
            </Routes>

    );


}



function Layout(){

    //Initializes the object where the marked achievements will be marked.
    const achievementsObjectString =  localStorage.getItem("achievements");
    if(achievementsObjectString == null || achievementsObjectString === "[object Object]") localStorage.setItem("achievements", "{}");
    const achievementsObject = JSON.parse(achievementsObjectString);

    // Gets the values of our achievements object (true or false / 1 or 0) and returns the sum of all of them. This will work
    // as our completed/marked achievements count
    const trueAchievementsObject =  Object.values(achievementsObject).reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    const [marked,setMarked] = useState(trueAchievementsObject);

    return(
        <>
            <MyHeader marked={marked}></MyHeader>
            <Outlet context={[marked,setMarked]} ></Outlet>
            <MyFooter></MyFooter>

        </>
    )


}

