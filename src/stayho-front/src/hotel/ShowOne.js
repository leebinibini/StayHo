import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import {Button} from "react-bootstrap";
import ListForUser from "../room/ListForUser";

let ShowOne = () => {
    let [reviews, setReviews] = useState([]);
    let params = useParams();
    let hotelId = parseInt(params.hotelId);

    let location = useLocation()
    let memberInfo = location.state?.userInfo || {};

    let navigate = useNavigate()

    let goBack = () => {
        navigate('/hotel/showList/1')
    }

    let onUpdate = async (reviewId) => {
        let response = await axios.get('http://localhost:8080/review/update/' + reviewId)
        if (response.status === 200) {
            navigate('/review/update/' + reviewId);
        }
    }

    let onDelete = async (reviewId) => {
        let response = await axios.get('http://localhost:8080/review/delete/' + reviewId)
        if (response.status === 200) {
            navigate('/hotel/showOne/' + hotelId);
        }
    }

    useEffect(() => {
        let selectList = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/hotel/showOne/' + hotelId)
                if (resp.status === 200) {
                    setReviews(resp.data.reviewList)
                }
            } catch (e) {
                console.error(e)
            }
        }
        selectList()
    }, [hotelId])
    return (
        <div>
            <ListForUser id={hotelId}/>
            <h1>Hotel Reviews</h1>
            <button onClick={goBack}>Back to Hotel List</button>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <p>작성자 이름</p>
                        <p>{review.comment}</p>
                        <p>평균 평점</p>
                        {review.memberId === memberInfo.id ?
                            <p>
                                <Button onClick={() => onUpdate(review.id)}>수정하기</Button>
                                <Button onClick={() => onDelete(review.id)}>삭제하기</Button>
                            </p> : null}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowOne