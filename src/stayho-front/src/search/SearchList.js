import {Card, CardSubtitle, CardTitle, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

let SearchList = ({hotels}) => {
    let navigate = useNavigate()
    let onClick = (hotel) => {
        navigate("/hotel/showOne/" + hotel.id)
    }


    return (
        <Container>
            {hotels.map(hotel => (
                <Card onClick={() => onClick(hotel)} key={hotel.id}>
                    <Card.Body className={'d-flex'}>
                        <Card.Img variant="top" src=""
                                  style={{border: 'black 1px solid', width: '20vw', height: '20vh'}}/>
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
            ))}

        </Container>
    )
}
export default SearchList