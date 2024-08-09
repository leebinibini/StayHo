import './App.css';
import React from "react";
import ShowOne from './hotel/ShowOne';
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/hotel/showOne/:hotelId" element={<ShowOne/>}/>
            </Routes>
        </div>
    );
}

export default App;
