import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, FormControl, Image, Table, Row} from "react-bootstrap";
import axios from "axios";
import Address from "../address/Address";

let UpdateHotel = () => {
    let params = useParams()
    let id = parseInt(params.id)

    //let location = useLocation()
    //let memberInfo = location.state.memberInfo

    let [imgList, setImgList] = useState([])
    let [delImgList, setDelImgList] = useState([])

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
            facilities: checked ? {
                ...prev.facilities,
                [item]: 'true'
            } : Object.fromEntries(Object.entries(prev.facilities).filter(([key]) => key !== item))
        }));
    }, []);


    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let moveToNext = (id) => {
        navigate(`/hotel/ShowOne/${id}`)
    }

    // 주소 관련
    let [modalState, setModalState] = useState(false)
    let [addressData, setAddressData] = useState({})
    let onPopup = () => {
        setModalState(true)
    }

    // 이미지 관련
    let onFileChange = (e) => {
        setImgList([
            ...imgList,
            ...e.target.files
        ])
    }
    let onDelete = (id) => {
        setImgList(imgList.filter((img) => img.id !== id))
        setDelImgList([
            ...delImgList,
            id
        ])
    }
    let onSubmit = async (e) => {
        e.preventDefault()
        const hotelDTO = {
            id: id,
            name: inputs.name,
            tel: inputs.tel,
            content: inputs.content
        }
        try {
            const hotelResponse = await axios.post('http://localhost:8080/hotel/update/'+ id, hotelDTO, {withCredentials: true});

            if (hotelResponse.status === 200) {
                const hotelDescriptionResponse = await axios.post('http://localhost:8080/hotelDescription/update', {
                    hotelId: id,
                    swimmingPool: !!inputs.facilities["swimmingPool"],
                    parking: !!inputs.facilities["parking"],
                    restaurant: !!inputs.facilities["restaurant"],
                    smoking: !!inputs.facilities["smoking"],
                    laundryFacilities: !!inputs.facilities["laundryFacilities"],
                    fitnessCenter: !!inputs.facilities["fitnessCenter"]

                });
                const addressResponse = await axios.post("http://localhost:8080/location/update/" + id, addressData, {})
                const formData = new FormData()
                imgList.map(image => {
                    formData.append('files', image)
                })
                formData.append('delImgList', new Blob([JSON.stringify(delImgList)], {type: 'application/json'}))
                formData.append('hotelId', new Blob([JSON.stringify(id)], {type: 'application/json'}))
                const imgResponse = await axios.post(
                    "http://localhost:8080/image/update/hotel", formData,
                    {
                        headers: {'Content-Type': 'multipart/form-data', charset: 'UTF-8'},
                        withCredentials: true
                    }
                )
                console.log(inputs, hotelDescriptionResponse.data);
                navigate(`/hotel/showOne/${id}`);
            }
        } catch (error) {
            console.error(error);
        }

    };

    let navigate = useNavigate();
    let goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        let getUpdate = async () => {
            let hotelResponse = await axios.get('http://localhost:8080/hotel/showOne/' + id)

        if (hotelResponse.status === 200) {
            const facilities = hotelResponse.data.facilities || {};
            setInputs(prev => ({
                ...prev,
                ...hotelResponse.data,
                content: hotelResponse.data.content || '',  // content가 없는 경우 빈 문자열로 설정
                facilities: {
                    ...facilities,
                    swimmingPool: facilities["swimmingPool"] || false,
                    parking : facilities["parking"] || false,
                    restaurant : facilities["restaurant"] || false,
                    smoking : facilities["smoking"] || false,
                    laundryFacilities : facilities["laundryFacilities"] || false,
                    fitnessCenter : facilities["fitnessCenter"] || false
                }
            }));
        }
            let hotelAddressResponse = await axios.get("http://localhost:8080/location/" + id)

            if (hotelAddressResponse.status === 200) {
                setAddressData(hotelAddressResponse.data)
                let imgResponse = await axios.get("http://localhost:8080/image/select/" + id)
                console.log(imgResponse)
                if (imgResponse.status === 200) {
                    setImgList(imgResponse.data)
                }
            }
    }

    getUpdate()
}, [id])

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4 mb-5 bg-white rounded">
                        <Card.Body>
                            <h3 className="text-center mb-4">{id}번 호텔 정보 수정하기</h3>
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

                                <tr>
                                    <td>
                                        주소
                                    </td>
                                    <td>
                                        {addressData.address}
                                        <Button onClick={onPopup} className={'ms-1'}>
                                            주소찾기
                                            <Address setModalState={setModalState} modalState={modalState}
                                                     setAddressData={setAddressData}/>
                                        </Button>
                                    </td>
                                </tr>
                                <Form.Group className="mb-4">
                                    <Form.Label>호텔 설명 작성</Form.Label>
                                    <FormControl type={'content'} name={'content'} vaule={inputs.content}
                                                 onChange={onChange}
                                                 defaultValue={inputs.content}/>
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

                                <tr>
                                    <td>호텔 사진</td>

                                    <td>
                                        <div className={'d-flex'}>
                                            {imgList.map(img => (
                                                <div className={'justify-content-center'}>
                                                    <Image
                                                        src={"http://localhost:8080/image?path=" + img.filepath + "&name=" + img.filename}
                                                        style={{width: '20rem'}}/>
                                                    <Button onClick={() => onDelete(img.id)} style={{display: 'block'}}
                                                            className={'btn-danger'}>삭제</Button>
                                                </div>
                                            ))}
                                        </div>
                                        <FormControl type="file" multiple={true} onChange={onFileChange}
                                                     accept={'image.jpg,image/png,image/jpeg'}/>
                                    </td>
                                </tr>
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
                                <div className="text-center">
                                    <Button type="submit" variant="primary" className="mx-2">수정하기</Button>
                                    <Button variant="secondary" className="mx-2"
                                            onClick={() => navigate(-1)}>취소하기</Button>
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