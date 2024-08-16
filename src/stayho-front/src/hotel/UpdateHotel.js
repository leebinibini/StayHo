import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, FormControl, Row, Table} from "react-bootstrap";
import axios from "axios";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let UpdateHotel = () => {
    let params = useParams()
    let id = parseInt(params.id)

    // let location = useLocation()
    // let userInfo = location.state.userInfo

    let [inputs, setInputs] = useState({
        name: '',
        tel: '',
        content: '',
        facilities: {}
    })

    const categoryList = ['swimmingPool', 'parking', 'restaurant', 'smoking', 'laundryFacilities', 'fitnessCenter'];

    const onCheckedItem = useCallback((checked, item) => {
        setInputs(prev => ({
            ...prev,
            facilities: checked ? {...prev.facilities, [item]: 'true'} : Object.fromEntries(Object.entries(prev.facilities).filter(([key]) => key !== item))
        }));
    }, []);

    let onChange = (e) => {
        let {name, value}= e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onEditorChange = (event, editor) => {
        const data = editor.getData();
        setInputs(prev => ({ ...prev, content: data }));
    };

    let moveToNext = (id) => {
        navigate(`/hotel/ShowOne/${id}`)
    }

    let onSubmit = async (e) => {
        e.preventDefault()

        // if (inputs.writerId === userInfo.id) {
        //     let resp = await axios.post(`http://localhost:8080/board/update`, inputs, {
        //         withCredentials: true
        //     })
        //     if (resp.status===200) {
        //         moveToNext(resp.data.destId)
        //     }
        // }

        try {
            const hotelResponse = await axios.post('http://localhost:8080/hotel/update', {
                name: inputs.name,
                tel: inputs.tel,
                content: inputs.content
            });

            const hotelId = hotelResponse.data.resultId;

            console.log(hotelResponse.data.resultId);

            if (hotelId) {
                console.log(inputs.facilities)
                const hotelDescriptionResponse = await axios.post('http://localhost:8080/hotelDescription/update', {
                    hotelId: hotelId,
                    swimmingPool: !!inputs.facilities["Swimming Pool"],
                    parking: !!inputs.facilities.Parking,
                    restaurant: !!inputs.facilities.Restaurant,
                    smoking: !!inputs.facilities["Smoking Area"],
                    laundryFacilities: !!inputs.facilities["Laundry Facilities"],
                    fitnessCenter: !!inputs.facilities["Fitness Center"]

                });

                console.log(inputs, hotelDescriptionResponse.data);
                navigate(`/hotel/showOne/${hotelId}`);
            }
        } catch (error) {
            console.error("An error occurred during the request:", error);
        }

    };

    let navigate = useNavigate();
    let goBack= () => {
        navigate(-1)
    }

    // 얘도 withCredentials:true 추가 필요
    useEffect(() => {
        const getUpdate = async () => {
        let hotelResponse = await axios.get('http://localhost:8080/hotel/showOne/' + id);

        if (hotelResponse.status === 200) {
            const facilities = hotelResponse.data.facilities || {};
            setInputs(prev => ({
                ...prev,
                ...hotelResponse.data,
                content: hotelResponse.data.content || '',  // content가 없는 경우 빈 문자열로 설정
                facilities: {
                    ...facilities,
                    "Swimming Pool": facilities["Swimming Pool"] || false,
                    "Parking": facilities["Parking"] || false,
                    "Restaurant": facilities["Restaurant"] || false,
                    "Smoking Area": facilities["Smoking Area"] || false,
                    "Laundry Facilities": facilities["Laundry Facilities"] || false,
                    "Fitness Center": facilities["Fitness Center"] || false
                }
            }));
        }
    };

    getUpdate();
}, [id]);

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
)
}


export default UpdateHotel;