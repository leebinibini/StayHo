import React, { useCallback, useState } from "react";
import { Button, Container, FormControl, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

let Write = () => {
    let [inputs, setInputs] = useState({
        name: '',
        tel: '',
        content: '',
        facilities: [],
        file: ''
    });

    const [file, setFile] = useState(null); // 파일 상태 추가
    const [checkedList, setCheckedList] = useState([]);

    const onCheckedItem = useCallback(
        (checked, item) => {
            if (checked) {
                setCheckedList((prev) => [...prev, item]);
            } else {
                setCheckedList((prev) => prev.filter((el) => el !== item));
            }
            setInputs((prev) => ({
                ...prev,
                facilities: checked ? [...prev.facilities, item] : prev.facilities.filter((el) => el !== item)
            }));
        },
        []
    );

    let categoryList = [
        { name: '수영장' },
        { name: '주차장' },
        { name: '식당' },
        { name: '흡연구역' },
        { name: '세탁시설' },
        { name: '휘트니스센터' }
    ];

    let navigate = useNavigate();

    let moveToNext = (id) => {
        navigate(`/hotel/showOne/${id}`);
    };

    let goBack = () => {
        navigate(-1);
    };

    let onChange = (e) => {
        let { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    let onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    let onSubmit = async (e) => {
        e.preventDefault();
        // hotel 입력 정보
        const formData1 = new FormData();
        formData1.append('name', inputs.name);
        formData1.append('tel', inputs.tel);

        try {
            let resp = await axios.post('http://localhost:8080/hotel/write', formData1);

            if (resp.data.resultId !== undefined) {
                moveToNext(resp.data.resultId);
            }
        } catch (error) {
            console.error(error);
        }
        // hotel description 정보
        const formData2 = new FormData();
        // FormData2.append('id', (현재 호텔id값));
        formData2.append('content', inputs.content);
        formData2.append('facilities', JSON.stringify(inputs.facilities)); // JSON으로 변환하여 전송
        if (file) {
            formData2.append('file', file);
        }

        try {
            let resp2 = await axios.post('http://localhost:8080/hotelDescription/write', formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (resp2.data.resultId !== undefined) {
                moveToNext(resp2.data.resultId);
            }
        } catch (error) {
            console.error(error);
        }

        console.log(formData2);
    };

    return (
        <Container className={"mt-3"}>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <td colSpan={2} className={"text-center"}>호텔 등록하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>호텔이름</td>
                        <td>
                            <FormControl
                                type={'text'}
                                value={inputs.name}
                                name={'name'}
                                onChange={onChange}
                                required
                            />
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
                                                value={item.name}
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
                            <FormControl
                                type={'text'}
                                value={inputs.tel}
                                name={'tel'}
                                onChange={onChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>호텔 설명 작성</td>
                        <td>
                            <CKEditor
                                editor={ClassicEditor}
                                data={inputs.content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setInputs({
                                        ...inputs,
                                        content: data
                                    });
                                }}
                                required/>
                        </td>
                    </tr>
                    <tr>
                        <td>첨부 파일</td>
                        <td>
                            <input
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={onFileChange}
                                multiple/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button type={'submit'}>
                                작성하기
                            </Button>
                            <Button onClick={goBack}>
                                취소하기
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

export default Write;