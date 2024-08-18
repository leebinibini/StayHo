import React, {useState} from 'react';
import axios from 'axios';
import {Button, Form, Modal} from 'react-bootstrap';

const InsertReview = ({reservationId, onReviewSubmit}) => {
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

    const handleShow = () => setShowForm(true);
    const handleClose = () => setShowForm(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('reviewData', new Blob([JSON.stringify({
            rating,
            comment,
            reservationId
        })], {type: 'application/json'}));
        if (img) {
            formData.append('img', img);
        }
        try {
            const response = await axios.post(`http://localhost:8080/review/insert/${reservationId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert('리뷰 작성 성공');
                setIsReviewSubmitted(true);
                setRating(1);
                setComment('');
                setImg(null);
                setImgPreview(null);
                handleClose();
                if (onReviewSubmit) onReviewSubmit();
            }
        } catch (error) {
            console.error(error);
            alert('리뷰 작성 실패');
        }
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImgPreview(null);
        }
    };

    return (
        <>
            {!isReviewSubmitted ? (
                <>
                    <Button variant="primary" onClick={handleShow}>
                        리뷰 작성
                    </Button>

                    <Modal show={showForm} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>리뷰 작성</Modal.Title>
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
                                        rows={2}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="img">
                                    <Form.Label>이미지 업로드</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={handleImgChange}
                                        accept="image/*"
                                    />
                                    {imgPreview && (
                                        <div className="mt-3">
                                            <Form.Label>미리 보기</Form.Label>
                                            <img
                                                src={imgPreview}
                                                alt="Preview"
                                                style={{maxWidth: '100%', height: 'auto'}}
                                            />
                                        </div>
                                    )}
                                </Form.Group>

                                <Button variant="secondary" onClick={handleClose}>
                                    취소
                                </Button>
                                <Button variant="primary" type="submit">
                                    제출
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            ) : (
                <Button variant="success" disabled>
                    리뷰 완료
                </Button>
            )}
        </>
    );
};

export default InsertReview;