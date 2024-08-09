import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Container, Form, FormControl, Table} from "react-bootstrap";
import axios from "axios";

let Update = () => {
    let params = useParams()
    let id = parseInt(params.id)

    let [inputs, setInputs] = useState({
        name: '',
        tel: '',
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

    let moveToNext = (id) => {
        navigate(`/hotel/ShowOne/${id}`)
    }

    let onSubmit = async (e) => {
        e.preventDefault()

        try {
            const hotelResponse = await axios.post('http://localhost:8080/hotel/update', {
                name: inputs.name,
                tel: inputs.tel
            });

            const hotelId = hotelResponse.data.resultId;

            console.log(hotelResponse.data.resultId);

            if (hotelId) {
                console.log(inputs.facilities)
                const hotelDescriptionResponse = await axios.post('http://localhost:8080/hotelDescription/update', {
                    hotelId: hotelId,
                    swimmingPool: !!inputs.facilities.swimmingPool,
                    parking: !!inputs.facilities.parking,
                    restaurant: !!inputs.facilities.restaurant,
                    smoking: !!inputs.facilities.smoking,
                    laundryFacilities: !!inputs.facilities.laundryFacilities,
                    fitnessCenter: !!inputs.facilities.fitnessCenter

                });

                console.log(inputs, hotelDescriptionResponse.data);
                navigate(`/hotel/showOne/${hotelId}`);
            }
        } catch (error) {
            console.error(error);
        }

    };

    let navigate = useNavigate();
    let goBack= () => {
        navigate(-1)
    }

    useEffect(() => {
        let getUpdate = async () => {
            let hotelResponse = await axios.get('http://localhost:8080/hotel/showOne/' + id)

            if (hotelResponse.status === 200) {
                let hotelDescriptionResponse = await axios.get('http://localhost:8080/hotelDescription/showOne/' + id)

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


export default Update;