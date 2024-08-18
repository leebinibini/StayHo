import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Card, Badge, CarouselItem, Carousel} from "react-bootstrap";

const ShowOne = () => {
    let [data1, setData1] = useState({});
    let [data2, setData2] = useState({});
    let [images, setImages] = useState([])
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    let params = useParams();
    let id = parseInt(params.id);

    let navigate = useNavigate();
    let goToHotelList = () => {
        navigate('/hotel/showList');
    };

    let onUpdate = () => {
        navigate('/hotel/update/' + id);
    };

    let onDelete = async () => {
        try {
            let response = await axios.get("http://localhost:8080/hotel/delete/" + id);
            if (response.status === 200) {
                navigate('/hotel/showList');
            }
        } catch (e) {
            console.error(e);
            setError("삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp1 = await axios.get('http://localhost:8080/hotel/showOne/' + id);
                if (resp1.status === 200) {
                    setData1(resp1.data.hotel);
                    setImages(resp1.data.image)

                }
                let resp2 = await axios.get('http://localhost:8080/hotelDescription/showOne/' + id);
                if (resp2.status === 200) {
                    setData2(resp2.data);
                }
            } catch (e) {
                console.error(e);
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };
        selectOne();
    }, [id]);


    if (loading) return <div className="text-center my-5"><span className="spinner-border"></span> 로딩 중...</div>;
    if (error) return <div className="text-danger text-center my-5">{error}</div>;

    const facilities = JSON.parse(data2.facilities || "{}");

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4 mb-5 bg-white rounded">
                        <Card.Body>
                            <h2 className="text-primary">{data1.name}</h2>
                            <Badge bg="secondary" className="mb-3">글번호: {data1.id}</Badge>
                            <hr />
                            <Carousel>
                                {images?.map(img => (
                                    <CarouselItem key={img.id}>
                                        <Card.Img
                                            variant="top"
                                            src={"http://localhost:8080/image/" + img.filepath + "/" + img.filename}
                                            style={{border: 'black 1px solid', height: '50vh'}}
                                        />
                                    </CarouselItem>

                                ))}
                            </Carousel>
                            <hr />
                            <h4>편의시설</h4>
                            <Row className="mb-4">
                                {Object.entries(data2).map(([key, value]) => (
                                    key !== 'hotelId' && value && (
                                        <Col md={4} key={key} className="mb-3">
                                            <Badge bg="info" className="p-2 w-100 text-uppercase">{key.replace(/([A-Z])/g, ' $1')}</Badge>
                                        </Col>
                                    )
                                ))}
                            </Row>
                            <hr />
                            <div className="text-center">
                                <Button variant="primary" onClick={onUpdate} className="mx-2 px-4">수정하기</Button>
                                <Button variant="danger" onClick={onDelete} className="mx-2 px-4">삭제하기</Button>
                                <Button variant="secondary" onClick={goToHotelList} className="mx-2 px-4">호텔 목록으로 가기</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ShowOne;