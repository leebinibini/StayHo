import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import {Button, Container, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

let ReMyPage = () => {
    let location = useLocation()
    let registrantInfo = location.state.registrantInfo


    let onLogOut = async () => {

        let response = await axios.post('http://localhost:8080/member/logout', {
            withCredentials: true
        })
        if (response.status === 200) {
            navigate('/')
        }
    }

    let navigate = useNavigate()
    let onUpdate = () => {
        navigate('/registrant/reUpdate', {state: {registrantInfo: registrantInfo}})
    }
    let onSecede = () => {
        navigate('/registrant/reSecede', {state: {registrantInfo: registrantInfo}})
    }
    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <td colSpan={3} className={'text-end'}>
                        <Button onClick={onLogOut}>로그아웃</Button>
                        <Button onClick={onUpdate}>내 정보 수정하기</Button>
                        <Button onClick={onSecede}>탈퇴하기</Button>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>마이페이지</td>
                </tr>
                <tr>
                    <td> 이메일: {registrantInfo.email}</td>
                </tr>
                <tr>
                    <td> 이름: {registrantInfo.name}</td>
                </tr>
                <tr>
                    <td> 전화번호: {registrantInfo.tel}</td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}
export default ReMyPage