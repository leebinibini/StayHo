import './App.css';
import {Route, Routes} from "react-router-dom";
import Insert from "./room/Insert";
import ListForUser from "./room/ListForUser";
import Update from "./room/Update";
import ListForProvider from "./room/ListForProvider";
import Test from "./address/Test";
import SearchForm from "./search/SearchForm";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/room/update/:id"} element={<Update/>}/>
                <Route path={"/room/insert/:id"} element={<Insert/>}/>
                <Route path={"/room/management/:id"} element={<ListForProvider/>}/>
                <Route path={"/room/list/:id"} element={<ListForUser/>}/>
                <Route path={"/room/test/:id"} element={<Test/>}/>
                <Route path={"/search"} element={<SearchForm/>}/>
            </Routes>
        </div>
    );
}

export default App;
