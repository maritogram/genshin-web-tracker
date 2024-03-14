import React, {useState} from 'react';
import {Route, Routes, BrowserRouter, RouterProvider, createBrowserRouter, Outlet} from "react-router-dom";

import Home from "./pages/home.jsx";
import MyHeader from "./components/header.jsx";
import MyFooter from "./components/footer.jsx";
import Category from "./pages/category.jsx";

import {QueryClient} from 'react-query'


async function achievementDataLoader(queryClient) {
    const fetchAchievements = async () => {
        const res = await fetch('/api/achievements');
        if (!res.ok) {
            throw new Error('Network response was not ok.')
        }
        return res.json()
    }

    return queryClient.fetchQuery('achievements', fetchAchievements)

}

async function categoryDataLoader(queryClient) {
    const fetchCategories = async () => {
        const res = await fetch('/api/catalog');
        if (!res.ok) {
            throw new Error('Network response was not ok.');
        }
        return res.json();
    }

    return queryClient.fetchQuery('category', fetchCategories)
}

const fullDataLoader = async (queryClient) => {
    return Promise.all([categoryDataLoader(queryClient), achievementDataLoader(queryClient)])
}

const router = createBrowserRouter([
    {
        element: <Layout/>,
        id: "root",
        loader: async () => {
            const queryClient = new QueryClient({
                    defaultOptions: {
                        queries: {
                            staleTime: Infinity,
                        },
                    },
                }
            )

            return fullDataLoader(queryClient);
        },
        children:
            [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "category/",
                    element: <Category/>,

                },
                {
                    path: "category/:categoryId",
                    element: <Category/>,

                }


            ]
    },

])

export default function App() {
    return <RouterProvider router={router}/>;

};

// function Root(){
//
//
//     return (
//             <Routes>
//                 {/*<Route element={<Layout/>}>*/}
//                 {/*    <Route path="/" element={<Home marked={marked} setMarked={setMarked} />} />*/}
//                 {/*<Route path="/category/:categoryId" element={<Category marked={marked} setMarked={setMarked} />} />*/}
//                 {/*<Route path="/category" element={<Category marked={marked} setMarked={setMarked} />} />*/}
//                 {/*</Route>*/}
//             </Routes>
//
//     );
//
//
// }


function Layout() {

    //Initializes the object where the marked achievements will be marked.
    const achievementsObjectString = localStorage.getItem("achievements");
    if (achievementsObjectString == null || achievementsObjectString === "[object Object]") localStorage.setItem("achievements", "{}");
    const achievementsObject = JSON.parse(achievementsObjectString);

    // Gets the values of our achievements object (true or false / 1 or 0) and returns the sum of all of them. This will work
    // as our completed/marked achievements count
    const trueAchievementsObject = Object.values(achievementsObject).reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    const [marked, setMarked] = useState(trueAchievementsObject);

    console.log("app re rendered")

    return (
        <>
            <MyHeader marked={marked}></MyHeader>
            <Outlet context={[marked, setMarked]}></Outlet>
            <MyFooter></MyFooter>

        </>
    )


}

