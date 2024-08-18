import React, {useState} from 'react';
import axios from 'axios';
import {Button, Modal, Alert} from 'react-bootstrap';

const DeleteReview = ({reviewId, onReviewDeleted, show, handleClose}) => {
    const [error, setError] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/review/delete/${reviewId}`);
            if (response.status === 200) {
                setError('');
                onReviewDeleted();
            }
        } catch (e) {
            setError('리뷰 삭제에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>리뷰 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>정말로 이 리뷰를 삭제하시겠습니까?</p>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteReview;
