import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const ReviewList = ({hotelId, reviews, setReviews, sortOrder}) => {
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        fetchReviews();
    }, [hotelId, sortOrder]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/review/showAllByHotel/${hotelId}`);
            if (response.status === 200) {
                let sortedReviews = response.data.reviewList || [];
                // Sort reviews based on sortOrder
                sortedReviews.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                });
                setReviews(sortedReviews);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/review/searchByComment', {
                params: {hotelId, keyword},
            });
            if (response.status === 200) {
                let searchResults = response.data.reviewList || [];
                // Sort search results based on sortOrder
                searchResults.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                });
                setReviews(searchResults);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="이용 후기 검색"
                />
                <Button onClick={handleSearch}>검색</Button>
            </div>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <p>{review.rating} / 10 - {review.comment}</p>
                        <p>{formatDate(review.createdAt)}</p>
                        <p>{review.memberName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;