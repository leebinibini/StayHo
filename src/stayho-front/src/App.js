import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Insert from "./room/Insert";
import Management from "./room/Management";
import Update from "./room/Update";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/room/update/:id"} element={<Update/>}/>
                <Route path={"/room/insert"} element={<Insert/>}/>
            </Routes>
            <Management/>
        </div>
    );
}

export default App;
