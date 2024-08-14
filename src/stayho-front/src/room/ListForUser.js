import {Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

import RoomDescription from "./RoomDescription"
import {useLocation, useParams} from "react-router-dom";

let ListForUser = () => {

    let [rooms, setRooms] = useState({roomList: []})
    let [roomD, setRoomD] = useState()
    let [description, setDescription] = useState({})
    let [images, setImages] = useState([])
    let [modalOpen, setModalOpen] = useState(false)
    let params = useParams()
    let id = parseInt(params.id)
    let condition = {
        sido: '',
        sigungu: '',
        people: 2,
        rooms: 1,
        checkinDate: new Date(),
        checkoutDate: new Date(),
    }
    useEffect(() => {

        let onLoad = async () => {
            let response = await axios.post("http://localhost:8080/room/selectList", condition, {withCredentials: true})
            if (response.status === 200) {
                setRooms(response.data)
            }
        }
        onLoad()
    }, []);

    let onClick = async (id) => {
        let response = await axios.get("http://localhost:8080/room/description/" + id)
        if (response.status === 200) {
            setDescription(response.data.description)
            setImages(response.data.image)
            setRoomD(response.data.room)
        }

        setModalOpen(true)
    }
    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <th>객실 목록</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>객실 타입</td>
                    <td>최대 입실 인원</td>
                    <td> 금액</td>
                </tr>
                {rooms.roomList.map(room => (
                    <tr onClick={() => onClick(room.id)} key={room.id}>
                        <td> {room.type}</td>
                        <td> {room.limitPeople}명</td>
                        <td> {room.price}원</td>
                    </tr>

                ))}
                </tbody>
            </Table>
            <RoomDescription description={description} modalOpen={modalOpen} setModalOpen={setModalOpen} room={roomD}
                             images={images} reservation={false}/>
        </Container>
    )
}


export default ListForUser