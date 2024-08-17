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

    useEffect(() => {
        let selectList = async () => {

            // axios를 사용하여 url로 부터 응답을 받아오고, 만약 에러 발생시 콘솔 창에 출력한다.
            let resp = await axios
                .get("http://localhost:8080/hotel/showList")
                .catch((e) => {
                    console.error(e)
                })

            if (resp.status === 200) {
                setData(resp.data)
            }
        };
        selectList();
    }, []);

    return (
        <Container className="mt-4">
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