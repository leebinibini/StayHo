import {Routes, Route} from "react-router-dom";
import './App.css';
import React from "react";
import ShowList from "./hotel/ShowList";
import ShowOne from "./hotel/ShowOne";
import Update from "./hotel/update";
import Write from "./hotel/write";

function App() {
  return (
    <div>
      <Routes>
          <Route path="/hotel/showList" element={<ShowList/>}/>
          <Route path="/hotel/showOne/:id" element={<ShowOne/>}/>
          <Route path="/hotel/write" element={<Write/>}/>
          <Route path="/hotel/update/:id" element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;
