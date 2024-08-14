import React, {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";

let Admin = () => {
    let [data, setData] = useState({resve: []})
    let navigate = useNavigate()

    let [isOpenDelete, setIsOpenDelete] = useState(false);
    let openModalDelete = () => setIsOpenDelete(true)
    let closeModalDelete = () => setIsOpenDelete(false);

    let number = 1; // 번호

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
        if (response.status === 200) {
            setData((prevData) => ({
                resve: prevData.resve.filter((item) => item.id !== id)
            }));
        }
    }

    let customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
            width: "300px",
            height: "125px",
            margin: "auto",
            marginBottom: "600px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
        },
    };

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
                {data.resve.length === 0 ? <tr>
                    <td colSpan={7}>현재 등록한 호텔이 없습니다.</td>
                </tr> : ''}
                {data.resve.map(resve => (
                    <tr key={resve.id}>
                        <td>{number++}</td>
                        <td>{dayjs(resve.checkIn).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{dayjs(resve.checkOut).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{resve.roomId}</td>
                        <td>{resve.confirmed ? "완료" : "대기"}</td>
                        <td>사용자 Id: {resve.memberId}, {resve.status ? "완료" : "대기"}</td>
                        <td><Button onClick={openModalDelete}>취소하기</Button></td>

                        <Modal isOpen={isOpenDelete} onRequestClose={closeModalDelete} style={customStyles}
                               appElement={document.getElementById('root')}>
                            <h5>정말로 취소하시겠습니까?</h5>
                            <Button onClick={() => onDelete(resve.id)} className={"m-lg-1"}>예</Button>
                            <Button onClick={closeModalDelete}>아니요</Button>
                        </Modal>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Admin