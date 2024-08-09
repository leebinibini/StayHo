import Modal from "react-modal";
import {Button, Card} from "react-bootstrap";
let Description = ({description, modalOpen, setModalOpen, room}) => {
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
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" style={{border: 'black 1px solid', height:'20vh'}} />
                <Card.Body>
                    <Card.Title>{room?.type}</Card.Title>
                    <Card.Text>
                        <p>뷰:{description.description?.view}</p>
                        <p>욕조: {description.description?.bath ? 'O' : 'X'}</p>
                        <p>침대수: {description.description?.bed}개</p>
                    </Card.Text>
                    <Button>예약하기</Button>
                </Card.Body>
            </Card>

            <h1></h1>



        </Modal>
    )
}

export default Description