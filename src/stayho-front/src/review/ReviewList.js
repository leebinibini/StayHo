import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Spinner, Alert, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import ReviewCard from './ReviewCard';

const ReviewList = ({ hotelId, reviews, setReviews, sortOrder }) => {
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, [hotelId, sortOrder]);

    const fetchReviews = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:8080/review/showAllByHotel/${hotelId}`);
            if (response.status === 200) {
                let sortedReviews = response.data.reviewList || [];
                sortedReviews.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                });
                setReviews(sortedReviews);
            }
        } catch (e) {
            setError('리뷰를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/review/searchByComment', {
                params: { hotelId, keyword },
            });
            if (response.status === 200) {
                let searchResults = response.data.reviewList || [];
                searchResults.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                });
                setReviews(searchResults);
            }
        } catch (e) {
            setError('검색 중 오류가 발생했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4" style={{ maxWidth: '800px' }}>
            <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />

            {loading && (
                <div className="text-center mb-3">
                    <Spinner animation="border" />
                </div>
            )}
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Row>
                    {reviews.map((review) => (
                        <Col xs={12} key={review.id} className="mb-3">
                            <ReviewCard review={review} />
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default ReviewList;
