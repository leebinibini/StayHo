import React, {useCallback, useState} from "react";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InsertAddress from "../address/InsertAddress";

const Write = () => {
    const [inputs, setInputs] = useState({
        name: '',
        tel: '',
        content: '',
        facilities: {},
    });
    const navigate = useNavigate();

    const categoryList = ['swimmingPool', 'parking', 'restaurant', 'smoking', 'laundryFacilities', 'fitnessCenter'];

    const onCheckedItem = useCallback((e) => {
        if (e && e.target) {
            const {checked, value} = e.target;
            setInputs(prev => ({
                ...prev,
                facilities: checked
                    ? {...prev.facilities, [value]: 'true'}
                    : Object.fromEntries(Object.entries(prev.facilities).filter(([key]) => key !== value))
            }));
        } else {
            console.error("Event or event.target is undefined");
        }
    }, []);

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    };

    const [imgList, setImgList] = useState([])
    const onFileChange = (e) => {
        setImgList([
            ...imgList,
            ...e.target.files
        ])
    };

    // 주소 관련
    let [modalState, setModalState] = useState(false)
    let [addressData, setAddressData] = useState({})
    let onPopup = () => {
        setModalState(true)
    }

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
            })], {type: "application/json"}));

            imgList.map(image => {
                formData.append('files', image)
            })
            formData.append("address", new Blob([JSON.stringify(addressData)], {type: 'application/json'}))
            const hotelResponse = await axios.post(
                'http://localhost:8080/hotel/write', formData,
                {headers: {'Content-Type': 'multipart/form-data', charset: 'UTF-8'}}
            );

            const hotelId = hotelResponse.data.resultId;

            if (hotelId) {
                await axios.post('http://localhost:8080/hotelDescription/write', {
                    hotelId: hotelId,
                    swimmingPool: !!inputs.facilities.swimmingPool,
                    parking: !!inputs.facilities.parking,
                    restaurant: !!inputs.facilities.restaurant,
                    smoking: !!inputs.facilities.smoking,
                    laundryFacilities: !!inputs.facilities.laundryFacilities,
                    fitnessCenter: !!inputs.facilities.fitnessCenter
                });

                navigate(`/hotel/showOne/${hotelId}`);
            }
        } catch (error) {
            console.error("An error occurred during the request:", error);
        }
    };

    return (
        <Container className="mt-3">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <th colSpan={2} className="text-center">호텔 등록하기</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>호텔이름</td>
                        <td>
                            <FormControl
                                type="text"
                                value={inputs.name}
                                name="name"
                                onChange={onChange}
                                required
                            />
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
                                <InsertAddress setModalState={setModalState} modalState={modalState}
                                               setAddressData={setAddressData}/>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>시설정보</td>
                        <td>
                            <div className="list">
                                {categoryList.map(name => (
                                    <label className="checkboxLabel" key={name}>
                                        <input
                                            type="checkbox"
                                            id={name}
                                            value={name}
                                            onChange={onCheckedItem}
                                        />
                                        <span>{name}</span>
                                    </label>
                                ))}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td>
                            <FormControl
                                type="text"
                                value={inputs.tel}
                                name="tel"
                                onChange={onChange}
                                required
                            />
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
                        <td><FormControl type="file" multiple={true} onChange={onFileChange}
                                         accept={'image.jpg,image/png,image/jpeg'}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-center">
                            <Button type="submit">작성하기</Button>
                            <Button onClick={() => navigate(-1)}>취소하기</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

export default Write;