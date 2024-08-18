import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, Image, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import React from "react";
import axios from "axios";

let Menu = () => {
    let navigate = useNavigate()
    let location = useLocation()
    let adminInfo = location.state.adminInfo

    let reservationAdmin = () => {
        navigate("/reservation/admin", {state:{adminInfo: adminInfo}})
    }

    let onMyPage = () => {
        navigate("/admin/adMyPage", {state: {adminInfo: adminInfo}})
    }
    let onMemberAdmin = ()=> {
        navigate("/admin/memberAdmin", {state:{adminInfo:adminInfo}})
    }
    let onRegistrantAdmin = () => {
        navigate("/admin/registrantAdmin", {state:{adminInfo:adminInfo}} )
    }
    let onLogOut = async () => {
        let response = await axios.post('http://localhost:8080/member/logout', {
            withCredentials: true
        })
        if (response.status === 200) {
            navigate('/')
        }
    }
    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <td colSpan={3} style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            onClick={() => navigate("/", { state: { adminInfo: adminInfo } })}
                            src={"http://localhost:8080/image?path=" + encodeURIComponent("logo") + "&name=" + encodeURIComponent("StayHo_Logo.png")}
                            style={{ width: '150px', height: 'auto', marginRight: 'auto' }} // 이미지 왼쪽 정렬
                            alt="StayHo Logo"
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button onClick={onLogOut}>로그아웃</Button>
                            <Button onClick={reservationAdmin}>예약정보(관리자)</Button>
                            <Button onClick={onMyPage}>마이페이지</Button>
                            <Button onClick={onMemberAdmin}>일반 회원 정보 관리하기</Button>
                            <Button onClick={onRegistrantAdmin}>등록자 회원 정보 관리하기</Button>
                        </div>
                    </td>
                </tr>
                </thead>
            </Table>
        </Container>
    )
}
export default Menu