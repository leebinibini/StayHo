import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import axios from 'axios';

const UpdateReview = ({reviewId, show, handleClose}) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        if (reviewId) {
            const fetchReview = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/review/showOne/${reviewId}`);
                    if (response.status === 200) {
                        const {review, images} = response.data;
                        setRating(review.rating);
                        setComment(review.comment);

                        setExistingImages(images.map(img => img.path + img.name));

                        if (images.length > 0) {
                            setImgPreview(images[0].path + images[0].name);
                        }
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
        const formData = new FormData();
        formData.append('reviewData', JSON.stringify({rating, comment}));
        if (img) {
            formData.append('img', img);
        }
        try {
            const response = await axios.put(`http://localhost:8080/review/update/${reviewId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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

    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
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
                            rows={2}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {imgPreview && (
                        <div>
                            <Form.Label>현재 이미지</Form.Label>
                            <img
                                src={imgPreview}
                                alt="Review"
                                style={{maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '1rem'}}
                            />
                        </div>
                    )}

                    <Form.Group controlId="img">
                        <Form.Label>이미지 업로드</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleImgChange}
                            accept="image/*"
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
