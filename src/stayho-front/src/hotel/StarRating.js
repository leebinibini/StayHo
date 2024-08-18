import React from 'react';

const StarRating = ({ rating, size = 24 }) => {
    const totalStars = 5;
    return (
        <div>
            {[...Array(totalStars)].map((_, index) => {
                return (
                    <span
                        key={index}
                        style={{
                            color: index < rating ? 'gold' : 'gray',
                            fontSize: size // 크기를 조절할 수 있도록 fontSize 사용
                        }}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;