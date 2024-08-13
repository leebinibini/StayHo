import Modal from "react-modal";
import {Button, Card, Carousel, CarouselItem} from "react-bootstrap";

let Description = ({description, modalOpen, setModalOpen, room, images}) => {
    let customStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }
    return (
        <Modal isOpen={modalOpen}
               onRequestClose={() => setModalOpen(false)}
               style={customStyle}
               shouldCloseOnOverlayClick={true}
               ariaHideApp={false}

        >
            <Card style={{width: '18rem'}}>
                <Carousel>

                    {images.map(img => (
                        <CarouselItem>
                            <Card.Img variant="top"
                                      src={"http://localhost:8080/image?path=" + encodeURIComponent(img.filepath) + "&name=" + encodeURIComponent(img.filename)}
                                      style={{border: 'black 1px solid', height: '20vh'}}/>
                        </CarouselItem>

                    ))}
                </Carousel>
                <Card.Body>
                    <Card.Title>{room?.type}</Card.Title>
                    <Card.Text>
                        뷰: {description.view}<br/>
                        욕조: {description.bath ? 'O' : 'X'}<br/>
                        침대수: {description.bed}개<br/>
                        수용 인원: {room.limitPeople}명
                    </Card.Text>
                    <Button>예약하기</Button>
                </Card.Body>
            </Card>
        </Modal>
    )
}

export default Description