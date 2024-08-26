import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import ReservationAll from "./reservation/user/ReservationAll";
import ReservationOne from "./reservation/user/ReservationOne";
import ReservationInsert from "./reservation/user/ReservationInsert";
import RoomInsert from "./room/RoomInsert";
import RoomUpdate from "./room/RoomUpdate";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import SearchResult from "./search/SearchResult";
import SearchForm from "./search/SearchForm";
import ShowAll from "./review/hotelReviewList/ShowAll";
import Registrant from "./reservation/registerant/Registrant";
import Admin from "./reservation/admin/Admin";
import ReservationAdmin from "./reservation/admin/Admin";
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
import AdMyPage from "./admin/AdMyPage";
import Menu from "./admin/Menu";
import ShowOne from "./hotel/ShowOne";
import UpdateHotel from "./hotel/UpdateHotel";
import WriteHotel from "./hotel/WriteHotel";
import MemberUpdate from "./member/MemberUpdate";
import AdUpdate from "./admin/AdUpdate";
import MemberAdmin from "./admin/MemberAdmin";
import RegistrantAdmin from "./admin/RegistrantAdmin";
import MemUpdate from "./admin/MemUpdate";
import ReviewList from "./review/memberReviewList/ReviewList";
import RegiUpdate from "./admin/RegiUpdate";

import Main from "./main/Main";
import React from "react";

function App() {
    const location = useLocation();
    const hideSearchFormPaths = [
        "/member/auth",
        "/member/register",
        "/member/memberUpdate",
        "/reservation/showAll",
        "/reservation/registrant",
        "/reservation/admin",
        "/member/myPage"
    ];

    // Determine if SearchForm should be shown
    const showSearchForm = !hideSearchFormPaths.some(path =>
        location.pathname.startsWith(path) || location.pathname.includes('/reservation/showOne/')||
        location.pathname.includes('/review/showAllByMember/')
    );

    return (
        <div>
            <Main/>
            {showSearchForm && <SearchForm/>}
            <Routes>
                <Route path="/" element={<ShowList/>}/>
                <Route path="/member/auth" element={<Auth/>}/>
                <Route path="/member/register" element={<Register/>}/>
                <Route path="/member/memberUpdate" element={<MemberUpdate/>}/>
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
                <Route path={"/reservation/showAll"} element={<ReservationAll/>}/>
                <Route path={"/reservation/registrant"} element={<Registrant/>}/>
                <Route path={"/reservation/admin"} element={<Admin/>}/>
                <Route path={"/reservation/showOne/:id"} element={<ReservationOne/>}/>
                <Route path={"/reservation/insert"} element={<ReservationInsert/>}/>
                <Route path={"/review/showAllByHotel/:hotelId"} element={<ShowAll/>}/>
                <Route path={"/review/showAllByMember/:memberId"} element={<ReviewList/>}/>
                <Route path={"/room/update/:id"} element={<RoomUpdate/>}/>
                <Route path={"/room/insert/:id"} element={<RoomInsert/>}/>
                <Route path={"/search"} element={<SearchResult/>}/>
                <Route path={"/admin/memberAdmin"} element={<MemberAdmin/>}/>
                <Route path={"/admin/registrantAdmin"} element={<RegistrantAdmin/>}/>
                <Route path={"/admin/memUpdate"} element={<MemUpdate/>}/>
                <Route path="/hotel/showList" element={<ShowList/>}/>
                <Route path="/hotel/showOne/:id" element={<ShowOne/>}/>
                <Route path="/hotel/write" element={<WriteHotel/>}/>
                <Route path="/hotel/update/:id" element={<UpdateHotel/>}/>
            </Routes>
        </div>
    );
}

export default App;
