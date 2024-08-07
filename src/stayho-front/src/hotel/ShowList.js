import React, {useEffect, useState} from "react"
import {Button, Container, Table, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";



let ShowList = () => {
    let [data, setData] = useState({hotelList: []})
    let navigate = useNavigate()

    let moveToSingle = (id) => {
        navigate(`/hotel/showOne/` + id);
    };



    let onWrite = async (e) => {
        navigate('/hotel/write')
    }

    let logOut = () => {
        navigate('/')
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


    return(
        <>
            <Container onSubmit={onWrite}>
                <Table>
                    <thead>
                    <tr>
                        <td colSpan={3} className={'text-end'}>
                            <Button onClick={onWrite}>호텔 등록하기</Button>
                            <Button onClick={logOut}>
                                로그아웃
                            </Button>
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
            <Card.Header>무슨 호텔~~</Card.Header>
            <Card.Img variant="top" src="" />
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
