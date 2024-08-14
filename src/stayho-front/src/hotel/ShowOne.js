import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Table, Form } from "react-bootstrap";

const ShowOne = () => {
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let params = useParams();
    let id = parseInt(params.id);

    let navigate = useNavigate();
    let goToHotelList = () => {
        navigate('/hotel/showList');
    };

    let onUpdate = () => {
        navigate('/hotel/update/' + id);
    };

    let onDelete = async () => {
        try {
            let response = await axios.get("http://localhost:8080/hotel/delete/" + id);
            if (response.status === 200) {
                navigate('/hotel/showList');
            }
        } catch (e) {
            console.error(e);
            setError("삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp1 = await axios.get('http://localhost:8080/hotel/showOne/' + id);
                if (resp1.status === 200) {
                    setData1(resp1.data);
                }
                let resp2 = await axios.get('http://localhost:8080/hotelDescription/showOne/' + id);
                if (resp2.status === 200) {
                    setData2(resp2.data);
                }
            } catch (e) {
                console.error(e);
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };
        selectOne();
    }, [id]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    console.log(data2)
    const facilities = JSON.parse(data2.facilities || "{}");
    console.log(facilities)

    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <td>
                        <article>StayHo~</article>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={2}>제목: {data1.name}</td>
                </tr>
                <tr>
                    <td colSpan={2}>글번호: {data1.id}</td>
                </tr>
                <tr>
                    <td colSpan={2}>작성자: {data1.providerName}</td>
                </tr>
                <tr>
                    <td colSpan={2}>내용: <div dangerouslySetInnerHTML={{ __html: data1.content }} /></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Form.Group>
                            <Form.Label>편의시설:</Form.Label>
                            <div>
                                {Object.entries(data2).map(([key, value]) => (
                                    key !== 'hotelId' && (
                                        <Form.Check
                                            key={key}
                                            type="checkbox"
                                            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                            checked={value === true}
                                            readOnly
                                        />
                                    )
                                ))}
                            </div>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button onClick={onUpdate}>수정하기</Button>
                    </td>
                    <td>
                        <Button onClick={onDelete}>삭제하기</Button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} className={'text-end'}>
                        <Button onClick={goToHotelList}>호텔 목록으로 가기</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default ShowOne;