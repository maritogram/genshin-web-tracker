import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";

import Home from "./pages/home.jsx";
import MyHeader from "./components/header.jsx";
import MyFooter from "./components/footer.jsx";
import Category from "./pages/category.jsx";

function App(props) {
    return (
        <BrowserRouter>
            <MyHeader></MyHeader>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/category" element={<Category />} />
            </Routes>
            <MyFooter></MyFooter>

        </BrowserRouter>
    );
}

export default App;