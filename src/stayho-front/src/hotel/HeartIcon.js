import React from 'react';

const HeartIcon = ({ isFavorite, onClick }) => {
    return (
        <span onClick={onClick} style={{ cursor: 'pointer', fontSize: '24px', color: isFavorite ? 'red' : 'gray' }}>
            ♥
        </span>
    );
};

export default HeartIcon;