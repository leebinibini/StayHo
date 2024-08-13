import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import ReviewList from './ReviewList';
import AverageRating from './AverageRating';
import SearchReviews from './SearchReviews';

const ShowAll = () => {
    const {hotelId} = useParams();
    const [reviews, setReviews] = useState([]);

    return (
        <div>
            <h1>Hotel Reviews</h1>
            <AverageRating hotelId={hotelId}/>
            <SearchReviews hotelId={hotelId} setReviews={setReviews}/>
            <ReviewList hotelId={hotelId} reviews={reviews} setReviews={setReviews}/>
        </div>
    );
};

export default ShowAll;