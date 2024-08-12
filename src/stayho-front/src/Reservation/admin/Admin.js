import React, {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";

import axios from "axios";
import {useNavigate} from "react-router-dom";

let Admin = () => {
    let [data, setData] = useState({resve:[]})
    let navigate = useNavigate()

    let index = 1; // 번호

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/reservation/adminAll", {
                    withCredentials: true
                })
                .catch((e) => {
                    console.log(e)
                })
            if (resp.status === 200) {
                setData(resp.data)
            }
        }
        selectList()
    }, [])

    let onDelete = async (id) => {
        let response = await axios.get('http://localhost:8080/reservation/delete/' + id, {
            withCredentials: true
        })
        if (response.status === 200){
            setData((prevData) => ({
                resve: prevData.resve.filter((item) => item.id !== id)
            }));
            console.log("success")
        }
    }

    return (
        <Container className={"mt-3"}>
            <h2>내 예약</h2>
            <Table hover striped className={"table-dark"}>
                <thead className={"text-center"}>
                <tr>
                    <td>번호</td>
                    <td>체크인</td>
                    <td>체크아웃</td>
                    <td>객실</td>
                    <td>사장</td>
                    <td>사용자</td>
                    <td>취소</td>
                </tr>
                </thead>
                <tbody className={"text-center"}>
                {data.resve.length === 0 ? <tr><td colSpan={7}>현재 등록한 호텔이 없습니다.</td></tr> : ''}
                {data.resve.map(resve => (
                    <tr key={resve.id}>
                        <td>{index++}</td>
                        <td>{dayjs(resve.checkIn).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{dayjs(resve.checkOut).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{resve.roomId}</td>
                        <td>{resve.confirmed ? "완료" : "대기"}</td>
                        <td>{resve.status ? "완료" : "대기"}</td>
                        <td><Button onClick={() => onDelete(resve.id)}>취소하기</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Admin