import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Container, Form, FormControl, Image, Table} from "react-bootstrap";
import axios from "axios";
import Address from "../address/Address";

let UpdateHotel = () => {
    let params = useParams()
    let id = parseInt(params.id)
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
            const hotelResponse = await axios.post('http://localhost:8080/hotel/update', hotelDTO, {withCredentials: true});

            if (hotelResponse.status === 200) {
                console.log(inputs.facilities)
                const hotelDescriptionResponse = await axios.post('http://localhost:8080/hotelDescription/update', {
                    hotelId: id,
                    swimmingPool: !!inputs.facilities.swimmingPool,
                    parking: !!inputs.facilities.parking,
                    restaurant: !!inputs.facilities.restaurant,
                    smoking: !!inputs.facilities.smoking,
                    laundryFacilities: !!inputs.facilities.laundryFacilities,
                    fitnessCenter: !!inputs.facilities.fitnessCenter

                });
                const addressResponse = await axios.post("http://localhost:8080/location/update", addressData, {})
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
                let hotelDescriptionResponse = await axios.get('http://localhost:8080/hotelDescription/showOne/' + id)

                if (hotelDescriptionResponse.status === 200) {
                    let hotelAddressResponse = await axios.get("http://localhost:8080/location/" + id)

                    if (hotelAddressResponse.status === 200) {
                        let imgResponse = await axios.get("http://localhost:8080/image/select/" + id)
                        console.log(imgResponse)
                        if (imgResponse.status === 200) {
                            setImgList(imgResponse.data)
                        }
                    }
                    setAddressData(hotelAddressResponse.data)
                }
                setInputs(hotelResponse.data)
                setInputs(hotelDescriptionResponse.data)
            }
        }

        getUpdate()
    }, [])

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <td colSpan={3}>{id}번 호텔 정보 수정하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>호텔이름</td>
                        <td>
                            <FormControl
                                type={'text'}
                                name={'name'}
                                value={inputs.name}
                                onChange={onChange}
                                required/>
                        </td>
                    </tr>
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
                    <tr>
                        <td>시설정보</td>
                        <td>
                            <div className='list'>
                                {categoryList.map(name => (
                                    <label className="checkboxLabel" key={name}>
                                        <input
                                            type="checkbox"
                                            id={name}
                                            value={name}
                                            onChange={(e) => onCheckedItem(e.target.checked, name)}
                                        />
                                        <span>{name}</span>
                                    </label>
                                ))}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>호텔 설명 작성</td>
                        <td>
                            <FormControl as={"textarea"} aria-label={"호텔 설명"} style={{minHeight: '15rem'}}
                                         name={'content'} value={inputs.content} onChange={onChange}/>

                        </td>
                    </tr>
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
                    <tr>
                        <td>전화번호</td>
                        <td>
                        <textarea
                            name={'tel'}
                            className={'form-control'}
                            value={inputs.tel}
                            onChange={onChange}
                            required/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button type={'submit'}>수정하기</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={"text-center"}>
                            <Button onClick={goBack}>뒤로 가기</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}


export default UpdateHotel;