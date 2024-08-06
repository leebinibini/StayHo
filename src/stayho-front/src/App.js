import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Insert from "./room/Insert";
import ListForUser from "./room/ListForUser";
import Update from "./room/Update";
import ListForProvider from "./room/ListForProvider";
import InsertAddress from "./address/InsertAddress";
import Test from "./address/Test";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/room/update/:id"} element={<Update/>}/>
                <Route path={"/room/insert/:id"} element={<Insert/>}/>
                <Route path={"/room/management/:id"} element={<ListForProvider/>}/>
                <Route path={"/room/list/:id"} element={<ListForUser/>}/>
                <Route path={"/room/test/:id"} element={<Test/>}/>
            </Routes>
            <InsertAddress/>
        </div>
    );
}

export default App;
