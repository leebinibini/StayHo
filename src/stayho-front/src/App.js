import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import ReservationAll from "./reservation/user/ReservationAll";
import ReservationOne from "./reservation/user/ReservationOne";
import ReservationInsert from "./reservation/user/ReservationInsert";
import RoomInsert from "./room/RoomInsert";
import ListForUser from "./room/ListForUser";
import RoomUpdate from "./room/RoomUpdate";
import ListForProvider from "./room/ListForProvider";
import Test from "./address/Test";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import SearchResult from "./search/SearchResult";
import SearchForm from "./search/SearchForm";
import Registrant from "./reservation/registerant/Registrant";
import Admin from "./reservation/admin/Admin";
import ShowAll from "./review/ShowAll";
import Auth from "./member/Auth";
import Register from "./member/Register";
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
import MemberUpdate from "./member/MemberUpdate";
import ReAuth from "./registrant/ReAuth";
import AdUpdate from "./admin/AdUpdate";
import AdAuth from "./admin/AdAuth";
import Update from "./member/Update";


function App() {
    return (
        <div className="App">
            <header className="App">
                <SearchForm/>
                <Routes>
                    <Route path="/member/auth" element={<Auth/>}/>
                    <Route path="/member/register" element={<Register/>}/>
                    <Route path="/member/memberUpdate" element={<MemberUpdate/>}/>
                    <Route path="/" element={<ShowList/>}/>
                    <Route path="/hotel/write" element={<Write/>}/>
                    <Route path="/member/myPage" element={<MyPage/>}/>
                    <Route path="/member/secede" element={<Secede/>}/>
                    <Route path="/registrant/reRegister" element={<ReRegister/>}/>
                    <Route path="/registrant/reAuth" element={<ReAuth/>}/>
                    <Route path="/registrant/reRegister" element={<ReRegister/>}/>
                    <Route path="/registrant/reUpdate" element={<ReUpdate/>}/>
                    <Route path="/registrant/reSecede" element={<ReSecede/>}/>
                    <Route path="/registrant/reMyPage" element={<ReMyPage/>}/>
                    <Route path="/admin/adMyPage" element={<AdMyPage/>}/>
                    <Route path="/admin/adUpdate" element={<AdUpdate/>}/>
                    <Route path="/admin/menu" element={<Menu/>}/>
                    <Route path={"/reservation/showAll"} element={<ReservationAll/>}/>
                    <Route path={"/reservation/registrant"} element={<Registrant/>}/>
                    <Route path={"/reservation/admin"} element={<Admin/>}/>
                    <Route path={"/reservation/showOne/:id"} element={<ReservationOne/>}/>
                    <Route path={"/reservation/insert"} element={<ReservationInsert/>}/>
                    <Route path={"/review/showAllByHotel/:hotelId"} element={<ShowAll/>}/>
                    <Route path={"/room/update/:id"} element={<RoomUpdate/>}/>
                    <Route path={"/room/insert/:id"} element={<RoomInsert/>}/>
                    <Route path={"/room/management/:id"} element={<ListForProvider/>}/>
                    <Route path={"/room/list/:id"} element={<ListForUser/>}/>
                    <Route path={"/room/test/:id"} element={<Test/>}/>
                    <Route path={"/search"} element={<SearchResult/>}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
