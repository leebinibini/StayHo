import React from "react";
import {Button, Container, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

let ShowList = () => {
    let location = useLocation()
    let memberInfo = location.state.memberInfo

    let navigate = useNavigate()

    let onLogOut = async() => {
        try{
            let response = await axios.post('http://localhost:8080/member/logout',{
                withCredentials: true
            })
            if(response.status === 200){
                navigate('/member/logOutSuccess')
            }
        }catch(error){
            console.log(error)
        }
    }


    let onMyPage = () => {
        console.log(memberInfo)
        navigate('/member/myPage', {state: {memberInfo:memberInfo}})
    }

   /* let onRegisterPage = () => {
        navigate('/member/admin')
    }*/

    return(
        <>
            <Container>
                <Table>
                    <thead>
                    <tr>
                        <td colSpan={3} className={'text-end'}>
                            <Button onClick={onMyPage}>마이페이지</Button>
                            <Button onClick={onLogOut}>로그아웃</Button>
                            {/*<Button onClick={onRegisterPage}>등록하러 가기</Button>*/}
                        </td>
                    </tr>
                    </thead>
                </Table>
            </Container>
        </>
    )
}


export default ShowList;