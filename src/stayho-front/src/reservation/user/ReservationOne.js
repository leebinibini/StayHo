import {Button, Container, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";
import Modal from "react-modal";
import RoomDescription from "../../room/RoomDescription";

let ReservationOne = () => {
    let [data, setData] = useState({})
    let params = useParams()
    let id = parseInt(params.id)
    let navigate = useNavigate()

    let [isOpenDelete, setIsOpenDelete] = useState(false);
    let [isOpenApproval, setIsOpenApproval] = useState(false);
    let [isOpenRoom, setIsOpenRoom] = useState(false)
    let [description, setDescription] = useState({})
    let [images, setImages] = useState([])
    let [room, setRoom]= useState({})

    let openModalDelete = () => setIsOpenDelete(true)
    let openModalApproval = () => setIsOpenApproval(true);
    let openModalRoom=()=>setIsOpenRoom(true)

    let closeModalDelete = () => setIsOpenDelete(false);
    let closeModalApproval = () => setIsOpenApproval(false);

    let goBack = () => navigate('/reservation/showAll')

    let onDelete = async (e) => {
        let response = await axios.get('http://localhost:8080/reservation/delete/' + id)
        if (response.status === 200) {
            navigate('/reservation/showAll')
        }
    }

    let onApproval = async (e) => {
        data.status = true
        let response = await axios.post('http://localhost:8080/reservation/updateApproval', data)
        if (response.status === 200) {
            closeModalApproval()
        }
    }

    let customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
            width: "300px",
            height: "125px",
            margin: "auto",
            marginBottom: "600px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
        },
    };

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get("http://localhost:8080/reservation/one/" + id)
                if (resp.status === 200) {
                    setData(resp.data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        selectOne()
    }, [])

    let onOpenRooms = async () => {
        let response = await axios.get("http://localhost:8080/room/description/" + data.roomId)
        if (response.status === 200) {
            setDescription(response.data.description)
            setImages(response.data.image)
            setRoom(response.data.room)
        }
        openModalRoom()
    }
    return (
        <Container className={"mt-3"}>
            <Button onClick={goBack}>뒤로가기</Button>
            {data.confirmed ? <Button className={"m-lg-1"} onClick={openModalApproval}>결재하기</Button> : ""}
            <Button className={"m-lg-1"} onClick={openModalDelete}>예약 취소하기</Button>

            <Table striped className={"table-dark mt-1"}>
                <thead>
                <tr>
                    <td colSpan={2}><h3>예약 상세정보</h3>{data.confirmed ? "" : <sub>*사장님이 수락해야 결재가 가능합니다.</sub>}</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={2}>예약자: {data.memberId}</td>
                </tr>
                <tr>
                    <td>
                        객실: &nbsp;
                        <Button size={"sm"} onClick={onOpenRooms}>객실 정보</Button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>체크인: {dayjs(data.checkIn).format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
                <tr>
                    <td colSpan={2}>체크아웃: {dayjs(data.checkOut).format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
                <tr>
                    <td colSpan={2}>사장: {data.confirmed ? "완료" : "대기"}</td>
                </tr>
                <tr>
                    <td colSpan={2}>사용자: {data.status ? "완료" : "대기"}</td>
                </tr>
                </tbody>
            </Table>
            <Modal isOpen={isOpenDelete} onRequestClose={closeModalDelete} style={customStyles}
                   appElement={document.getElementById('root')}>
                <h5>정말로 취소하시겠습니까?</h5>
                <Button onClick={onDelete} className={"m-lg-1"}>예</Button>
                <Button onClick={closeModalDelete}>아니요</Button>
            </Modal>
            <Modal isOpen={isOpenApproval} onRequestClose={closeModalApproval} style={customStyles}
                   appElement={document.getElementById('root')}>
                <h5>정말로 결재하시겠습니까?</h5>
                <Button className={"m-lg-1"} onClick={onApproval}>예</Button>
                <Button onClick={closeModalApproval}>아니요</Button>
            </Modal>
            <RoomDescription modalOpen={isOpenRoom} setModalOpen={setIsOpenRoom} description={description} room={room} images={images} reservation={true}/>
        </Container>
    )
}

export default ReservationOne;