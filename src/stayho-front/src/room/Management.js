import {Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

import RoomDesctiption from "./RoomDescription"

let Management = () => {
    let id = 1;
    let [rooms, setRooms] = useState({roomList: []})
    let[roomD, setRoomD]= useState()
    let [description, setDescription] = useState([])
    let [modalOpen, setModalOpen] = useState(false)


    useEffect(() => {
        let onLoad = async () => {
            let response = await axios.get("http://localhost:8080/room/selectList/" + id, {})
            if (response.status === 200) {
                setRooms(response.data)
            }
        }
        onLoad()
    }, []);

    let onClick = async (room) => {
        let response = await axios.get("http://localhost:8080/room/description/" + room.id, {})
        if (response.status === 200) {
            setDescription(response.data)
            setRoomD(room)
        }

        setModalOpen(true)
    }
    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <td>객실 목록</td>
                </tr>
                </thead>
                <tbody>
                {rooms.roomList.map(room => (
                    <tr onClick={() => onClick(room)} key={room.id}>
                        <td>객실 타입</td>
                        <td> {room.type}</td>
                        <td>최대 입실 인원</td>
                        <td> {room.limitPeople}</td>
                    </tr>

                ))}
                </tbody>
            </Table>
            <RoomDesctiption description={description} modalOpen={modalOpen} setModalOpen={setModalOpen} room={roomD}/>
        </Container>
    )
}


export default Management