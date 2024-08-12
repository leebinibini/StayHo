import Modal from "react-modal";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
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

    let navation = useNavigate();

    let onClick = () => { // 버튼 추가 (정민)
        navation('/reservation/insert', {state:{roomId: `${room.id}`, price:`${room.price}`}})
    }

    return (
        <Modal isOpen={modalOpen}
               onRequestClose={() => setModalOpen(false)}
               style={customStyle}
               shouldCloseOnOverlayClick={true}
               ariaHideApp={false}

        >
            <h1>{room?.type}</h1>
            <p>뷰:{description.description?.view}</p>
            <p>욕조: {description.description?.bath? 'O' : 'X'}</p>
            <p>침대수: {description.description?.bed}개</p>
            <Button onClick={onClick}>예약하기</Button>

        </Modal>
    )
}

export default Description