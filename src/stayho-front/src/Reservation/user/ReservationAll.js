import React, {useEffect, useState} from "react";
import {Container, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";

import axios from "axios";
import {useNavigate} from "react-router-dom";

let ReservationAll = () => {

    let [data, setData] = useState({resve:[]})
    let navigate = useNavigate()

    let number = 1; // 번호

    let user_id = 2; // 사용자 id 정보 받기

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/reservation/all/" + user_id, {
                    withCredentials: true
                })
                .catch((e) => {
                    console.log(e)
                })
            if (resp.status === 200) {
                console.log("success")
                setData(resp.data)
            }
        }
        selectList()
    }, [])

    let movoToSingle = (id) => {
        navigate('/reservation/showOne/' + id)
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
                </tr>
                </thead>
                <tbody className={"text-center"}>
                {data.resve.map(resve => (
                    <tr key={resve.id} onClick={() => movoToSingle(resve.id)}>
                        <td>{number++}</td>
                        <td>{dayjs(resve.checkIn).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{dayjs(resve.checkOut).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{resve.roomId}</td>
                        <td>{resve.confirmed ? "완료" : "대기"}</td>
                        <td>{resve.status ? "완료" : "대기"}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default ReservationAll