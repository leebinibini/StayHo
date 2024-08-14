import React from 'react';
import {Card} from 'react-bootstrap';

const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString('ko-KR', options);
};

const ReviewCard = ({review}) => {
    if (!review) {
        return <div>리뷰 정보가 없습니다.</div>;
    }

    const {rating, comment, createdAt, memberName, imgUrls} = review;

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <strong>평점:</strong> {rating} / 10
                </Card.Title>
                <Card.Text>
                    <strong>리뷰:</strong> {comment}
                </Card.Text>
                {imgUrls && imgUrls.length > 0 && (
                    <div className="mb-2">
                        {imgUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Review image ${index}`}
                                style={{maxWidth: '30%', height: 'auto'}}
                            />
                        ))}
                    </div>
                )}
                <Card.Subtitle className="mb-2 text-muted">
                    <strong>작성일:</strong> {formatDate(createdAt)}
                </Card.Subtitle>
                <Card.Footer className="text-muted">
                    <strong>작성자:</strong> {memberName}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default ReviewCard;
