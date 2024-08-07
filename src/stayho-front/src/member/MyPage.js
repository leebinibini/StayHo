import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import {Button, Container, Table} from "react-bootstrap";

let MyPage = () => {
    let location = useLocation()
    let memberInfo = location.state.memberInfo

    /*useEffect(() => {
        let authMember = async () => {
            try{
                let response = await axios.get('http://localhost:8080/member/authSuccess', {
                    withCredentials: true
                }
                if(response.status === 200){
                    memberInfo = response.data
                }
            }catch (error){
                error('error', error)
            }
            authMember()
        }
    }, []);
*/
    let onLogOut = async() => {

            let response = await axios.post('http://localhost:8080/member/logout',{
                withCredentials: true
            })
            if(response.status === 200){
                navigate('/')
            }
        }

    let navigate = useNavigate()
    let onUpdate = () => {
        navigate('/member/update', {state: {memberInfo:memberInfo}})
    }
    let onSecede = () => {
        navigate('/member/secede', {state: {memberInfo:memberInfo}})
    }
 return(
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
                 <td> 이메일: {memberInfo.email}</td>
             </tr>
             <tr>
                 <td> 이름: {memberInfo.name}</td>
             </tr>
             <tr>
                 <td> 전화번호: {memberInfo.tel}</td>
             </tr>
             </tbody>
         </Table>
     </Container>
 )
}

export default MyPage