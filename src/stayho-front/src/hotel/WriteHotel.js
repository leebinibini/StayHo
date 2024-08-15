import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const WriteHotel = () => {
    const [inputs, setInputs] = useState({
        name: '',
        tel: '',
        content: '',
        facilities: {},
        file: null
    });
    const navigate = useNavigate();

    const categoryList = ['Swimming Pool', 'Parking', 'Restaurant', 'Smoking Area', 'Laundry Facilities', 'Fitness Center'];

    const onCheckedItem = useCallback((e) => {
        if (e && e.target) {
            const { checked, value } = e.target;
            setInputs(prev => ({
                ...prev,
                facilities: {
                    ...prev.facilities,
                    [value]: checked // 체크박스가 체크되었을 때 true, 해제되었을 때 false로 설정
                }
            }));
        } else {
            console.error("Event or event.target is undefined");
        }
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const onFileChange = (e) => {
        setInputs((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const onEditorChange = (event, editor) => {
        if (editor) {
            const data = editor.getData();
            setInputs((prev) => ({ ...prev, content: data }));
        } else {
            console.error("Editor is undefined");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            console.log(inputs);
            formData.append('hotelDTO', new Blob([JSON.stringify({
                name: inputs.name,
                tel: inputs.tel,
                content: inputs.content,
                facilities: inputs.facilities,
            })], { type: "application/json" }));

            if (inputs.file) {
                formData.append('files', inputs.file);
            }

            const hotelResponse = await axios.post('http://localhost:8080/hotel/write', formData);

            const hotelId = hotelResponse.data.resultId;

            if (hotelId) {
                await axios.post('http://localhost:8080/hotelDescription/write', {
                    hotelId: hotelId,
                    swimmingPool: !!inputs.facilities["Swimming Pool"],
                    parking: !!inputs.facilities.Parking,
                    restaurant: !!inputs.facilities.Restaurant,
                    smoking: !!inputs.facilities["Smoking Area"],
                    laundryFacilities: !!inputs.facilities["Laundry Facilities"],
                    fitnessCenter: !!inputs.facilities["Fitness Center"]
                });

                navigate(`/hotel/showOne/${hotelId}`);
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
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={inputs.content}
                                        name={"content"}
                                        config={{
                                            ckfinder: {
                                                uploadUrl: 'http://localhost:8080/hotel/uploads',
                                            }
                                        }}
                                        onChange={onEditorChange}
                                        required
                                    />
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
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>호텔 이미지 업로드</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={onFileChange}
                                        accept="image/*"
                                    />
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