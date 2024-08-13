import React, { useCallback, useState } from "react";
import { Button, Container, FormControl, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Write = () => {
    const [inputs, setInputs] = useState({
        name: '',
        tel: '',
        content: '',
        facilities: {},
        file: null
    });
    const navigate = useNavigate();

    const categoryList = ['swimmingPool', 'parking', 'restaurant', 'smoking', 'laundryFacilities', 'fitnessCenter'];

    const onCheckedItem = useCallback((e) => {
        if (e && e.target) {
            const { checked, value } = e.target;
            setInputs(prev => ({
                ...prev,
                facilities: checked
                    ? { ...prev.facilities, [value]: 'true' }
                    : Object.fromEntries(Object.entries(prev.facilities).filter(([key]) => key !== value))
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
                files: inputs.file
            })], { type: "application/json" }));

            if (inputs.file) {
                formData.append('files', inputs.file);
            }

            const hotelResponse = await axios.post('http://localhost:8080/hotel/write', formData);

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
                        <td colSpan={2} className="text-center">호텔 등록하기</td>
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
                            <CKEditor
                                editor={ClassicEditor}
                                data={inputs.content}
                                config={{
                                    ckfinder: {
                                        uploadUrl: 'http://localhost:8080/hotel/uploads',
                                    }
                                }}

                                onChange={onEditorChange}
                                required
                            />
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
                            />
                        </td>
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