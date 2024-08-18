import React, {useEffect, useState} from "react"
import {Button, Container, Row, Col, Card, CarouselItem, CardImg, Carousel} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import HotelCard from "./HotelCard";


let ShowList = () => {
    let [data, setData] = useState([]);
    let location = useLocation();
    let state = location.state;
    let memberInfo = state ? state.memberInfo : null;

    let navigate = useNavigate();

    let moveToSingle = (id) => {
        navigate(`/hotel/showOne/` + id, {state:{memberInfo:memberInfo}});
    };

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/hotel/showList")
                .catch((e) => {
                    console.error(e);
                });

            if (resp.status === 200) {
                setData(resp.data.hotelList)
            }
        };
        selectList();
    }, []);

    return (
        <Container className="mt-4">
            <Row>
                {data.map(h => (
                    <Col md={4} className="mb-4" key={h.id}>
                        <HotelCard hotel={h} moveToSingle={moveToSingle}
                                   memberInfo={memberInfo}/>
                    </Col>
                ))}
            </Row>
        </Container>

    );
}

export default ShowList;