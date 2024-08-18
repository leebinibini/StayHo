import React, { useEffect, useState } from "react";
import {Button, Card, Carousel, CarouselItem} from "react-bootstrap";
import HeartIcon from "./HeartIcon";
import StarRating from "./StarRating";
import axios from "axios";

const HotelCard = ({ hotel, moveToSingle, memberInfo}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let [images, setImages] = useState([])

    useEffect(() => {
        if (memberInfo && memberInfo.id) {
            setIsLoggedIn(true);
            checkIfFavorite();
        } else {
            setIsLoggedIn(false);
        }
    }, [memberInfo]);

    const checkIfFavorite = async () => {
        try {
            const response = await axios.get('http://localhost:8080/wishlist/showWishList', {
                params: { memberId: memberInfo.id },
                withCredentials: true
            });
            const wishLists = response.data.wishLists || [];
            console.log(wishLists);
            const isHotelInWishlist = wishLists.some(wish => wish.hotelId === hotel.id);
            setIsFavorite(isHotelInWishlist);
        } catch (error) {
            console.error("위시리스트 불러오기 오류:", error);
        }
    };

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp1 = await axios.get('http://localhost:8080/hotel/showOne/' + hotel.id);
                if (resp1.status === 200) {
                    setImages(resp1.data.image)
                }
            } catch (e) {
                console.error(e);
            }
        };
        selectOne();
    }, [hotel.id]);


    const toggleFavorite = async () => {
        if (!isLoggedIn) {
            alert("로그인 후 이용할 수 있습니다.");
            return;
        }

        try {
            if (isFavorite) {
                // 이미 위시리스트에 있으면 삭제
                await axios.post('http://localhost:8080/wishlist/delete', null, {
                    params: {
                        hotelId: hotel.id,
                        memberId: memberInfo.id
                    },
                    withCredentials: true
                });
                alert("위시리스트에서 삭제되었습니다.");
            } else {
                // 위시리스트에 없으면 추가
                await axios.post('http://localhost:8080/wishlist/insert', null, {
                    params: {
                        hotelId: hotel.id,
                        memberId: memberInfo.id
                    },
                    withCredentials: true
                });
                alert("위시리스트에 추가되었습니다.");
            }

            setIsFavorite(!isFavorite); // 하트 색상 토글
        } catch (error) {
            console.error("위시리스트 업데이트 중 오류 발생:", error);
        }
    };

    return (
        <Card className="shadow-sm h-100" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                <HeartIcon
                    isFavorite={isFavorite}
                    onClick={toggleFavorite}
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                />
            </div>
            <Carousel>
                {images?.map(img => (
                    <CarouselItem key={img.id}>
                        <Card.Img
                            variant="top"
                            src={"http://localhost:8080/image/" + img.filepath + "/" + img.filename}
                            style={{border: 'black 1px solid', height: '50vh'}}
                        />
                    </CarouselItem>

                ))}
            </Carousel>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text>{hotel.tel}</Card.Text>
                <Card.Text>
                    <StarRating rating={hotel.rating} /> {/* 별점 표시 */}
                </Card.Text>
                <Button variant="primary" onClick={() => moveToSingle(hotel.id)} className="mt-auto">
                    호텔 상세보기
                </Button>
            </Card.Body>
        </Card>
    );
}

export default HotelCard;