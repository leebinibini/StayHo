import './App.css';
import {Route, Routes} from "react-router-dom";
import Auth from "./member/Auth";
import Register from "./member/Register";
import Update from "./member/Update";
import ShowList from "./hotel/ShowList";
import MyPage from "./member/MyPage";
import Secede from "./member/Secede";
import ReRegister from "./registrant/ReRegister";
import ReAuth from "./registrant/ReAuth";
import ReUpdate from "./registrant/ReUpdate";
import ReSecede from "./registrant/ReSecede";
import ReMyPage from "./registrant/ReMyPage";
import Write from "./hotel/Write";
import AdMyPage from "./admin/AdMyPage";
import Menu from "./admin/Menu";
import AdAuth from "./admin/AdAuth";


function App() {
    return (
        <div className="App">
            <header className="App">
                <Routes>
                    <Route path="/member/auth" element={<Auth/>}/>
                    <Route path="/member/register" element={<Register/>}/>
                    <Route path="/member/update" element={<Update/>}/>
                    <Route path="/" element={<ShowList/>}/>
                    <Route path="/hotel/write" element={<Write/>}/>
                    <Route path="/member/myPage" element={<MyPage/>}/>
                    <Route path="/member/secede" element={<Secede/>}/>
                    <Route path="/registrant/reRegister" element={<ReRegister/>}/>
                    <Route path="/registrant/reAuth" element={<ReAuth/>}/>
                    <Route path="/registrant/reUpdate" element={<ReUpdate/>}/>
                    <Route path="/registrant/reSecede" element={<ReSecede/>}/>
                    <Route path="/registrant/reMyPage" element={<ReMyPage/>}/>
                    <Route path="/admin/adMyPage" element={<AdMyPage/>}/>
                    <Route path="/admin/menu" element={<Menu/>}/>
                    <Route path="/admin/adAuth" element={<AdAuth/>}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
