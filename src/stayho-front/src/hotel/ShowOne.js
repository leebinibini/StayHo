import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useCallback, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Table } from "react-bootstrap";

const ShowOne = () => {
    const [data, setData] = useState({});

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
        }
    };

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/hotel/showOne/' + id);
                if (resp.status === 200) {
                    setData(resp.data);
                }
            } catch (e) {
                console.error(e);
            }
        };
        selectOne();
    }, [id]);

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
                    <td colSpan={2}>제목: {data.name}</td>
                </tr>
                <tr>
                    <td colSpan={2}>글번호: {data.id}</td>
                </tr>
                <tr>
                    <td colSpan={2}>작성자: {data.providerName}</td>
                </tr>
                <tr>
                    <td colSpan={2}>내용</td>
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