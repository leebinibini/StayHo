import React, {useEffect, useState} from 'react';
import axios from 'axios';

const AverageRating = ({hotelId}) => {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        fetchAverageRating();
    }, [hotelId]);

    const fetchAverageRating = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/review/averageRating/${hotelId}`);
            if (response.status === 200) {
                setAverageRating(response.data.averageRating);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return <p>평균 평점 : {averageRating}/10</p>;
};

export default AverageRating;