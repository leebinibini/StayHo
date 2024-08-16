import React, {useEffect, useState} from "react";
import {Button, Container, Row, Col, Card, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import SearchForm from "../search/SearchForm";

let ShowList = () => {
    let location = useLocation();

    let memberInfo = (location.state && location.state.memberInfo) || null;
    let member = !!memberInfo;

    console.log(memberInfo);

    let navigate = useNavigate();

    let onWrite = async () => {
        navigate('/hotel/write');
    };

    let onLogOut = async () => {
        let response = await axios.post('http://localhost:8080/member/logout', {
            withCredentials: true
        });
        if (response.status === 200) {
            navigate('/');
        }
    };

    let onAuth = () => {
        navigate("/member/auth");
    };

    let onRegister = () => {
        navigate("/member/register");
    };

    let onMyPage = () => {
        if (memberInfo !== null) {
            navigate('/member/myPage', {state: {memberInfo: memberInfo}});
        }
    };

    let onHotelWrite = () => {
        navigate('/registrant/reAuth');
    };

    let onReservation = () => {
        if(memberInfo.role === "ROLE_USER"){
            navigate('/reservation/showAll', {state: {memberInfo: memberInfo}});
        } else if(memberInfo.role === "ROLE_REGISTRANT"){
            navigate('/reservation/registrant', {state: {memberInfo: memberInfo}});
        }
    }

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col className="text-end">
                    {member ? (
                        <>
                            <Button variant="outline-primary" className="mx-2" onClick={onReservation}>내예약</Button>
                            <Button variant="outline-primary" className="mx-2" onClick={onMyPage}>마이페이지</Button>
                            <Button variant="outline-danger" className="mx-2" onClick={onLogOut}>로그아웃</Button>
                        </>
                    ) : (
                        <>
                            <div className="text-xl-center mb-2">로그인이 되지 않은 리스트</div>
                            <Button variant="outline-primary" className="mx-2" onClick={onAuth}>로그인</Button>
                            <Button variant="outline-success" className="mx-2" onClick={onRegister}>회원가입</Button>
                            <Button variant="outline-warning" className="mx-2" onClick={onHotelWrite}>숙박시설 등록하기</Button>
                        </>
                    )}
                    <Button variant="outline-warning" className="mx-2" onClick={onWrite}>호텔 등록하기</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ShowList;