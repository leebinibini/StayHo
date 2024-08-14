import React, {useEffect, useState} from "react"
import {Button, Container, Table, Card} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import Auth from "../member/Auth";


let ShowList = () => {
    let [data, setData] = useState({hotelList: []})
    let location = useLocation()
    let state = location.state
    console.log(state)

    let navigate = useNavigate()

    let moveToSingle = (id) => {
        navigate(`/hotel/showOne/` + id);
    };

    let onWrite = async (e) => {
        navigate('/hotel/write')
    }

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


    useEffect(() => {
        let selectList = async () => {

            // axios를 사용하여 url로 부터 응답을 받아오고, 만약 에러 발생시 콘솔 창에 출력한다.
            let resp = await axios
                .get("http://localhost:8080/hotel/showList")
                .catch((e) => {
                    console.error(e)
                })

            // 정상적으로 통신되었을 때, 받은 응답 내 데이터를 setData해준다.
            if (resp.status === 200) {
                setData(resp.data)
            }
        }

        // 설정한 selectList 함수 실행, [] 은 초기 렌더링시 한번만 실행
        selectList()
    }, [])


    return (
        <>
            <Container onSubmit={onWrite}>
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
                        <td colSpan={3} className={'text-end'}>
                            <Button onClick={onWrite}>호텔 등록하기</Button>
                        </td>
                    </tr>
                    </thead>
                </Table>
                {data.hotelList.map(h => (
                    <WithHeaderExample hotel={h} key={h.id} moveToSingle={moveToSingle}/>
                ))}
            </Container>
        </>
    )
}

let WithHeaderExample = ({hotel, moveToSingle}) => {
    return (
        <Card>
            <Card.Header>{hotel.name}</Card.Header>
            <Card.Img
                variant="top"
                src={hotel.imageUrl ? hotel.imageUrl : "default-image-url"} // 호텔의 이미지 URL이 없을 경우 기본 이미지를 표시합니다.
                alt={hotel.name}
            />
            <Card.Body>
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text>
                    {hotel.tel}
                </Card.Text>
                <Button variant="primary" onClick={() => moveToSingle(hotel.id)}>호텔 상세보기</Button>
            </Card.Body>
        </Card>
    );
}

export default ShowList;