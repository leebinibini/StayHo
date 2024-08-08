import {Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

import Description from "./Description"
import {useParams} from "react-router-dom";
let ListForUser = () => {
    let params= useParams()
    let id = parseInt(params.id)
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
                    <tr onClick={() => onClick(room)} key={room.id}>
                        <td> {room.type}</td>
                        <td> {room.limitPeople}명</td>
                        <td> {room.price}원 </td>
                    </tr>

                ))}
                </tbody>
            </Table>
            <Description description={description} modalOpen={modalOpen} setModalOpen={setModalOpen} room={roomD}/>
        </Container>
    )
}


export default ListForUser