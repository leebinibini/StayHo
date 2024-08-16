import React, {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";

import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement('#root');

let Registrant = () => {
    let location = useLocation();

    let [data, setData] = useState({resve: []})
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [selectedReservation, setSelectedReservation] = useState(null);

    let index = 1; // 번호

    let user_id = location.state.memberInfo.id; // 사용자 id 정보 받기

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/reservation/registrant/" + user_id)
                .catch((e) => {
                    console.log(e)
                })
            if (resp.status === 200) {
                setData(resp.data)
            }
        }
        selectList()
    }, [user_id])

    let openModal = (reservation) => {
        setSelectedReservation(reservation);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedReservation(null);
    };

    const handleCancel = async () => {
        if (selectedReservation) {
            await axios.get("http://localhost:8080/reservation/delete/" + selectedReservation.id
            ).catch((e) => {
                console.log(e);
            });
            closeModal();
            // 데이터 갱신을 위해 다시 요청
            let resp = await axios
                .get("http://localhost:8080/reservation/registrant/" + user_id)
                .catch((e) => {
                    console.log(e);
                });
            if (resp.status === 200) {
                setData(resp.data);
            }
        }
    };

    const handleConfirm = async (e) => {
        if (selectedReservation) {
            selectedReservation.confirmed = true;
            await axios.post("http://localhost:8080/reservation/confirm", selectedReservation).catch((e) => {
                console.log(e);
            });
            closeModal();
            // 데이터 갱신을 위해 다시 요청
            let resp = await axios
                .get("http://localhost:8080/reservation/registrant/" + user_id)
                .catch((e) => {
                    console.log(e);
                });
            if (resp.status === 200) {
                setData(resp.data);
            }
        }
    };

    let customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
            width: "500px",
            height: "300px",
            margin: "auto",
            marginBottom: "400px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
        },
    };

    return (
        <Container className={"mt-3"}>
            <h2>예약 취소 및 승인</h2>
            <Table hover striped className={"table-dark"}>
                <thead className={"text-center"}>
                <tr>
                    <td>번호</td>
                    <td>체크인</td>
                    <td>체크아웃</td>
                    <td>객실</td>
                    <td>사장</td>
                    <td>예약자</td>
                    <td>취소/승인</td>
                </tr>
                </thead>
                <tbody className={"text-center"}>
                {data.resve.length === 0 ? <tr>
                    <td colSpan={6}>현재 등록한 호텔이 없습니다.</td>
                </tr> : ''}
                {data.resve.map(resve => (
                    <tr key={resve.id}>
                        <td>{index++}</td>
                        <td>{dayjs(resve.checkIn).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{dayjs(resve.checkOut).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{resve.roomId}</td>
                        <td>{resve.confirmed ? "완료" : "대기"}</td>
                        <td>{resve.memberId}</td>
                        <td>
                            <Button
                                variant="danger"
                                onClick={() => openModal(resve,index)}>
                                취소 / 승인
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="예약 취소 및 승인"
            >
                <h2>예약 정보</h2>
                {selectedReservation ? (
                    <div>
                        <p><strong>체크인:</strong> {dayjs(selectedReservation.checkIn).format('YYYY-MM-DD HH:mm:ss')}</p>
                        <p><strong>체크아웃:</strong> {dayjs(selectedReservation.checkOut).format('YYYY-MM-DD HH:mm:ss')}
                        </p>
                        <p><strong>객실 ID:</strong> {selectedReservation.roomId}</p>
                        <p><strong>상태:</strong> {selectedReservation.confirmed ? "완료" : "대기"}</p>
                        <Button onClick={handleConfirm} className="me-2">예약 승인</Button>
                        <Button onClick={handleCancel} className="me-2">예약 취소</Button>
                        <Button onClick={closeModal}>닫기</Button>
                    </div>
                ) : (
                    <p>선택된 예약이 없습니다.</p>
                )}
            </Modal>
        </Container>
    )
}

export default Registrant