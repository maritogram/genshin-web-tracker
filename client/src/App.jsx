import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";

import Home from "./pages/home.jsx";

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;