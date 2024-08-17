import {Card, CardSubtitle, CardTitle, Carousel, CarouselItem, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

let SearchList = ({hotels, images}) => {
    let navigate = useNavigate()
    let onClick = (hotel) => {
        navigate("/hotel/showOne/" + hotel.id)
    }

    return (
        <Container>
            { hotels.length>0?
                hotels.map(hotel => (
                <Card onClick={() => onClick(hotel)} key={hotel.roomId}>
                    <Card.Body className={'d-flex'}>
                        <Carousel>
                            {images.map(
                                image => image.map(
                                    img => (img.hotelId === hotel.id ?
                                            <CarouselItem>
                                                <Card.Img variant="top"
                                                          src={"http://localhost:8080/image?path=" + encodeURIComponent(img.filepath) + "&name=" + encodeURIComponent(img.filename)}
                                                          style={{border: 'black 1px solid', height: '20vh'}}/>
                                            </CarouselItem>
                                            :
                                            null
                                    )
                                )
                            )}
                        </Carousel>
                        <div className={'ms-3'}>
                            <Card.Title>{hotel.name}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <div className={'justify-content-between d-flex align-items-center'}>
                                <CardTitle
                                    className={'border rounded p-2 bg-primary fw-bold'}>{hotel.rating}</CardTitle>
                                <CardSubtitle className={'me-5'}>{hotel.price.toLocaleString('ko-KR')} ₩</CardSubtitle>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                )): <div>숙박 가능한 호텔이 없습니다.</div>}

        </Container>
    )
}
export default SearchList