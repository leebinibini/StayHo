import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

let ShowList = () => {
    let [data, setData] = useState({ hotelList: [] });
    let location = useLocation();
    let state = location.state;
    console.log(state);

    let navigate = useNavigate();

    let moveToSingle = (id) => {
        navigate(`/hotel/showOne/` + id);
    };

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
        if (state !== null) {
            let memberInfo = state.memberInfo;
            navigate('/member/myPage', { state: { memberInfo: memberInfo } });
        }
    };

    let onHotelWrite = () => {
        navigate('/registrant/reAuth');
    };

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/hotel/showList")
                .catch((e) => {
                    console.error(e);
                });

            if (resp.status === 200) {
                setData(resp.data);
            }
        };
        selectList();
    }, []);

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col className="text-end">
                    {state ? (
                        <>
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
            <Row>
                {data.hotelList.map(h => (
                    <Col md={4} className="mb-4" key={h.id}>
                        <HotelCard hotel={h} moveToSingle={moveToSingle} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

let HotelCard = ({ hotel, moveToSingle }) => {
    return (
        <Card className="shadow-sm h-100">
            <Card.Img
                variant="top"
                src={hotel.imageUrl ? hotel.imageUrl : "default-image-url"}
                alt={hotel.name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text>
                    {hotel.tel}
                </Card.Text>
                <Button variant="primary" onClick={() => moveToSingle(hotel.id)} className="mt-auto">호텔 상세보기</Button>
            </Card.Body>
        </Card>
    );
}

export default ShowList;