import React, {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";

import axios from "axios";
import InsertReview from "../../review/InsertReview";
import {useLocation, useNavigate} from "react-router-dom";

let ReservationAll = () => {
    let location = useLocation();
    let memberInfo = location.state.memberInfo

    let [data, setData] = useState({resve: []})
    let navigate = useNavigate()

    let index = 1; // 인덱싱 번호

    let user_id = location.state.memberInfo.id; // 사용자 id 정보 받기

    let [reviewableReservationId, setReviewableReservationId] = useState(null);
    let [showReviewModal, setShowReviewModal] = useState(false);
    let [submittedReviews, setSubmittedReviews] = useState([]);

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
                setData(resp.data)
                // 리뷰 있을 때 필터 (구현 안함)
                let submitted = resp.data.resve
                    .filter(resve => resve.reviewSubmitted)
                    .map(resve => resve.id);
                setSubmittedReviews(submitted);
            }
        }
        selectList()
    }, [])

    let movoToSingle = (id) => {
        navigate('/reservation/showOne/' + id, {state: {memberInfo: memberInfo}})
    }

    let handleReviewSubmit = (reservationId) => {
        const refreshData = async () => {
            try {
                const resp = await axios.get('http://localhost:8080/reservation/all/' + {user_id}, {
                    withCredentials: true
                });
                if (resp.status === 200) {
                    setData(resp.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        refreshData();
        setSubmittedReviews(prevState => [...prevState, reservationId]);
        setShowReviewModal(false);
    }

    let openReviewModal = (reservationId) => {
        setReviewableReservationId(reservationId);
        setShowReviewModal(true);
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
                    <td>리뷰</td>
                </tr>
                </thead>
                <tbody className={"text-center"}>
                {data.resve.length === 0 ? (
                    <tr>
                        <td colSpan={7}>현재 예약한 호텔이 없습니다.</td>
                    </tr>
                ) : (
                    data.resve.map(resve => (
                        <tr key={resve.id} onClick={() => movoToSingle(resve.id)}>
                            <td>{index++}</td>
                            <td>{dayjs(resve.checkIn).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td>{dayjs(resve.checkOut).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td>{resve.roomId}</td>
                            <td>{resve.confirmed ? "완료" : "대기"}</td>
                            <td>{resve.status ? "완료" : "대기"}</td>
                            <td>
                                {submittedReviews.includes(resve.id) ? (
                                    <Button variant="success" disabled>
                                        리뷰 완료
                                    </Button>
                                ) : (
                                    resve.status &&
                                    resve.confirmed && (
                                        <Button
                                            variant="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openReviewModal(resve.id);
                                            }}
                                        >
                                            리뷰 작성
                                        </Button>
                                    )
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
            {reviewableReservationId && (
                <InsertReview
                    reservationId={reviewableReservationId}
                    show={showReviewModal}
                    onReviewSubmit={() => handleReviewSubmit(reviewableReservationId)}
                    handleClose={() => setShowReviewModal(false)}
                />
            )}
        </Container>
    )
}

export default ReservationAll