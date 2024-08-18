import React, {useEffect, useState} from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DeleteReview from './DeleteReview';
import UpdateReview from './UpdateReview';

const ReviewList = () => {
    const {memberId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // memberInfo를 location.state에서 가져옴
    const memberInfo = location.state ? location.state.memberInfo : null;

    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/review/showAllByMember/${memberId}`);
            if (response.status === 200) {
                setReviews(response.data.reviewList || []);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [memberId]);

    const handleDeleteReview = (reviewId) => {
        setSelectedReview(reviewId);
        setShowDeleteModal(true);
    };

    const handleUpdateReview = (reviewId) => {
        setSelectedReview(reviewId);
        setShowUpdateModal(true);
    };

    const handleReviewDeleted = () => {
        setReviews(reviews.filter((review) => review.id !== selectedReview));
        setShowDeleteModal(false);
    };

    const handleReviewUpdated = () => {
        setShowUpdateModal(false);
        fetchReviews();
    };

    const handleBackToMenu = () => {
        navigate('/', {state: {memberInfo: memberInfo}});
    };

    return (
        <div>
            <h2>리뷰 목록</h2>
            <Button variant="secondary" onClick={handleBackToMenu}>
                메뉴로 돌아가기
            </Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>#</th>
                    <th>예약 번호</th>
                    <th>평점</th>
                    <th>리뷰</th>
                    <th>작성일</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <tr key={review.id}>
                            <td>{index + 1}</td>
                            <td>{review.id}</td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>{new Date(review.createdAt).toLocaleString()}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleUpdateReview(review.id)}
                                    style={{marginRight: '10px'}}
                                >
                                    수정
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteReview(review.id)}
                                >
                                    삭제
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No reviews found</td>
                    </tr>
                )}
                </tbody>
            </Table>

            {selectedReview && (
                <UpdateReview
                    reviewId={selectedReview}
                    show={showUpdateModal}
                    handleClose={handleReviewUpdated}
                />
            )}
            {selectedReview && (
                <DeleteReview
                    reviewId={selectedReview}
                    show={showDeleteModal}
                    onReviewDeleted={handleReviewDeleted}
                    handleClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default ReviewList;
