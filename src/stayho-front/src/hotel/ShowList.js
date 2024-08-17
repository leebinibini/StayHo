import React, { useEffect, useState } from "react";
import {Button, Container, Row, Col} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import HotelCard from "./HotelCard"; // 찜하기 컴포넌트 가져오기

let ShowList = () => {
    let [data, setData] = useState({ hotelList: [] });
    let location = useLocation();
    let state = location.state;
    let memberInfo = state ? state.memberInfo : null;
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
                        <HotelCard hotel={h} moveToSingle={moveToSingle}
                        memberInfo={memberInfo}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ShowList;