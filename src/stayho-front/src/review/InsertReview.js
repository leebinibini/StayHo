import React, {useState} from 'react';
import axios from 'axios';
import {Button, Form, Modal} from 'react-bootstrap';

const InsertReview = ({reservationId}) => {
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const handleShow = () => setShowForm(true);
    const handleClose = () => setShowForm(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/review/insert/${reservationId}`, {
                rating,
                comment,
                reservationId
            });
            alert('리뷰 작성 성공');
            setRating(1);
            setComment('');
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                리뷰 작성
            </Button>

            <Modal show={showForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>평점 작성</Modal.Title>
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
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default InsertReview;