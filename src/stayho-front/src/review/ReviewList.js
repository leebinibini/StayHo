import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ hotelId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, [hotelId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/review/showAllByHotel/${hotelId}`);
            if (response.status === 200) {
                setReviews(response.data.reviewList);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ul>
            {reviews.map((review) => (
                <li key={review.id}>
                    <p>Comment: {review.comment}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Member ID: {review.memberId}</p>
                </li>
            ))}
        </ul>
    );
};

export default ReviewList;