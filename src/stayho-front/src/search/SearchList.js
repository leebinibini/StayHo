import {Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

let SearchList = () => {
    let id=1
    let navigate= useNavigate()
    let onClick=(id)=>{
        navigate("/hotel/showOne/"+id)
    }

    return (
        <Container>
            <Card onClick={()=>onClick(id)}>
                <Card.Body className={'d-flex'}>
                    <Card.Img variant="top" src=""
                              style={{border: 'black 1px solid', width: '20vw', height: '20vh'}}/>
                    <div className={'ms-3'}>
                        <Card.Title>Hotel Name</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default SearchList