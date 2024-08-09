import './App.css';

import {Route, Routes} from "react-router-dom";
import Insert from "./room/Insert";
import ListForUser from "./room/ListForUser";
import Update from "./room/Update";
import ListForProvider from "./room/ListForProvider";
import Test from "./address/Test";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import SearchResult from "./search/SearchResult";
import SearchForm from "./search/SearchForm";
function App() {
    return (
        <div>
            <SearchForm/>
            <Routes>
                <Route path="/hotel/showOne/:hotelId" element={<ShowOne/>}/>
                <Route path={"/room/update/:id"} element={<Update/>}/>
                <Route path={"/room/insert/:id"} element={<Insert/>}/>
                <Route path={"/room/management/:id"} element={<ListForProvider/>}/>
                <Route path={"/room/list/:id"} element={<ListForUser/>}/>
                <Route path={"/room/test/:id"} element={<Test/>}/>
                <Route path={"/search"} element={<SearchResult/>}/>
            </Routes>
        </div>
    );
}

export default App;
