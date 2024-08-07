import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Container, Form, FormControl, Table} from "react-bootstrap";
import axios from "axios";

let Update = () => {
    let params = useParams()
    let id = parseInt(params.id)

    let [inputs, setInputs] = useState({
        name: '',
        tel: ''
    })

    const [checkedList, setCheckedList] = useState([]);

    const onCheckedItem = useCallback(
        (checked, item) => {
            if (checked) {
                setCheckedList((prev) => [...prev, item]);
            } else {
                setCheckedList((prev) => prev.filter((el) => el !== item));
            }
        },
        []
    )

    let categoryList = [
        { name: '수영장' },
        { name: '주차장' },
        { name: '식당' },
        { name: '비흡연구역' },
        { name: '세탁시설' },
        { name: '휘트니스센터' }
    ]

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

        // if (inputs.providerName == userInfo.id) {
            let resp = await axios.post("http://localhost:8080/hotel/update", inputs);

            if (resp.status === 200) {
                console.log(resp.data)
                moveToNext(id)
            }
        // }

    }

    let navigate = useNavigate();
    let goBack= () => {
        navigate(-1)
    }

    useEffect(() => {
        let getUpdate = async () => {
            let resp = await axios.get('http://localhost:8080/hotel/showOne/' + id)

            if (resp.status === 200) {
                setInputs(resp.data)
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
                            {categoryList.map((item) => {
                                return (
                                    <label className='checkboxLabel' key={item.name}>
                                        <input
                                            type='checkbox'
                                            id={item.name}
                                            onChange={(e) => {
                                                onCheckedItem(e.target.checked, e.target.id);
                                            }}
                                        />
                                        <span>{item.name}</span>
                                    </label>
                                );
                            })}
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

let CheckFacilities = () => {
    return (
        <Form>
        <div key={'checkbox'} className="mb-3">
                <Form.Check type={'checkbox'} id={`check-api-${'checkbox'}`}>
                    <Form.Check.Input type={'checkbox'} isValid/>
                    <Form.Check.Label>{`Custom api ${'checkbox'}`}</Form.Check.Label>
                </Form.Check>
            </div>
        </Form>
    )
}

export default Update;