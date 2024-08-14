import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewList from './ReviewList';
import AverageRating from './AverageRating';

const ShowAll = () => {
    const { hotelId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [showModal, setShowModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

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
        <div>
            <h1>리뷰 목록</h1>
            <AverageRating hotelId={hotelId} />

            <div>
                <button onClick={toggleSortOrder}>
                    {sortOrder === 'desc' ? '최신순' : '오래된 순'}
                </button>
            </div>

            <ReviewList
                hotelId={hotelId}
                reviews={reviews}
                setReviews={setReviews}
                sortOrder={sortOrder}
            />
        </div>
    );
};

export default ShowAll;

// import React, {useState} from 'react';
// import {useParams} from 'react-router-dom';
// import ReviewList from './ReviewList';
// import AverageRating from './AverageRating';
//
// const ShowAll = () => {
//     const {hotelId} = useParams();
//     const [reviews, setReviews] = useState([]);
//     const [sortOrder, setSortOrder] = useState('desc'); // Default to descending
//
//     const toggleSortOrder = () => {
//         setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
//     };
//
//     return (
//         <div>
//             <h1>리뷰 목록</h1>
//             <AverageRating hotelId={hotelId}/>
//             <div>
//                 <button onClick={toggleSortOrder}>
//                     {sortOrder === 'desc' ? '최신순' : '오래된 순'}
//                 </button>
//             </div>
//             <ReviewList
//                 hotelId={hotelId}
//                 reviews={reviews}
//                 setReviews={setReviews}
//                 sortOrder={sortOrder}
//             />
//         </div>
//     );
// };
//
// export default ShowAll;