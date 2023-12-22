import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";

import Home from "./pages/home.jsx";
import MyHeader from "./components/header.jsx";

function App(props) {
    return (
        <BrowserRouter>
            <MyHeader></MyHeader>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;