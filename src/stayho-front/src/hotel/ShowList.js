import React from "react";
import {Button, Container, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import Auth from "../member/Auth";


let ShowList = () => {
    let location = useLocation()
    let state = location.state
    console.log(state)

    let navigate = useNavigate()

    let onLogOut = async () => {

        let response = await axios.post('http://localhost:8080/member/logout', {
            withCredentials: true
        })
        if (response.status === 200) {
            navigate('/')
        }
    }
    let onAuth = () => {
        navigate("/member/auth")
    }

    let onRegister = () => {
        navigate("/member/register")
    }

    let onMyPage = () => {
        //console.log(memberInfo)
        if (state !== null) {
            let memberInfo = state.memberInfo
            navigate('/member/myPage', {state: {memberInfo: memberInfo}})
        }
    }

    let onHotelWrite = () => {
        navigate('/registrant/reAuth')
    }


    return (
        <>
            <Container>
                <Table>
                    <thead>
                    <tr>
                        {state ?
                            (<td colSpan={3} className={'text-end'}>
                                    <Button onClick={onMyPage}>마이페이지</Button>
                                    <Button onClick={onLogOut}>로그아웃</Button>
                                </td>
                            ) : (
                                <td colSpan={3} className={'text-end'}>
                                    <td className={'text-xl-center'}>로그인이 되지 않은 리스트</td>
                                    <Button onClick={onAuth}>로그인</Button>
                                    <Button onClick={onRegister}>회원가입</Button>
                                    <Button onClick={onHotelWrite}>숙박시설 등록하러 가기</Button>
                                </td>
                            )}
                    </tr>
                    </thead>
                </Table>
            </Container>
        </>
    )
}


export default ShowList;