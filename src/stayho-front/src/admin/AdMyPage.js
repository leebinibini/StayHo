import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, Table} from "react-bootstrap";
import React from "react";

let AdMyPage = () => {
    let navigate = useNavigate()
    let location = useLocation()
    let adminInfo = location.state.adminInfo

    let onLogOut = async () => {
        let response = await axios.post('http://localhost:8080/member/logout', {
            withCredentials: true
        })
        if (response.status === 200) {
            navigate('/')
        }
    }

    let onMenu = () => {
        navigate("/admin/menu", {state: {adminInfo:adminInfo}})
    }
    

    let onUpdate = () => {
        navigate('/admin/adUpdate', {state: {adminInfo: adminInfo}})
    }

    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <td colSpan={3} className={'text-end'}>
                        <Button onClick={onLogOut}>로그아웃</Button>
                        <Button onClick={onUpdate}>내 정보 수정하기</Button>
                        <Button onClick={onMenu}>관리자 메뉴</Button>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>마이페이지</td>
                </tr>
                <tr>
                    <td> 이메일: {adminInfo.email}</td>
                </tr>
                <tr>
                    <td> 이름: {adminInfo.name}</td>
                </tr>
                <tr>
                    <td> 전화번호: {adminInfo.tel}</td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )

}
export default AdMyPage