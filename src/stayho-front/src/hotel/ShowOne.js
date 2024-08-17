import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Card, Badge, CarouselItem, CardImg, Carousel} from "react-bootstrap";
import RoomForUser from "../room/RoomForUser";
import RoomForProvider from "../room/RoomForProvider";
import StarRating from './StarRating';

const ShowOne = () => {
    const [data1, setData1] = useState({ id: null, name: '', rating: 0 });
    const [data2, setData2] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState([])

    const params = useParams();
    const id = parseInt(params.id);

    const location = useLocation();
    const memberInfo = location.state?.memberInfo || { id: 'Unknown' };

    const navigate = useNavigate();

    const goToHotelList = () => {
        navigate(-1, { state: { memberInfo: memberInfo }});
    };
    let registrant = memberInfo.role === "ROLE_REGISTRANT";

    const onUpdate = () => {
        navigate(`/hotel/update/${id}`, { state: { memberInfo: memberInfo }});
    };

    const onDelete = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/hotel/delete/${id}`, { withCredentials: true });
            if (response.status === 200) {
                navigate('/hotel/showList', { state: { memberInfo: memberInfo }});
            }
        } catch (e) {
            console.error(e);
            setError("삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        const selectOne = async () => {
            try {
                const resp1 = await axios.get(`http://localhost:8080/hotel/showOne/`+id);
                if (resp1.status === 200) {
                    setData1(resp1.data);
                }
                const resp2 = await axios.get(`http://localhost:8080/hotelDescription/showOne/`+id);
                if (resp2.status === 200) {
                    setData2(resp2.data);
                }
                let imgResponse = await axios.get('http://localhost:8080/image/select/' + id)
                if (imgResponse.status === 200) {
                    setImage(imgResponse.data);
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

    if (data1 === null) return alert("존재하지 않는 게시물입니다!")
    if (loading) return <div className="text-center my-5"><span className="spinner-border"></span> 로딩 중...</div>;
    if (error) return <div className="text-danger text-center my-5">{error}</div>;

    const facilities = JSON.parse(data2.facilities || "{}");

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4 mb-5 bg-white rounded">
                        <Card.Body>
                            <div>
                            <h2 className="text-primary">{data1.name}</h2>
                            <Badge bg="secondary" className="mb-3">글번호: {data1.id}</Badge>
                            <p className="text-muted">작성자: {memberInfo.id}</p>
                            <hr />
                            <StarRating rating={data1.rating} size={32} />
                            <hr />
                        </div>
                        <Carousel>
                            {image.map(
                                img =>
                                    <CarouselItem>
                                        <CardImg variant={"top"}
                                                 src={"http://localhost:8080/image?path=" + encodeURIComponent(img.filepath) + "&name=" + encodeURIComponent(img.filename)}
                                                 style={{height: '25rem', objectFit: 'cover'}}
                                        />
                                    </CarouselItem>
                            )}
                        </Carousel>
                            <h4>편의시설</h4>
                            <Row className="mb-4">
                                {Object.entries(facilities).map(([key, value]) => (
                                    key !== 'hotelId' && value && (
                                        <Col md={4} key={key} className="mb-3">
                                            <Badge bg="info" className="p-2 w-100 text-uppercase">{key.replace(/([A-Z])/g, ' $1')}</Badge>
                                        </Col>
                                    )
                                ))}
                            </Row>
                            <hr/>
                            {
                                registrant ?
                                    <RoomForProvider hotelId={id}/>:<RoomForUser hotelId={id}/>
                            }
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