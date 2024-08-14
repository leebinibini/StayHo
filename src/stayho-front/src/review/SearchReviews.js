import React, {useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const SearchReviews = ({hotelId, setReviews}) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/review/searchByComment', {
                params: {hotelId, keyword},
            });
            if (response.status === 200) {
                setReviews(response.data.reviewList);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by comment"
            />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
};

export default SearchReviews;