import React, { useCallback, useState } from "react";
import {Button, Container, Form, Row, Col, Card, FormControl, FormText} from "react-bootstrap";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const WriteHotel = () => {
    let location = useLocation();
    let registrantInfo = location.state.registrantInfo;

    const [inputs, setInputs] = useState({
        name: '',
        tel: '',
        content: '',
        facilities: {}
    });

    let [imgList, setImgList] = useState([])
    let onChangeImg = (e) => {
        setImgList([
            ...imgList,
            ...e.target.files
        ])
    }
    const navigate = useNavigate();

    const categoryList = [
        'Swimming Pool',
        'Parking',
        'Restaurant',
        'Smoking Area',
        'Laundry Facilities',
        'Fitness Center'
    ];

    const onCheckedItem = useCallback((e) => {
        if (e && e.target) {
            const { checked, value } = e.target;
            setInputs(prev => ({
                ...prev,
                facilities: {
                    ...prev.facilities,
                    [value]: checked // 체크박스가 체크되면 true, 해제되면 false
                }
            }));
        }
    }, []);

    let onChange = (e) => {
        let { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    console.log(registrantInfo.id)
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('hotelDTO', new Blob( [JSON.stringify({
                name: inputs.name,
                tel: inputs.tel,
                content: inputs.content,
                facilities: inputs.facilities,
                memberId: registrantInfo.id
            })], { type: "application/json" }));

            imgList.map(image => {
                formData.append('files', image)
            })
            console.log(formData)
            const hotelResponse = await axios.post('http://localhost:8080/hotel/write', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', charset:'UTF-8'
                }
            });
            console.log("호텔응답 데이터" + hotelResponse.data)
            const hotelId = hotelResponse.data.resultId;
            console.log(inputs.facilities)
            console.log(hotelId)

            if (hotelId) {
                let response2 = await axios.post('http://localhost:8080/hotelDescription/write', {
                    hotelId,
                    swimmingPool: !!inputs.facilities["Swimming Pool"],
                    parking: !!inputs.facilities["Parking"],
                    restaurant: !!inputs.facilities["Restaurant"],
                    smoking: !!inputs.facilities["Smoking Area"],
                    laundryFacilities: !!inputs.facilities["Laundry Facilities"],
                    fitnessCenter: !!inputs.facilities["Fitness Center"]
                });


                navigate(`/hotel/showOne/${hotelId}`, { state: { memberInfo: registrantInfo }});
            }
        } catch (error) {
            console.error("An error occurred during the request:", error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4 mb-5 bg-white rounded">
                        <Card.Body>
                            <h3 className="text-center mb-4">호텔 등록하기</h3>
                            <Form onSubmit={onSubmit} encType="multipart/form-data">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>호텔 이름</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            value={inputs.name}
                                            name="name"
                                            onChange={onChange}
                                            required
                                            placeholder="호텔 이름을 입력하세요"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>전화번호</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            value={inputs.tel}
                                            name="tel"
                                            onChange={onChange}
                                            required
                                            placeholder="전화번호를 입력하세요"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>호텔 설명 작성</Form.Label>
                                    <FormControl type={'content'} name={'content'} vaule={inputs.content}
                                                 onChange={onChange}
                                                 defaultValue={inputs.content}/>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>호텔 이미지 업로드</Form.Label>
                                    <Form.Control type="file" multiple={true} onChange={onChangeImg}
                                                 accept={'image.jpg,image/png,image/jpeg'}/>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>편의시설</Form.Label>
                                    <Row>
                                        {categoryList.map(name => (
                                            <Col md={6} key={name}>
                                                <Form.Check
                                                    type="checkbox"
                                                    label={name}
                                                    id={name}
                                                    value={name}
                                                    onChange={onCheckedItem}
                                                    checked={!!inputs.facilities[name]} // 체크 여부를 상태와 연결
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Form.Group>
                                <div className="text-center">
                                    <Button type="submit" variant="primary" className="mx-2">작성하기</Button>
                                    <Button variant="secondary" className="mx-2" onClick={() => navigate(-1)}>취소하기</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WriteHotel;