import Modal from "react-modal";
import {Button, Card, Carousel, CarouselItem} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

let RoomDescription = ({description, modalOpen, setModalOpen, room, images, reservation,condition}) => {
    let location = useLocation();
    let memberInfo = location.state.memberInfo;
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
    let navigation = useNavigate();

    let onClick = () => { // 버튼 추가 (정민)
        navigation('/reservation/insert', {state:
                {memberInfo:memberInfo, roomId: `${room.id}`, price: `${room.price}`, hotelId: `${room.hotelId}`, checkIn: `${condition.checkinDate}`, checkOut: `${condition.checkoutDate}`}})
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
                    {images?.map(img => (
                        <CarouselItem key={img.id}>
                            <Card.Img variant="top"
                                      src={"http://localhost:8080/image?path=" + encodeURIComponent(img.filepath) + "&name=" + encodeURIComponent(img.filename)}
                                      style={{border: 'black 1px solid', height: '20vh'}}/>
                        </CarouselItem>

                    ))}
                </Carousel>
                <Card.Body>
                    <Card.Title>{room?.type}</Card.Title>
                    <Card.Text>
                        객실 설명
                        {description.content}
                        <hr/>
                        뷰: {description.view}<br/>
                        욕조: {description.bath ? 'O' : 'X'}<br/>
                        침대수: {description.bed}개<br/>
                        최대 입실 인원: {room?.limitPeople}명<br/>
                        <hr/>
                    </Card.Text>
                    {memberInfo ?  <Button onClick={onClick}>예약하기</Button>: <p style={{color:'red'}}><a href={"/member/auth"}>로그인</a> 후 예약이 가능합니다.</p>}
                </Card.Body>
            </Card>
        </Modal>
    )
}

export default RoomDescription