import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap';
import ReviewList from './ReviewList';
import AverageRating from './AverageRating';

const ShowAll = ({hotelId, show, handleClose}) => {
    const [reviews, setReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/review/showAllByHotel/${hotelId}`);
                if (response.status === 200) {
                    setReviews(response.data.reviewList || []);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [hotelId]);

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
    };

    return (
        <Modal show={show} onHide={handleClose} size="m">
            <Modal.Header closeButton>
                <Modal.Title>리뷰 목록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AverageRating hotelId={hotelId}/>
                <div>
                    <Button onClick={toggleSortOrder}>
                        {sortOrder === 'desc' ? '최신순' : '오래된 순'}
                    </Button>
                </div>
                <ReviewList
                    hotelId={hotelId}
                    reviews={reviews}
                    setReviews={setReviews}
                    sortOrder={sortOrder}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowAll;
