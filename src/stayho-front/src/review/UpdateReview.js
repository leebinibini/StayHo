import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import axios from 'axios';

const UpdateReview = ({reviewId, show, handleClose}) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (reviewId) {
            const fetchReview = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/review/get/${reviewId}`);
                    if (response.status === 200) {
                        const review = response.data.review;
                        setRating(review.rating);
                        setComment(review.comment);
                    }
                } catch (error) {
                    console.error('Error fetching review:', error);
                    alert('리뷰를 가져오는 데 실패했습니다.');
                }
            };

            fetchReview();
        }
    }, [reviewId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/review/update/${reviewId}`, {
                rating,
                comment
            });
            if (response.status === 200) {
                alert('리뷰 수정 성공');
                handleClose();
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('리뷰 수정 중 오류 발생');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>리뷰 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="rating">
                        <Form.Label>평점</Form.Label>
                        <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            required
                        >
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="comment">
                        <Form.Label>리뷰</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" type="submit">
                        수정
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateReview;
